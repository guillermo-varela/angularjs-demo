(function() {
  'use strict';

  angular
    .module('weatherApp')
    .config(configure);

  /* @ngInject */
  function configure($compileProvider, $logProvider) {
    // Replaced by Gulp build task
    $compileProvider.debugInfoEnabled('@@debugInfoEnabled' !== 'false');
    $logProvider.debugEnabled('@@debugLogEnabled' !== 'false');
  }
})();
