import { geodata } from './geodata.js';

mapboxgl.accessToken = 'pk.eyJ1IjoidnNkaW5nIiwiYSI6ImNrN2ZwbGhndTAwZDEzaW80Y2s3Y252bncifQ.jc0up60IkKVtmheo0fN4nw';

let renderMap = () => {
    var bounds = [
        // long, lat
        [-122.9397, 37.424], // Southwest coordinates
        [-121.981, 37.933033] // Northeast coordinates
    ];

    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v10',
        zoom: 11,
        center: [-122.4594, 37.75],
        maxBounds: bounds
    });

    map.on('load', () => {
        map.addSource('points', {
            type: 'geojson',
            data: geodata
        });

        map.addLayer({
            id: 'points',
            type: 'circle',
            source: 'points',
            paint: {
                'circle-radius': 3.5,
                "circle-color": ["case", [">", ["to-number", ["get", "review_scores_rating"]], 90], "green", [">", ["to-number", ["get", "review_scores_rating"]], 70], "yellow", ["==", ["to-number", ["get", "review_scores_rating"]], 0], "gray",
                    "red"
                ],
                'circle-opacity': 0.7,
            }
        });

        function filterByRating(num, map) {
            var filter = ['<=', ["to-number", ["get", "review_scores_rating"]], num];
            map.setFilter('points', filter);
            document.getElementById('slider').innerText = `${num}`;
        }

        filterByRating(70, map);
        hideUnrated(70);

        var shouldHideUnrated = true;

        function hideUnrated(ratingThreshold) {
            var filter = ["all", ['>', ["to-number", ["get", "review_scores_rating"]], 0],
                ['<=', ["to-number", ["get", "review_scores_rating"]], ratingThreshold]
            ];
            map.setFilter('points', filter);
        }

        var button = document.getElementById('toggleListingsButton');
        button.addEventListener('click', updateButton);

        function updateButton() {
            shouldHideUnrated = !shouldHideUnrated;
            if (button.value === 'Hide unrated listings') {
                button.value = 'Show unrated listings';
            } else {
                button.value = 'Hide unrated listings';
            }
            if (shouldHideUnrated) {
                hideUnrated(Number(document.getElementById('slider').value));
            } else { // filter by rating only
                filterByRating(Number(document.getElementById('slider').value), map);
            }
        }

        document.getElementById('slider').addEventListener('input', function(e) {
            let ratingThreshold = parseInt(e.target.value, 10);
            document.getElementById('slider').innerText = ratingThreshold;
            filterByRating(ratingThreshold, map);
            if (shouldHideUnrated) {
                hideUnrated(ratingThreshold);
            }
        });
    });

    map.on('click', 'points', function(e) {
        let coordinates = e.features[0].geometry.coordinates.slice();
        let name = e.features[0].properties.name;
        let price = e.features[0].properties.price;
        let num_bedrooms = Math.trunc(e.features[0].properties.bedrooms);
        let num_bathrooms = Math.trunc(e.features[0].properties.bathrooms);
        let num_beds = Math.trunc(e.features[0].properties.beds);
        let num_accommodate = Math.trunc(e.features[0].properties.accommodates);
        let rating = e.features[0].properties.review_scores_rating;

        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup({ className: 'mapPopup' })
            .setLngLat(coordinates)
            .setHTML('<center><h3>' + name + '</h4><p>' + price + ' per night</p><p>' + num_bedrooms + ' bed, ' + num_bathrooms + ' bath, accommodates ' + num_accommodate + '</p><p>' + 'Rating: ' + rating + '</p></center>')
            .addTo(map);
    });

    map.on('mouseenter', 'points', function() {
        map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', 'points', function() {
        map.getCanvas().style.cursor = '';
    });
}

export { renderMap };