// TODO: move js files to assets folder and add gulp build min 

/**
 * Ajax request
 *
 */
$.getJSON('http://localhost:8888/wpdev/wp-json/wp/v2/cats-api?_embed&per_page=10')
    .done(function (data) {

            // push the returned data into initialLocations array
            for (var i in data) {
                initialLocations.push(data[i]);
            }

            initMap();
            initViewModel();
            showAllMarkers();

        }
    )
    .fail(function () {
        alert('JSON file did not load... error');
    });


/**
 *
 * @param string
 * @param startsWith
 * @returns {boolean}
 */
// ko.utils.stringStartsWith = function (string, startsWith) {
//
//     string = string || "";
//
//     if (startsWith.length > string.length)
//         return false;
//
//     return string.substring(0, startsWith.length) === startsWith;
//
// };


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
 * KnockOut View Model
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
     * Click List Handler
     *
     * @param clickedItem
     * @param index
     *
     */
    self.listClick = function (clickedItem, index) {

        var currentTarget = index.currentTarget.attributes[3].nodeValue,
            bounds = new google.maps.LatLngBounds(),
            zoom = map.getZoom();

        markers[currentTarget].setMap(map);
        markers[currentTarget].setAnimation(google.maps.Animation.BOUNCE);


        setTimeout(function () {
            markers[currentTarget].setAnimation(null);
        }, 2200);


        bounds.extend(markers[currentTarget].position);

        map.fitBounds(bounds);

        map.setZoom(zoom > 15 ? 15 : zoom);
    };


    /**
     * show  all markers
     */
    self.showAllClicked = function () {

        showAllMarkers();

    }

    /**
     * hide all markers
     */
    self.hideAllClicked = function () {
        hideAllMarkers();
    }


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
     * monitor change in array and update map
     */
    self.filteredRecords.subscribe(function (updateList) {

        refineMarkers(updateList);

    });


}


/**
 * init ViewModel
 */
function initViewModel() {
    ko.applyBindings(new ViewModel());
}
