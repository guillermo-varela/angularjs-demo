(function() {
  'use strict';

  describe('weatherApp', function() {

    describe('home', function () {
      beforeEach(function() {
        browser.get('/');
      });

      it('Should has an appropriate title', function() {
        expect(browser.getTitle()).toEqual('Test - Weather Web App');
      });

      it('Should has a list of cities', function() {
        var cities = element.all(by.css('.list-group-item')).getText();

        expect(cities.count()).toEqual(15);
        expect(cities.get(2).getText()).toEqual('Cali - CO');
      });
    });

    describe('city', function() {
      beforeEach(function() {
        browser.get('/#/home/city/3687925');
      });

      it('Should has an appropriate title', function() {
        expect(browser.getTitle()).toEqual('Cali - Weather Web App');
      });
    });

  });
}());
