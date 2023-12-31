// IIFE
(() => {

    //create map in leaflet and tie it to the div called 'theMap'
    let map = L.map('theMap').setView([43.6532, -79.3832], 7);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    //function to fetch the flight data from OpenSky Network API
    function fetchFlightData() {
        fetch('https://opensky-network.org/api/states/all')
            .then(response => response.json())
            .then(data => {
                //Use filter method to only use data from Canadian flights
                const canadianFlights = data.states.filter(flight => flight[2] === 'Canada');
                console.log(data);
                // Create a GeoJSON FeatureCollection
                const geoJsonFeatureCollection = {
                    type: 'FeatureCollection',
                    features: canadianFlights.map(flight => ({
                        type: 'Feature',
                        geometry: {
                            type: 'Point', //Specifying the flight is a point on the map
                            coordinates: [flight[5], flight[6]] // Latitude and longitude
                        },
                        properties: {
                            callsign: flight[1],
                            origin: flight[2],
                            altitude: flight[7],
                            // Add a property for the rotation angle (in degrees)
                            rotation: flight[10]
                        }
                    }))
                };


                //Clear existing markers form map
                map.eachLayer(layer => {
                    if (layer instanceof L.Marker) {
                        map.removeLayer(layer);
                    }
                });

                //Use the plane icon
                const customIcon = L.icon({
                    iconUrl: 'plane2.png',
                    iconSize: [32, 32],
                });

                //Add markers to the map using the GeoJSON data
                L.geoJSON(geoJsonFeatureCollection, {
                    pointToLayer: (data) => {
                        return L.setRotationAngle(

                        );
                    },
                    onEachFeature: (feature, layer) => {
                        //Pop up will show the flight information.
                        layer.bindPopup(`<strong>Callsign:</strong> ${feature.properties.callsign}<br>
                        <strong>Origin:</strong> ${feature.properties.origin}<br>
                        <strong>Altitude:</strong> ${feature.properties.altitude} meters
                    `)
                    }
                }).addTo(map);
            })
            .catch(error => {
                console.error('Error fetching flight data:', error);
            });
    }
    // Fetch and display flight data initially
    fetchFlightData();

    // Set up an interval to auto-refresh the flight data
    setInterval(fetchFlightData, 300000);

})()