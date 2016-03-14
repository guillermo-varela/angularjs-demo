(function() {
  'use strict';

  angular
    .module('weatherApp.blocks.exception')
    .config(exceptionConfig);

  /* @ngInject */
  function exceptionConfig($provide) {
    $provide.decorator('$exceptionHandler', extendExceptionHandler);
  }

  /**
   * @ngdoc function
   * @name weatherApp.blocks.exception.function:extendExceptionHandler
   * @private
   *
   * @description
   * Extends the $exceptionHandler service to perform a more advanced AngularJS exception handling.
   *
   * @param {Object} $delegate - $exceptionHandler delegator.
   * @param {Object} ExceptionCatcher - Exception handler.
   * @returns {function} Function defining how to handle the exception.
   */
  /* @ngInject */
  function extendExceptionHandler($delegate, ExceptionCatcher) {

    function handleException(exception, cause) {
      $delegate(exception, cause);

      var errorData = {
        exception: exception,
        cause: cause
      };

      var msg = 'Weather Web App Error: ' + exception.message;
      ExceptionCatcher.catcher('ANGULARJS_ERROR', msg, errorData);
    }

    return handleException;
  }
})();
