(function() {
  'use strict';

  angular
    .module('weatherApp.core')
    .factory('WeatherService', WeatherService);

  /**
   * @ngdoc service
   * @name weatherApp.core.service:WeatherService
   *
   * @description
   * Service with the weather operations.
   */
  /* @ngInject */
  function WeatherService($q, $http) {
    var openWheaterAppId = 'abc123';

    var service = {
      checkCity: checkCity
    };

    return service;

    ///////////////

    /**
     * @ngdoc function
     * @name WeatherService#checkCity
     * @methodOf weatherApp.core.service:WeatherService
     *
     * @description
     * Checks the weather on a given city.
     *
     * @param {number} cityId - Id of the city to check.
     * @returns {Promise} Promise that will be resolved with the current weather in the checked city.
     */
    function checkCity(cityId) {
      var deferred = $q.defer();

      $http.get('http://api.openweathermap.org/data/2.5/weather', {
          params: {
            id: cityId,
            units: 'metric',
            appid: openWheaterAppId
          }
        })
        .then(checkCityComplete)
        .catch(checkCityError);

      function checkCityComplete(response) {
        if (!response || !response.data || response.data.cod === '404') {
          checkCityError('City not found');
        } else {
          var cityWeather = {
            name: response.data.name,
            country: response.data.sys.country,
            description: response.data.weather[0].description,
            temperature: response.data.main.temp,
            image: 'http://openweathermap.org/img/w/' + response.data.weather[0].icon + '.png'
          };

          deferred.resolve(cityWeather);
        }
      }

      function checkCityError(error) {
        deferred.reject(error);
      }

      return deferred.promise;
    }
  }
})();
