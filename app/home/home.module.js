(function() {
  'use strict';

  /**
   * @ngdoc overview
   * @name weatherApp.home
   * @requires weatherApp.core
   *
   * @description
   * Module for the home section.
   */
  angular
    .module('weatherApp.home', ['weatherApp.core'])
    .constant('cities', [
      {'id': 5128581, 'name': 'New York City', 'country': 'US'},
      {'id': 5549222, 'name': 'Washington', 'country': 'US'},
      {'id': 5754005, 'name': 'Springfield', 'country': 'US'},
      {'id': 2643741, 'name': 'City of London', 'country': 'GB'},
      {'id': 2644210, 'name': 'Liverpool', 'country': 'GB'},
      {'id': 2653265, 'name': 'Chelsea', 'country': 'GB'},
      {'id': 3530597, 'name': 'Mexico City', 'country': 'MX'},
      {'id': 3531673, 'name': 'Cancun', 'country': 'MX'},
      {'id': 3435910, 'name': 'Buenos Aires', 'country': 'AR'},
      {'id': 3844421, 'name': 'Mendoza', 'country': 'AR'},
      {'id': 3688689, 'name': 'Bogota', 'country': 'CO'},
      {'id': 3687925, 'name': 'Cali', 'country': 'CO'},
      {'id': 3674962, 'name': 'Medellin', 'country': 'CO'},
      {'id': 3448439, 'name': 'Sao Paulo', 'country': 'BR'},
      {'id': 3451190, 'name': 'Rio de Janeiro', 'country': 'BR'}
    ]);

})();
