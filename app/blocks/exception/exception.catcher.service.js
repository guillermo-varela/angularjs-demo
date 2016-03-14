(function() {
  'use strict';

  angular
    .module('weatherApp.blocks.exception')
    .factory('ExceptionCatcher', ExceptionCatcher);

  /**
   * @ngdoc service
   * @name weatherApp.blocks.exception.service:ExceptionCatcher
   *
   * @description
   * Handles exceptions in the application.
   */
  /* @ngInject */
  function ExceptionCatcher($log) {
    var service = {
      catcher: catcher,
      httpCatcher: httpCatcher
    };

    return service;

    ///////////////

    /**
     * @ngdoc function
     * @name ExceptionCatcher#catcher
     * @methodOf weatherApp.blocks.exception.service:ExceptionCatcher
     *
     * @description
     * Handles an exception with its message.
     *
     * @param {string} event - Name of the event that caused the error.
     * @param {string} message - Message for the exception.
     * @param {object} reason - Object with more information about the error.
     */
    function catcher(event, message, reason) {
      $log.debug(event + ': ' + message, reason);
    }

    /**
     * @ngdoc function
     * @name ExceptionCatcher#httpCatcher
     * @methodOf weatherApp.blocks.exception.service:ExceptionCatcher
     *
     * @description
     * Handles HTTP errors.
     *
     * @param {Object} error - Error object.
     * @param {number} status - HTTP status code.
     * @param {Object} config - Object with the request data.
     */
    function httpCatcher(error, status, config) {
      var message = 'Error: ' + JSON.stringify(error) + '\n' + 'Status: ' + status + '\n';

      if (config && config.headers && config.headers.authorization) {
        config.headers.authorization = config.headers.authorization.replace(/./g, '*');
      }

      if (config.data && config.data.password) {
        config.data.password = config.data.password.replace(/./g, '*');
      }

      if (config.params && config.params.appid) {
        config.params.appid = config.params.appid.replace(/./g, '*');
      }

      catcher('HTTP_ERROR', message, config);
    }
  }
})();
