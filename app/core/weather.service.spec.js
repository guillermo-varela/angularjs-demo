(function() {
  'use strict';

  describe('WeatherService', function() {

    var WeatherService;
    var $httpBackend;
    var fakeData = {
      name: 'Fake City',
      sys: {
        country: 'Fake Country'
      },
      weather: [{
        description: 'This is a test',
        icon: 'test'
      }],
      main: {
        temp: 20
      }
    };
    var expectedData = {
      name: 'Fake City',
      country: 'Fake Country',
      description: 'This is a test',
      temperature: 20,
      image: 'http://openweathermap.org/img/w/test.png'
    };

    beforeEach(function() {
      module('weatherApp.core');

      inject(function(_WeatherService_, _$httpBackend_) {
        WeatherService = _WeatherService_;
        $httpBackend = _$httpBackend_;
      });
    });

    afterEach(function() {
      $httpBackend.resetExpectations();
    });

    it('Should return the city info', function(done) {
      $httpBackend
        .expectGET(/http:\/\/api\.openweathermap\.org\/data\/2\.5\/weather\?.*/g)
        .respond(fakeData);

      WeatherService.checkCity()
        .then(
          function(data) {
            expect(data).toEqual(expectedData);
            done();
          });

      $httpBackend.flush();
    });

    it('Should handle an unexisting city response', function(done) {
      $httpBackend
        .expectGET(/http:\/\/api\.openweathermap\.org\/data\/2\.5\/weather\?.*/g)
        .respond({
          cod: '404'
        });

      WeatherService.checkCity()
        .catch(
          function(error) {
            expect(error).toEqual('City not found');
            done();
          });

      $httpBackend.flush();
    });
  });
}());
