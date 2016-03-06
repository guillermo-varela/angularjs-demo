(function() {
  'use strict';

  /**
   * @ngdoc object
   * @name weatherApp
   * @requires weatherApp.home
   * @requires weatherApp.about
   *
   * @description
   * Main application module.
   */
  angular.module('weatherApp', [
    /* Feature areas */
    'weatherApp.home',
    'weatherApp.about'
  ]);
})();
