(function() {
  'use strict';

  angular
    .module('weatherApp')
    .config(configure);

  /* @ngInject */
  function configure($compileProvider, $logProvider, $httpProvider) {
    // Replaced by Gulp build task
    $compileProvider.debugInfoEnabled('@@debugInfoEnabled' !== 'false');
    $logProvider.debugEnabled('@@debugLogEnabled' !== 'false');

    $httpProvider.interceptors.push('HttpInterceptor');
  }
})();
