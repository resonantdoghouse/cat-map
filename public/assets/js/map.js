/**
 * Setup variables data & functions
 *
 */
var map,
    showAllMarkers,
    hideAllMarkers,
    markers = [],
    initialLocations = [],
    positionObj = {},
    defaultZoom = 14,
    LargeInfoWindow = {},
    imageMarkerUrl = './assets/img/cat.svg';


/**
 * Initialize the map
 */
function initMap() {

    var imageMarker = {
        url: imageMarkerUrl,
        size: new google.maps.Size(32, 32),
        origin: new google.maps.Point(0, 0)
    };

    // custom map styles from: https://snazzymaps.com/
    var styles = [
        {
            "featureType": "all",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "saturation": 36
                },
                {
                    "color": "#19719e"
                },
                {
                    "lightness": 40
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#000000"
                },
                {
                    "lightness": 16
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 20
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 17
                },
                {
                    "weight": 1.2
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 20
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 21
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 17
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 29
                },
                {
                    "weight": 0.2
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 18
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 16
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 19
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#115d7d"
                },
                {
                    "lightness": 17
                }
            ]
        }
    ];


    LargeInfoWindow = {
        window: function () {
            return new google.maps.InfoWindow({padding: 0});
        }
    };

    var newWindow = LargeInfoWindow.window();

    var infoWindowObj = {
        infoWindow: function populateInfoWindow(marker, infowindow) {
            // Check to make sure the infowindow is not already opened on this marker.
            if (infowindow.marker != marker) {
                infowindow.marker = marker;
                infowindow.setContent('' +
                    '<div class="info-box-custom" style="max-width: 400px; text-align: center;">'
                    + '<h1 class="info-box-custom__title">'
                    + marker.name
                    + '</h1>'
                    + '<img class="info-box-custom__img"  src="'
                    + marker.img
                    + '">'
                    + '<span class="info-box-custom__description">'
                    + marker.description
                    + '</span>'
                    + '</div>'
                );

                infowindow.open(map, marker);

                // Close info window
                infowindow.addListener('closeclick', function () {
                    infowindow.setMarker = null;
                });
            }
        }
    };


    /**
     * The google.maps.event.addListener() event waits for
     * the creation of the infowindow HTML structure 'domready'
     * and before the opening of the infowindow defined styles
     * are applied.
     */
    google.maps.event.addListener(newWindow, 'domready', function () {
        var $iwOuter = $('.gm-style-iw'),
            $iwBackground = $iwOuter.prev(),
            $closeDiv = $iwOuter.next();
        // Added some js to help style close icons and default info box
        $iwOuter.next().addClass('gmap-close-btn');
        $closeDiv[0].innerHTML = '<img class="info-box-custom__icon" src="assets/img/close-icon.svg">';
        // Remove the background shadow DIV
        $iwBackground.children(':nth-child(2)').css({'display': 'none'});
        // Remove the white background DIV
        $iwBackground.children(':nth-child(4)').css({'display': 'none'});
    });

    /**
     * Constructor setting up new map using the var 'map' and html id #map
     *
     * @type {google.maps.Map}
     */
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 49.288312, lng: -123.0183267},
        styles: styles,
        zoom: defaultZoom,
        mapTypeControl: false,
        clickableIcons: false
    });

    /**
     * Loop through initialLocations
     */
    for (var i = 0; i < initialLocations.length; i++) {
        var latNum = parseFloat(initialLocations[i].cmap_lat),
            lngNum = parseFloat(initialLocations[i].cmap_lng),
            name = initialLocations[i].title.rendered,
            img = initialLocations[i]._embedded['wp:featuredmedia'][0].media_details.sizes.medium_large.source_url,
            description = initialLocations[i].content.rendered;

        // Object to hold  lat lng for markers
        positionObj = {lat: latNum, lng: lngNum};

        /**
         * Create a marker per location, and put into markers array.
         *
         * @type {google.maps.Marker}
         */
        var marker = new google.maps.Marker({
            position: positionObj,
            icon: imageMarkerUrl,
            name: name,
            img: img,
            description: description,
            animation: google.maps.Animation.DROP,
            id: i
        });

        // Push the marker to our array of markers.
        markers.push(marker);

        /**
         * Create an onclick event to open an infowindow at each marker.
         */
        marker.addListener('click', function () {

            // var lg = LargeInfoWindow.window();
            infoWindowObj.infoWindow(this, newWindow);

            // infoWindowObj

            animateMarker(this);

        });

    }


    /**
     * Google map event listener
     * bounds changed check zoom
     */
    ZoomObj = {
        zoom: function () {
            zoom = map.getZoom();
            google.maps.event.addListenerOnce(map, 'bounds_changed', function () {
                map.setZoom(zoom > 15 ? 15 : zoom);
            });
        }
    }

    /**
     * showAllMarkers
     * Set and show markers
     */
    showAllMarkers = function (data) {

        var bounds = new google.maps.LatLngBounds(), resultTotal;

        // Extend the boundaries of the map for each marker and display the marker
        for (var i = 0; i < markers.length; i++) {

            resultTotal = i;
            markers[i].setMap(map);
            bounds.extend(markers[i].position);

        }

        ZoomObj.zoom();
        map.fitBounds(bounds);

    };

    showAllMarkers();

    /**
     * Hide all markers
     */
    hideAllMarkers = function () {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }
    };

    /**
     * Search filter refine markers
     *
     * @param data
     */
    refineMarkers = function (data) {

        hideAllMarkers();

        var bounds = new google.maps.LatLngBounds();

        $(data).each(function (i) {

            markers[i].setMap(map);

            bounds.extend(markers[i].position);

        });

        ZoomObj.zoom();
        map.fitBounds(bounds);

    };


}



