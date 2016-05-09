(function() {
  'use strict';

  angular
    .module('weatherApp.blocks.router')
    .provider('routerHelper', routerHelper);

  /* @ngInject */
  function routerHelper($stateProvider, $urlRouterProvider) {
    /* jshint validthis:true */
    this.$get = RouterHelper;

    /**
     * @ngdoc service
     * @name weatherApp.blocks.router.service:RouterHelper
     * @requires $state
     * @requires $rootScope
     *
     * @description
     * Helper with the routing common operations.
     */
    /* @ngInject */
    function RouterHelper($state, $rootScope) {
      var hasOtherwise = false;

      var service = {
        configureStates: configureStates,
        getStates: getStates
      };

      init();

      return service;

      ///////////////

      function init() {
        updateDocTitle();
      }

      /**
       * @ngdoc function
       * @name RouterHelper#configureStates
       * @methodOf weatherApp.blocks.router.service:RouterHelper
       *
       * @description
       * Finds a country with the given ID.
       *
       * @param {Array} states - Array with the states objects to configure.
       * @param {string=} otherwisePath - Optionally a default route path can be given.
       */
      function configureStates(states, otherwisePath) {
        states.forEach(function(state) {
          $stateProvider.state(state.state, state.config);
        });

        if (otherwisePath && !hasOtherwise) {
          hasOtherwise = true;
          $urlRouterProvider.otherwise(otherwisePath);
        }
      }

      /**
       * @ngdoc function
       * @name RouterHelper#getStates
       * @methodOf weatherApp.blocks.router.service:RouterHelper
       *
       * @description
       * Gets the configured states.
       *
       * @returns {Array} Configured states.
       */
      function getStates() {
        return $state.get();
      }

      /**
       * @ngdoc function
       * @name RouterHelper#updateDocTitle
       * @methodOf weatherApp.blocks.router.service:RouterHelper
       * @private
       *
       * @description
       * Updates the current page (document) title according to the state/route.
       */
      function updateDocTitle() {
        $rootScope.$on('$stateChangeStart',
          function(event, current) {
            var title = 'Weather Web App';
            if (current.data && current.data.pageTitle) {
              title = current.data.pageTitle + ' - ' + title;
            }
            $rootScope.pageTitle = title;
          }
        );
      }
    }
  }
})();
