var map;

// initialize map
function initMap() {

  // custom map styles from: https://snazzymaps.com/style/15/subtle-grayscale
  var styles = [
    {"featureType":"administrative","elementType":"all","stylers":[{"saturation":"-100"}]},{"featureType":"administrative.province","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","elementType":"all","stylers":[{"saturation":-100},{"lightness":"50"},{"visibility":"simplified"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":"-100"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"lightness":"30"}]},{"featureType":"road.local","elementType":"all","stylers":[{"lightness":"40"}]},{"featureType":"transit","elementType":"all","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]},{"featureType":"water","elementType":"labels","stylers":[{"lightness":-25},{"saturation":-100}]}
  ];


  // Constructor creates a new map
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.7413549, lng: -73.9980244},
    styles: styles,
    zoom: 13
  });
}








// setup default data
var initialLocations = [
  {
    title : 'Park Ave Penthouse',
    location : {
      lat : 40.7713024,
      lng : -73.9632393
    }
  },
  {title : 'Chelsea Loft', location : {lat : 40.7444883, lng : -73.9949465}}
]


var Location = function(data){
  this.title = ko.observable(data.title);
};


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

var ViewModel = function(){
  var self = this;

  this.locationList = ko.observableArray([]);

  initialLocations.forEach(function(locationItem){
    self.locationList.push( new Location(locationItem) );
  });

  this.currentLocation = ko.observable( this.locationList()[0] );

  this.testClick = function(clickedItem){
    self.currentLocation(clickedItem);
    console.log(clickedItem.title);
  };
}

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


// init ViewModel
ko.applyBindings(new ViewModel());
