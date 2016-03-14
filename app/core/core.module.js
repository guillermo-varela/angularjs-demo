(function() {
  'use strict';

  /**
   * @ngdoc overview
   * @name weatherApp.core
   * @requires weatherApp.blocks.router
   *
   * @description
   * Module for the core bussiness logic and intra-app features.
   */
  angular.module('weatherApp.core', [
    /* Cross-app modules */
    'weatherApp.blocks.router',
    'weatherApp.widgets',
    'weatherApp.blocks.exception',
    'weatherApp.blocks.http'
  ]);
})();
