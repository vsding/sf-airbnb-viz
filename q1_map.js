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

        function filterByRating(min, max) {
            var filter = ['all', ['<=', ["to-number", ["get", "review_scores_rating"]], max],
                ['>=', ["to-number", ["get", "review_scores_rating"]], min]
            ];
            map.setFilter('points', filter);
        }

        filterByRating(20, 70);

        var shouldShowUnrated = false;

        function showUnrated(min, max) {
            var filter = ['any', ['all', ['<=', ["to-number", ["get", "review_scores_rating"]], max],
                    ['>=', ["to-number", ["get", "review_scores_rating"]], min]
                ],
                ['==', ["to-number", ["get", "review_scores_rating"]], 0],
                ['==', ["get", "review_scores_rating"], ""]

            ];
            map.setFilter('points', filter);
        }

        let button = document.getElementById('toggleListingsButton');
        button.addEventListener('click', updateButton);

        let slider = document.getElementById('slider');
        let minRating = Number(slider.getAttribute("data-value-min"));
        let maxRating = Number(slider.getAttribute("data-value-max"));

        function updateButton() {
            shouldShowUnrated = !shouldShowUnrated;
            if (button.value === 'Hide unrated listings') {
                button.value = 'Show unrated listings';
            } else {
                button.value = 'Hide unrated listings';
            }
            if (shouldShowUnrated) {
                showUnrated(minRating, maxRating);
            } else { // filter by rating only
                filterByRating(minRating, maxRating);
            }
        }

        slider.addEventListener('change', function(e) {
            let vals = e.detail.val.split(",");
            minRating = Number(vals[0]);
            maxRating = Number(vals[1]);
            filterByRating(minRating, maxRating);
            if (shouldShowUnrated) {
                showUnrated(minRating, maxRating);
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
        let name = e.features[0].properties.name;
        let price = e.features[0].properties.price;
        let neighborhood = e.features[0].properties.neighbourhood_cleansed;
        let num_accommodate = Math.trunc(e.features[0].properties.accommodates);
        let rating = e.features[0].properties.review_scores_rating;

        if (marker != null) {
            marker.remove();
        }

        var markerElem = document.createElement('div');
        markerElem.setAttribute("class", "pin");

        marker = new mapboxgl.Marker(markerElem).setLngLat(e.features[0].geometry.coordinates)
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