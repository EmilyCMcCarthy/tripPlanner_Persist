'use strict';

/**
 * This module is for miscellaneous helper functions which may be reused
 * across multiple modules, or else which clear up the main module code
 * through abstraction. It could easily be replaced by lodash.
 */

var utilsModule = {

  // copies properties from source onto target object
  merge: function (source, target) {
    if (!source) return;
    Object.keys(source).forEach(function (key) {
      target[key] = source[key];
    });
  },

  // pushes into array, but only if the item isn't already inside it
  pushUnique: function (array, item) {
    if (array.indexOf(item) > -1) return;
    return array.push(item);
  },

  // removes a given item from an array if it's inside it
  remove: function (array, item) {
    var index = array.indexOf(item);
    if (index === -1) return;
    return array.splice(index, 1);
  },

  // addAttraction: function (attraction, type) {
  //   // adding to the day object
  //   switch (type) {
  //     case 'hotel':
  //       if (this.hotel) this.hotel.hide();
  //       this.hotel = attraction;
  //       break;
  //     case 'restaurant':
  //       utilsModule.pushUnique(this.restaurants, attraction);
  //       break;
  //     case 'activity':
  //       utilsModule.pushUnique(this.activities, attraction);
  //       break;
  //     default: console.error('bad type:', attraction);
  //   }
  //   // activating UI
  //   attraction.show();
  // };


  logErr: console.error.bind(console)

};
