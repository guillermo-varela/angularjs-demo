(function() {
  'use strict';

  describe('CityController', function() {

    var $controller;
    var $q;
    var $scope;
    var WeatherService;
    var WeatherServiceMock;
    var $window;
    var $windowMock;
    var mockTitle = 'Mock Title';
    var mockCity = {
      name: 'Mock City',
      country: 'Mock Country',
      description: 'This is a test',
      temperature: 20,
      image: 'http://url.com/test.png'
    };

    beforeEach(function() {
      module('weatherApp.home');
      module('weatherApp.templates');

      inject(function($rootScope, _$q_, _$controller_, _$window_, _WeatherService_) {
        $scope = $rootScope.$new();
        $scope.pageTitle = mockTitle;
        $q = _$q_;
        $controller = _$controller_;
        $window = _$window_;
        $windowMock = sinon.mock($window);

        WeatherService = _WeatherService_;
        WeatherServiceMock = sinon.mock(WeatherService);
      });
    });

    afterEach(function() {
      WeatherServiceMock.restore();
      $windowMock.restore();
    });

    it('Should have the city weather info', function() {
      var cityController = buildCityController(1, $q.resolve(mockCity));

      expect(cityController.cityWeather).toBe(mockCity);
      expect($scope.pageTitle).toEqual(mockCity.name + ' - ' + mockTitle);
      WeatherServiceMock.verify();
    });

    it('Should handle an unexisting city', function() {
      $windowMock.expects('alert').once().withArgs('Error checking the weather.');

      var cityController = buildCityController(1, $q.reject());
      var unknownCity = {
        name: 'Unknown City'
      };

      expect(cityController.cityWeather).toEqual(unknownCity);
      expect($scope.pageTitle).toEqual(unknownCity.name + ' - ' + mockTitle);
      WeatherServiceMock.verify();
      $windowMock.verify();
    });

    function buildCityController(cityId, cityResult) {
      WeatherServiceMock.expects('checkCity').once().withArgs(cityId).returns(cityResult);

      var cityController = $controller('CityController', {
        $rootScope: $scope,
        $stateParams: {
          cityId: cityId
        },
        $window: $window,
        WeatherService: WeatherService
      });

      // Required to resolve the promise on WeatherService
      $scope.$apply();

      return cityController;
    }
  });
}());
