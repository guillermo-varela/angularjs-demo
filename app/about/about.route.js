(function() {
  'use strict';

  angular
    .module('weatherApp.about')
    .run(appRun);

  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'about',
        config: {
          url: '/about',
          templateUrl: 'about/about.html',
          data: {
            pageTitle: 'About'
          }
        }
      }
    ];
  }
})();
