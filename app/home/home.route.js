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
          data: {
            pageTitle: 'Home'
          }
        }
      }
    ];
  }
})();
