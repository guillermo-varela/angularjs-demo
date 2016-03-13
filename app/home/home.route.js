(function() {
  'use strict';

  angular
    .module('weatherApp.home')
    .run(appRun);

  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates(), '/home');
  }

  function getStates() {
    return [
      {
        state: 'home',
        config: {
          url: '/home',
          templateUrl: 'home/home.html',
          controller: 'HomeController',
          controllerAs: 'vm',
          data: {
            pageTitle: 'Home'
          }
        }
      },
      {
        state: 'city',
        config: {
          url: '/home/city/:cityId',
          templateUrl: 'home/city/city.html',
          controller: 'CityController',
          controllerAs: 'vm'
        }
      }
    ];
  }
})();
