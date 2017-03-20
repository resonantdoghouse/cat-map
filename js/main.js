
var sidebarWidth = 0;

// sidebar toggle out
$('#sidebar-toggle-out').click(function(e){
  e.preventDefault();

  sidebarWidth = $('#sidebar-options').width();

  $('.sidebar-options').animate({
    left: - sidebarWidth
  }, 500 );

  $('.map-container').animate({
    width: "100%",
    left: "0%"
  }, 500, function(){
    google.maps.event.trigger(map, "resize");
  });

  $('#sidebar-toggle-in').css({
    'display': 'block',
    'left': sidebarWidth
  });
});

// sidebar toggle in
$('#sidebar-toggle-in').click(function(e){
  e.preventDefault();

  sidebarWidth = $('#sidebar-options').width();

  $('.sidebar-options').animate({
    left: 0
  }, 500 );

  $('.map-container').animate({
    width: "75%",
    left: "25%"
  }, 500, function(){
    google.maps.event.trigger(map, "resize");
  });

  $('#sidebar-toggle-in').css({
    'display': 'none'
  });
});


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

// Set a 5-second timeout to check for errors
setTimeout(function() {
    if (!success)
    {
        // Handle error accordingly
        alert("JSON file did not load properly");
    }
}, 5000);


function success(data){
  console.log('worked');
}


// bindable items referenced in View
var Location = function(data){
  this.id = ko.observable(data.id);
  this.title = ko.observable(data.title);
};


/*
* Knockout ViewModel
* & Functions
*/
var ViewModel = function(){
  var self = this;
  this.locationList = ko.observableArray([]);

  initialLocations.forEach(function(locationItem){
    self.locationList.push( new Location(locationItem) );
  });

  this.currentLocation = ko.observable(this.locationList()[0]);

  // click function for items in list
  this.listClick = function(clickedItem){
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

  // show all markers
  this.showAllClicked = function(){
    showAllMarkers();
  }


}


// init ViewModel
function initViewModel(){
  ko.applyBindings(new ViewModel());
}
