(function() {
  'use strict';

  angular
    .module('weatherApp.widgets')
    .directive('waSectionHeader', waSectionHeader);

  /**
   * @ngdoc directive
   * @name weatherApp.widgets.directive:waSectionHeader
   * @restrict EA
   *
   * @description
   * Renders the title and subtitle for sections in an consistent way.
   */
  function waSectionHeader() {
    var directive = {
      restrict: 'EA',
      scope: {
        title: '=waTitle',
        subtitle: '=waSubtitle'
      },
      templateUrl: 'widgets/wa-section-header/wa-section-header.html'
    };

    return directive;
  }
})();
