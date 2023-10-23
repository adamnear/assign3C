// IIFE
(() => {

    //create map in leaflet and tie it to the div called 'theMap'
    let map = L.map('theMap').setView([43.6532, -79.3832], 8);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    //function to fetch the flight data from OpenSky Network API
    function fetchFlightData() {
        fetch('https://opensky-network.org/api/states/all')
            .then(response => response.json())
            .then(data => {

            })
    }
})()