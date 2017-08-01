/**
 * Setup variables data & functions
 */
var map,
    showAllMarkers,
    hideAllMarkers,
    markers = [],
    initialLocations = [],
    positionObj = {},
    imageMarkerUrl = './assets/img/paw.png',
    defaultZoom = 14;


/**
 * Initialize the map
 */
function initMap() {

    var imageMarker = {
        url: imageMarkerUrl,
        size: new google.maps.Size(34, 32),
        origin: new google.maps.Point(0, 0)
    };


    // custom map styles from: https://snazzymaps.com/
    var styles = [{
        "featureType": "landscape.natural",
        "elementType": "geometry.fill",
        "stylers": [{"visibility": "on"}, {"color": "#e0efef"}]
    }, {
        "featureType": "poi",
        "elementType": "geometry.fill",
        "stylers": [{"visibility": "on"}, {"hue": "#1900ff"}, {"color": "#c0e8e8"}]
    }, {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [{"lightness": 100}, {"visibility": "simplified"}]
    }, {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [{"visibility": "off"}]
    }, {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [{"visibility": "on"}, {"lightness": 700}]
    }, {"featureType": "water", "elementType": "all", "stylers": [{"color": "#7dcdcd"}]}]


    /**
     * Setup info window to populate
     *
     * @type {google.maps.InfoWindow}
     */
    var largeInfowindow = new google.maps.InfoWindow({
        padding: 0
    });


    /**
     * The google.maps.event.addListener() event waits for
     * the creation of the infowindow HTML structure 'domready'
     * and before the opening of the infowindow defined styles
     * are applied.
     *
     * source of fix
     * https://stackoverflow.com/questions/21542870/remove-right-and-bottom-margin-on-infowindows
     */
    google.maps.event.addListener(largeInfowindow, 'domready', function () {

        var $iwOuter = $('.gm-style-iw'),
            $iwBackground = $iwOuter.prev(),
            $closeDiv = $iwOuter.next();

        // Added some js to help style close icons and default info box
        $iwOuter.next().addClass('gmap-close-btn');
        $closeDiv[0].innerHTML = '<img class="info-box-custom__icon" src="assets/img/close-icon.svg">';

        console.log($closeDiv);

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
            icon: imageMarker,
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

            populateInfoWindow(this, largeInfowindow);

        });

    }


    /**
     * Populate info windows
     * @param marker
     * @param infowindow
     */
    function populateInfoWindow(marker, infowindow) {

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

            infowindow.addListener('closeclick', function () {

                infowindow.setMarker = null;

            });

        }
    }


    /**
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

    }


    /**
     * Hide all markers
     */
    hideAllMarkers = function () {

        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }

    }


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

    }


    /**
     * Google map event listener
     * bounds changed check zoom
     */
    ZoomObj = {
        zoom: function () {

            zoom = map.getZoom();

            google.maps.event.addListenerOnce(map, 'bounds_changed', function () {
                //
                // function applyZoom(){
                //     map.setZoom(defaultZoom);
                // }
                // setTimeout(applyZoom, 100);

                map.setZoom(zoom > 15 ? 15 : zoom);


                // var currentZoom = this.getZoom();
                // if (currentZoom > defaultZoom || currentZoom < defaultZoom) {
                // this.setZoom(defaultZoom);
                // }

            });

        }
    }


}
