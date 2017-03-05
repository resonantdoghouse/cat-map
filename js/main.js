

// Load JSON file for map data
var request = new XMLHttpRequest();
request.open('GET', 'locations.json', true);
request.onload = function() {
  if (request.status >= 200 && request.status < 400) {
    // Success!
    var data = JSON.parse(request.responseText);
    //initialLocations.push(data);
    for(var x in data){
      console.log(x);
      initialLocations.push(data[x]);
    }

    initMap();
    initViewModel();
    showAllMarkers();

  } else {
    // We reached our target server, but it returned an error
    alert('server reached but error occured');
  }
};
request.onerror = function() {
  // There was a connection error of some sort
  alert('connection to db not established');
};
request.send();


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
