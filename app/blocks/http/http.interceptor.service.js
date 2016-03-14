(function() {
  'use strict';

  angular
    .module('weatherApp.blocks.http')
    .factory('HttpInterceptor', HttpInterceptor);

  /**
   * @ngdoc service
   * @name weatherApp.blocks.http.service:HttpInterceptor
   *
   * @description
   * Intercepts all HTTP requests.
   */
  /* @ngInject */
  function HttpInterceptor($q, ExceptionCatcher) {
    var service = {
      responseError: responseError
    };

    return service;

    ///////////////

    /**
     * @ngdoc function
     * @name HttpInterceptor#responseError
     * @methodOf weatherApp.blocks.http.service:HttpInterceptor
     *
     * @description
     * Handles all HTTP responses with error.
     *
     * @param {Object} rejection - Object with information about the error.
     */
    function responseError(rejection) {
      ExceptionCatcher.httpCatcher(rejection.data, rejection.status, rejection.config);
      return $q.reject(rejection);
    }
  }
})();
