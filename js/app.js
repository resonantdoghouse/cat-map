var map;
var markers = [];


/*
* initialize map and wrap functions
*/
function initMap() {

  /*
  * custom map styles from: https://snazzymaps.com/style/15/subtle-grayscale
  * to create other styles modify the array below
  */
  var styles = [
    {"featureType":"administrative","elementType":"all","stylers":[{"saturation":"-100"}]},{"featureType":"administrative.province","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","elementType":"all","stylers":[{"saturation":-100},{"lightness":"50"},{"visibility":"simplified"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":"-100"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"lightness":"30"}]},{"featureType":"road.local","elementType":"all","stylers":[{"lightness":"40"}]},{"featureType":"transit","elementType":"all","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]},{"featureType":"water","elementType":"labels","stylers":[{"lightness":-25},{"saturation":-100}]}
  ];


  /*
  * Constructor setting up new map using the var 'map' and html id #map
  */
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.7413549, lng: -73.9980244},
    styles: styles,
    zoom: 13
  });


  /*
  * setup default data
  */
  var initialLocations = [
    {
      id : 0,
      title : 'Park Ave Penthouse',
      location : {
        lat : 40.7713024,
        lng : -73.9632393
      }
    },
    {
      id : 1,
      title : 'Chelsea Loft',
      location : {lat : 40.7444883, lng : -73.9949465}
    }
  ]

  var largeInfowindow = new google.maps.InfoWindow();


  // The following group uses the location array to create an array of markers on initialize.
  for (var i = 0; i < initialLocations.length; i++) {
    // Get the position from the location array.
    var position = initialLocations[i].location;
    var title = initialLocations[i].title;
    // Create a marker per location, and put into markers array.
     var marker = new google.maps.Marker({
      position: position,
      title: title,
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



  // bindable stuff for Location
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

    this.currentLocation = ko.observable( this.locationList()[0] );


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


    // function showListings() {
    //   var bounds = new google.maps.LatLngBounds();
    //   // Extend the boundaries of the map for each marker and display the marker
    //   for (var i = 0; i < markers.length; i++) {
    //     markers[i].setMap(map);
    //     bounds.extend(markers[i].position);
    //   }
    //   map.fitBounds(bounds);
    // }




  }








  // init ViewModel
  ko.applyBindings(new ViewModel());


}// end of initMap()









// old code
// var initialCats = [
//   {
//     clickCount : 0,
//     name : 'Trex & Hat',
//     imgSrc : 'img/trex-hat.jpg',
//     imgAttribution : 'http://catkittycat.com',
//     nicknames: ['snicklefritz', 'scrambles the death dealer', 'tumness', 'skulls', 'polly prissy pants']
//   },
//   {
//     clickCount : 0,
//     name : 'Scully & TowerBeam',
//     imgSrc : 'img/scully-tower-sunbeam.jpg',
//     imgAttribution : 'http://catkittycat.com',
//     nicknames: ['Ham']
//   },
//   {
//     clickCount : 0,
//     name : 'Best Friends',
//     imgSrc : 'img/best-friends.jpg',
//     imgAttribution : 'http://catkittycat.com',
//     nicknames: ['snicklefritz', 'scrambles the death dealer', 'tumness', 'skulls', 'polly prissy pants']
//   },
//   {
//     clickCount : 0,
//     name : 'Blep Lick',
//     imgSrc : 'img/blep-lick.jpg',
//     imgAttribution : 'http://catkittycat.com',
//     nicknames: ['Burber']
//   },
//   {
//     clickCount : 0,
//     name : 'Scully',
//     imgSrc : 'img/scully-flask.jpg',
//     imgAttribution : 'http://catkittycat.com',
//     nicknames : [
//       'snicklefritz',
//       'scrambles the death dealer',
//       'tumness',
//       'skulls',
//       'polly prissy pants'
//     ]
//   }
// ]





// var Cat = function(data){
//   // variables and binding
//   this.clickCount = ko.observable(data.clickCount);
//   this.name = ko.observable(data.name);
//   this.imgSrc = ko.observable(data.imgSrc);
//   this.imgAttribution = ko.observable(data.imgAttribution);
//   this.nicknames = ko.observableArray(data.nicknames);
//
//   // functions
//   this.level = ko.computed(function(){
//     var level;
//     var clicks = this.clickCount();
//
//     console.log(clicks);
//     if (clicks < 10){
//       level = 'Genin';
//     } else if (clicks < 20){
//       level = 'Chunin';
//     } else {
//       level = 'Jonin';
//     }
//
//     return level;
//   }, this);
//
// };



// var ViewModel = function(){
//   var self = this;
//
//   this.catList = ko.observableArray([]);
//
//   initialCats.forEach(function(catItem){
//     self.catList.push( new Cat(catItem) );
//   });
//
//   this.currentCat = ko.observable( this.catList()[0] );
//
//   this.incrementCounter = function(){
//     self.currentCat().clickCount(self.currentCat().clickCount() + 1);
//   };
//
//   this.setCat = function(clickedCat){
//     self.currentCat(clickedCat);
//   };
//
// };
