(function() {
  'use strict';

  angular
    .module('weatherApp.home')
    .controller('CityController', CityController);

  /**
   * @ngdoc controller
   * @name weatherApp.home.controller:CityController
   *
   * @description
   * Controller for the 'City' section.
   */
  /* @ngInject */
  function CityController($rootScope, $stateParams, $window, WeatherService) {
    var vm = this;

    vm.cityWeather = {};

    activate();

    ///////////////

    function activate() {
      WeatherService.checkCity($stateParams.cityId)
        .then(checkCityComplete)
        .catch(checkCityError)
        .finally(checkCityFinally);
    }

    function checkCityComplete(data) {
      vm.cityWeather = data;
    }

    function checkCityError() {
      vm.cityWeather = {
        name: 'Unknown City'
      };
      $window.alert('Error checking the weather.');
    }

    function checkCityFinally() {
      $rootScope.pageTitle = vm.cityWeather.name + ' - ' + $rootScope.pageTitle;
    }
  }
})();
