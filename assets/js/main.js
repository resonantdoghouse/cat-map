// load JSON file, check for errors loading and push data to initialLocations
var success = false;

$.getJSON('//catmap.catkittycat.com/api/cats', function (data){
  success = true;
  
  // push the returned data into initialLocations array
  for(var x in data){
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


ko.utils.stringStartsWith = function(string, startsWith) {
    string = string || "";
    if (startsWith.length > string.length) return false;
    return string.substring(0, startsWith.length) === startsWith;
};


// bindable items referenced in View
var Location = function(data){
  this.id = ko.observable(data.id);
  this.name = ko.observable(data.name);
  this.lat = ko.observable(data.lat);
  this.lng = ko.observable(data.lng);
};


/*
* Knockout ViewModel
* & Functions
*/
var ViewModel = function(){
  var self = this;
  self.locationList = ko.observableArray([]);

  initialLocations.forEach(function(locationItem){
    self.locationList.push( new Location(locationItem) );
  });

  self.currentLocation = ko.observable(this.locationList()[0]);


  // click function for items in list
  self.listClick = function(clickedItem){
	  
    self.currentLocation(clickedItem);
    //console.log(ko.toJSON(clickedItem.title));
    
    var bounds = new google.maps.LatLngBounds();
    var clickedId = ko.toJSON(clickedItem.id);
    var clickedIdTrim = clickedId.replace(/['"]+/g, '');

    markers[clickedIdTrim].setMap(map);
    
		markers[clickedIdTrim].setAnimation(google.maps.Animation.BOUNCE);
		
		setTimeout(function(){ markers[clickedIdTrim].setAnimation(null); }, 2200);
		
    bounds.extend(markers[clickedIdTrim].position);
		
    map.fitBounds(bounds);
    var zoom = map.getZoom();
    map.setZoom(zoom > 15 ? 15 : zoom);
  };


  // show and hide all markers
  self.showAllClicked = function(){
    showAllMarkers();
  }
  self.hideAllClicked = function(){
    hideAllMarkers();
  }

	
	// Filter list by text search
  self.nameSearch = ko.observable('');

  self.filteredRecords = ko.computed(function () {
	  
      var nameSearch = self.nameSearch().toLowerCase();
      
      return ko.utils.arrayFilter(self.locationList(), function (r) {
          return r.name().toLowerCase().indexOf(nameSearch) !== -1;
      });
      
      
     
  });
  
  // monitor change in array and update map
  self.filteredRecords.subscribe(function (updateList) {
	  
	  refineMarkers(updateList);
	  
  	//console.log(updateList);
	});
  
  	
  
  

}


// init ViewModel
function initViewModel(){
  ko.applyBindings(new ViewModel());
}
