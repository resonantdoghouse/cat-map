// setup variables for accessing data and functions
var map,
    showAllMarkers, // creates an empty var which will be a function
    markers = [],
    initialLocations = [];


// initialize map
function initMap() {

  // custom map styles from: https://snazzymaps.com/style/15/subtle-grayscale
  var styles = [{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#e0efef"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"hue":"#1900ff"},{"color":"#c0e8e8"}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":100},{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"visibility":"on"},{"lightness":700}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#7dcdcd"}]}]

  var largeInfowindow = new google.maps.InfoWindow();

  var imageMarker = {
    url: '/img/paw.png',
    size: new google.maps.Size(34, 32),
    // The origin for this image is (0, 0).
    origin: new google.maps.Point(0, 0)
    // The anchor for this image is the base of the flagpole at (0, 32).
    //anchor: new google.maps.Point(0, 32)
  };

  // Constructor setting up new map using the var 'map' and html id #map
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 49.288312, lng: -123.0183267},
    styles: styles,
    zoom: 13
  });

  for (var i = 0; i < initialLocations.length; i++) {
    // Get the position from the location array.
    var position = initialLocations[i].location;
    var title = initialLocations[i].title;
    var img = initialLocations[i].img;
    var description = initialLocations[i].description;
    // Create a marker per location, and put into markers array.
     var marker = new google.maps.Marker({
      position: position,
      icon: imageMarker,
      title: title,
      img: img,
      description: description,
      animation: google.maps.Animation.DROP,
      id: i
    });
    // Push the marker to our array of markers.
    markers.push(marker);
    // Create an onclick event to open an infowindow at each marker.
    marker.addListener('click', function() {
      populateInfoWindow(this, largeInfowindow);
    });
  }

  function populateInfoWindow(marker, infowindow) {
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker != marker) {
      infowindow.marker = marker;
      infowindow.setContent(  '<div style="max-width: 300px; text-align: center;">'
                            + '<h5>'
                            +   marker.title
                            + '</h5>'
                            + '<img style="max-width:200px; margin-bottom: 10px;" src="'
                            +   marker.img
                            + '">'
                            + '<p>'
                            +   marker.description
                            + '</p>'
                            + '</div>'
                           );
      infowindow.open(map, marker);
      // Make sure the marker property is cleared if the infowindow is closed.
      infowindow.addListener('closeclick',function(){
        infowindow.setMarker = null;
        // console.log('marker closed');
      });
    }
  }

  showAllMarkers = function() {
    var bounds = new google.maps.LatLngBounds();
    // Extend the boundaries of the map for each marker and display the marker
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
      bounds.extend(markers[i].position);
    }
    map.fitBounds(bounds);
  }

}
