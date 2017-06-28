'use strict';
/* global $ tripModule attractionsModule hotels restaurants activities */

/**
 * This module fills the `select` tags with `option`s.
 * It runs immediately upon document ready (not called by other modules).
 * Each `option` displays the name of an attraction and is has a value of
 * that attraction's id. Selecting an option looks up the attraction by id,
 * then tells the trip module to add the attraction.
 */

var todaysRest = [];
var todaysAct = [];


$(function(){

  // jQuery selects
  var $optionsPanel = $('#options-panel');
  var $hotelSelect = $optionsPanel.find('#hotel-choices');
  var $restaurantSelect = $optionsPanel.find('#restaurant-choices');
  var $activitySelect = $optionsPanel.find('#activity-choices');

  // make all the option tags (second arg of `forEach` is a `this` binding)
  hotels.forEach(makeOption, $hotelSelect);
  restaurants.forEach(makeOption, $restaurantSelect);
  activities.forEach(makeOption, $activitySelect);

  function makeOption (databaseAttraction) {
    var $option = $('<option></option>') // makes a new option tag
      .text(databaseAttraction.name)
      .val(databaseAttraction.id);
    this.append($option); // add the option to the specific select
  }

  // what to do when the `+` button next to a `select` is clicked
  $optionsPanel.on('click', 'button[data-action="add"]', function () {
    var $select = $(this).siblings('select');
    var type = $select.data('type'); // from HTML data-type attribute
    var id = $select.find(':selected').val();
    // get associated attraction and add it to the current day in the trip
    //var attraction = attractionsModule.getByTypeAndId(type, id);
    //console.log('attraction', attraction);
    //tripModule.addToCurrent(attraction);

    

    //console.log(type);
    var attraction = attractionsModule.getByTypeAndId(type, id);


    if(type === "hotel"){
      $.ajax({
        method: 'POST',
        url: '/api/hotels',
        //data: someDataToSend, // e.g. for POST requests
      })
      .then(function (responseData) {
        console.log(responseData)
        var sortedResponse = responseData.sort(function(a,b){
          return a.id - b.id;
        })
        var attraction = sortedResponse[id-1].name;
        $('#itinerary [data-type="hotel"]').text(attraction).append('<button class="btn btn-xs btn-danger remove remove-rest btn-circle">x</button>');
      })
      .catch(function (errorObj) {
      });
    }

    else if(type === "restaurant"){

      $.ajax({
        method: 'POST',
        url: '/api/restaurants',
        //data: someDataToSend, // e.g. for POST requests
      })
      .then(function (responseData) {
        utilsModule.pushUnique(todaysRest, attraction);
        //console.log(todaysRest, "todaysRest Array");
        $('#itinerary [data-type="restaurants"]').append('<div><span class="title">'+todaysRest[todaysRest.length-1].name+'</span>\n<button class="btn btn-xs btn-danger remove remove-rest btn-circle">x</button>\n</div>');
      })
      .catch(function (errorObj) {
      });
    }

    else if(type === "activity"){
      $.ajax({
        method: 'POST',
        url: '/api/activities',
        //data: someDataToSend, // e.g. for POST requests
      })
      .then(function (responseData) {
        utilsModule.pushUnique(todaysAct, attraction);
        //console.log(todaysAct, "todaysRest Array");
        $('#itinerary [data-type="activities"]').append('<div><span class="title">'+todaysAct[todaysAct.length-1].name+'</span>\n<button class="btn btn-xs btn-danger remove remove-rest btn-circle">x</button>\n</div>');
      })
      .catch(function (errorObj) {
      });

    }
    else{
      throw new Error("please use correct");
    }
  });

});

