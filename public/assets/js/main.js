var animateMarker = function (marker) {
    marker.setAnimation(google.maps.Animation.BOUNCE);

    setTimeout(function () {
        marker.setAnimation(null);
    }, 1480);

};


/**
 * Bindable items referenced in View
 *
 * @param data
 * @constructor
 */
var Location = function (data) {
    this.id = ko.observable(data.id);
    this.name = ko.observable(data.title.rendered);
    this.lat = ko.observable(data.cmap_lat);
    this.lng = ko.observable(data.cmap_lng);
};


/**
 * KnockOut view model
 *
 * @constructor
 *
 */
var ViewModel = function () {

    var self = this;
    self.locationList = ko.observableArray([]);

    initialLocations.forEach(function (locationItem) {
        self.locationList.push(new Location(locationItem));
    });

    /**
     * Click list handler
     *
     * @param clickedItem
     * @param index
     *
     */
    self.listClick = function (clickedItem, index) {
        // $('.toggle-btn').click();
        var currentTarget = index.currentTarget.attributes[3].nodeValue,
            bounds = new google.maps.LatLngBounds();

        markers[currentTarget].setMap(map);
        markers[currentTarget].setAnimation(google.maps.Animation.BOUNCE);

        google.maps.event.trigger(markers[currentTarget], 'click');

        setTimeout(function () {
            markers[currentTarget].setAnimation(null);
        }, 2200);

        bounds.extend(markers[currentTarget].position);
        map.fitBounds(bounds);
        ZoomObj.zoom();
    };

    /**
     * Show  all markers
     */
    self.showAllClicked = function () {
        showAllMarkers();
    };

    /**
     * Hide all markers
     */
    self.hideAllClicked = function () {
        hideAllMarkers();
    };

    /**
     * Filter list by input search
     */
    self.nameSearch = ko.observable('');
    self.filteredRecords = ko.computed(function () {
        var nameSearch = self.nameSearch().toLowerCase();
        return ko.utils.arrayFilter(self.locationList(), function (r) {
            return r.name().toLowerCase().indexOf(nameSearch) !== -1;
        });
    });

    /**
     * Monitor change in array and update map
     */
    self.filteredRecords.subscribe(function (updateList) {
;
        /**
         *  Filters & sets markers, function in map.js
         */
        refineMarkers(updateList);
    });
};

/**
 * Init view model
 */
function initViewModel() {
    ko.applyBindings(new ViewModel());
}
