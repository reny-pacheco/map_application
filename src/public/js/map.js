var map = L.map('map').fitWorld();

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmVueTA4IiwiYSI6ImNrZG1keWp3dTE3bmwycXMyM2MyNjVsMjQifQ.jIfCpaX_HNApFzi1fOyExw', {
    attribution: '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
}).addTo(map);



map.locate({setView: true, maxZoom: 16});

function onLocationFound(e) {
    var radius = e.accuracy;
    let user = document.querySelector('.navbar-brand')
    let username = user.innerText.replace('Hello', '').bold().fontcolor('blue')

    L.marker(e.latlng).addTo(map)
        .bindPopup(`You are here ${username}, ${radius} meters from this point`).openPopup();

    L.circle(e.latlng, radius).addTo(map);
    // L.marker([14.011361, 120.989685]).addTo(map).bindPopup("Taal lake").openPopup();
}

map.on('locationfound', onLocationFound);

function onLocationError(e) {
    alert(e.message);
}
// alert lat and long when map is clicked
// map.on('click', function(e) {
//     alert( e.latlng)
// });

map.on('locationerror', onLocationError);


