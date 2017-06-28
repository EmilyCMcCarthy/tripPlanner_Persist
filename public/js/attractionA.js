'use strict';
/* global $ mapModule tripModule utilsModule */

/**
 * This module builds front-end `attraction` objects from raw database
 * data. The attraction objects have both DOM `.$itineraryItem` elements
 * and Google Map `.marker`s stored on them as properties. The attractions also
 * have two important methods: `.show()` and `.hide()` cause the itinerary item
 * and marker to be displayed or erased, all automatically.
 *
 * The module has one publicly-usable method: `.create(data)`, which takes
 * a database object for an attraction and creates the live, prototypal
 * `attraction` object with its methods and extra properties. It then
 * returns that object. That method is used principally in `options.js`.
 */

var attractionModule = (function () {

  // jQuery selections

  var $itinerary, $hotel, $restaurants, $activities;
  $(function(){
    $itinerary = $('#itinerary');
    $hotel = $itinerary.find('ul[data-type="hotel"]');
    $restaurants = $itinerary.find('ul[data-type="restaurants"]');
    $activities = $itinerary.find('ul[data-type="activities"]');
  });

  // Attraction class setup

  function Attraction (data) {
    utilsModule.merge(data, this); // copy all key-val pairs into this new obj
  }


  // globally accessible module methods

  var publicAPI = {

    create: function (databaseAttraction) {
      return new Attraction(databaseAttraction);
    }

  };

  return publicAPI;

}());
