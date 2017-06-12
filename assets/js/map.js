// setup variables for accessing data and functions
var map,
    showAllMarkers, // creates an empty var which will be a function
    markers = [],
    initialLocations = [],
    positionObj = {};


// initialize map
function initMap() {

  // custom map styles from: https://snazzymaps.com/
  var styles = [{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#e0efef"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"hue":"#1900ff"},{"color":"#c0e8e8"}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":100},{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"visibility":"on"},{"lightness":700}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#7dcdcd"}]}]

  var largeInfowindow = new google.maps.InfoWindow();

  var imageMarker = {
    url: '/img/paw.png',
    size: new google.maps.Size(34, 32),
    origin: new google.maps.Point(0, 0)
  };

  // Constructor setting up new map using the var 'map' and html id #map
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 49.288312, lng: -123.0183267},
    styles: styles,
    zoom: 13,
    mapTypeControl: false
  });

  for (var i = 0; i < initialLocations.length; i++) {

    var latNum = parseFloat(initialLocations[i].lat);
    var lngNum = parseFloat(initialLocations[i].lng);

    positionObj = {lat: latNum, lng: lngNum};
    var positionJson = JSON.stringify(positionObj);

    var name = initialLocations[i].name;
    var img = 'http://catmap.catkittycat.com/map/img/uploads/' + initialLocations[i].img_url;
    var description = initialLocations[i].description;

    // Create a marker per location, and put into markers array.
     var marker = new google.maps.Marker({
      position: positionObj,
      icon: imageMarker,
      name: name,
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
      infowindow.setContent(  '<div class="info-box-custom" style="max-width: 300px; text-align: center;">'
                            + '<h5>'
                            +   marker.name
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

  hideAllMarkers = function() {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
  }


  // search filter
  refineMarkers = function(data){
	  hideAllMarkers();
	  var bounds = new google.maps.LatLngBounds();

	  $(data).each(function( i ) {
		  var filterLat = data[i].lat();
		  var filterLng = data[i].lng();

		  markers[i].setMap(map);
      bounds.extend(markers[i].position);

		});

	  map.fitBounds(bounds);

  }


}
