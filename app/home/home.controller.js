(function() {
  'use strict';

  angular
    .module('weatherApp.home')
    .controller('HomeController', HomeController);

  /**
   * @ngdoc controller
   * @name weatherApp.home.controller:HomeController
   *
   * @description
   * Controller for the 'Home' section.
   */
  /* @ngInject */
  function HomeController(cities) {
    var vm = this;

    vm.cities = cities;
  }
})();
