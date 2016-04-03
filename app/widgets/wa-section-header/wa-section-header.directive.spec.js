(function() {
  'use strict';

  describe('waSectionHeader', function() {

    var $scope;
    var $compile;

    beforeEach(function() {
      module('weatherApp.widgets');
      module('weatherApp.templates');

      inject(function($rootScope, _$compile_) {
        $scope = $rootScope.$new();
        $compile = _$compile_;
      });
    });

    it('Adds the header to the HTML content from plain text', function() {
      var element = '<wa-section-header wa-title="\'Plain Title\'" wa-subtitle="\'Plain Subtitle\'"></wa-section-header>';

      element = $compile(element)($scope);
      $scope.$digest();

      expect(element.find('h1').text()).toEqual('Plain Title');
      expect(element.find('p').text()).toEqual('Plain Subtitle');
    });

    it('Adds the header to the HTML content from the scope', function() {
      $scope.header = {
        title: 'Scope Title',
        subtitle: 'Scope Subtitle'
      };

      var element = '<wa-section-header wa-title="header.title" wa-subtitle="header.subtitle"></wa-section-header>';

      element = $compile(element)($scope);
      $scope.$digest();

      expect(element.find('h1').text()).toEqual('Scope Title');
      expect(element.find('p').text()).toEqual('Scope Subtitle');
    });
  });
}());
