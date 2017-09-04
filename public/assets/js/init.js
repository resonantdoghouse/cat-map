/**
 * Setup variables data & functions
 */
var map,
    showAllMarkers,
    hideAllMarkers,
    markers = [],
    initialLocations = [],
    positionObj = {},
    defaultZoom = 14,
    LargeInfoWindow = {},
    imageMarkerUrl = './assets/img/cat.svg',
    urlQuery = '?_embed&per_page=10';


var gmapError = function () {
    alert("🌵 Failed to load Google Maps script 🤷 💣💣💣️");
};