// map view
var map = L.map('map').setView([43.706802, -79.398271], 11);

//  tile layer
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets'
}).addTo(map);

// calling 2018 homicide data from homicide.geojson
var homicideLayer = L.geoJSON(homicide, {
pointToLayer: function(feature, latlng) {
    return L.marker(latlng);
},
onEachFeature: onEachFeature
}).addTo(map);

// adding popup data for each homicide instance
// type, date (only first ten char places), hood, coordinates
function onEachFeature(feature, layer) {
    var popupContent = "<h3>" + feature.properties.type + "</h3>"
+ "<p><b>Date (YYYY-MM-DD): <b>" + feature.properties.date.substring(0,10) + "</p>"
+ "<p><b>Neighbourhood: <b>" + feature.properties.hood + "</p>"
+ "<p><b>Coordinates (lon, lat): <b>" + feature.geometry.coordinates + "</p>";

    // assigns feature properties to popup content
    if (feature.properties && feature.properties.popupContent) {
        popupContent += feature.properties.popupContent;
    }

    layer.bindPopup(popupContent);
}