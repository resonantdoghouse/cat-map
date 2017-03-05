
// load JSON file, check for errors loading and push data to initialLocations
var success = false;

$.getJSON('locations.json', function (data){
  success = true;
  // console.log(data);
  // push the returned data into initialLocations array
  for(var x in data){
    // console.log(x);
    initialLocations.push(data[x]);
  }
  initMap();
  initViewModel();
  showAllMarkers();
});

// Set a 5-second (or however long you want) timeout to check for errors
setTimeout(function() {
    if (!success)
    {
        // Handle error accordingly
        alert("JSON file did not load properly");
    }
}, 5000);

//
// $.ajax({
//   dataType: 'json',
//   url: "locations.json",
//   data: data,
//   success: success
// });

function success(data){
  console.log('worked');
}

// $.getJSON("locations.json", function(data) {
//
//   initialLocations(data);
//
// });
//
// initMap();
// initViewModel();
// showAllMarkers();


// bindable items referenced in View
var Location = function(data){
  this.id = ko.observable(data.id);
  this.title = ko.observable(data.title);
};


// knockout view
var ViewModel = function(){
  var self = this;
  this.locationList = ko.observableArray([]);

  initialLocations.forEach(function(locationItem){
    self.locationList.push( new Location(locationItem) );
  });

  this.currentLocation = ko.observable(this.locationList()[0]);

  // testing click function
  this.testClick = function(clickedItem){
    self.currentLocation(clickedItem);
    //console.log(ko.toJSON(clickedItem.title));
    var bounds = new google.maps.LatLngBounds();
    var clickedId = ko.toJSON(clickedItem.id);
    //console.log(clickedId);
    markers[clickedId].setMap(map);
    bounds.extend(markers[clickedId].position);
    map.fitBounds(bounds);
    var zoom = map.getZoom();
    map.setZoom(zoom > 15 ? 15 : zoom);
  };

}


// init ViewModel
function initViewModel(){
  ko.applyBindings(new ViewModel());
}
