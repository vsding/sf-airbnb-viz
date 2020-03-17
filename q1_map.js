import { geodata } from './geodata.js';

mapboxgl.accessToken = 'pk.eyJ1IjoidnNkaW5nIiwiYSI6ImNrN2ZwbGhndTAwZDEzaW80Y2s3Y252bncifQ.jc0up60IkKVtmheo0fN4nw';

let renderMap = () => {
    var bounds = [
        // long, lat
        [-122.6597, 37.624], // Southwest coordinates
        [-122.291, 37.933033] // Northeast coordinates
    ];

    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v10',
        zoom: 10,
        center: [-122.4394, 37.76],
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

    var marker;
    var nameText = document.getElementById('name');
    var neighborhoodText = document.getElementById('neighborhood');
    var priceText = document.getElementById('price');
    var numGuestsText = document.getElementById('numGuests');
    var ratingText = document.getElementById('rating');

    map.on('click', 'points', function(e) {
        // let coordinates = e.features[0].geometry.coordinates.slice();
        let name = e.features[0].properties.name;
        let price = e.features[0].properties.price;
        let neighborhood = e.features[0].properties.neighbourhood_cleansed;
        let num_accommodate = Math.trunc(e.features[0].properties.accommodates);
        let rating = e.features[0].properties.review_scores_rating;

        if (marker != null) {
            marker.remove();
        }

        marker = new mapboxgl.Marker({
                color: '#60a3bc',
            }).setLngLat(e.features[0].geometry.coordinates)
            .addTo(map);

        if (e.features.length > 0) {
            nameText.textContent = name;
            neighborhoodText.textContent = neighborhood;
            priceText.textContent = price;
            numGuestsText.textContent = num_accommodate;
            ratingText.textContent = rating;
        }
    });

    map.on('mouseenter', 'points', function() {
        map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', 'points', function() {
        map.getCanvas().style.cursor = '';
    });
}

export { renderMap };