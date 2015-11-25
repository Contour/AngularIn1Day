'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {

  it('should contain h1 header with text: Angular In 1 Day', function() {
    browser.get('index.html#/');
    expect(element(by.css('h1')).getText()).toBe("Angular In 1 Day");
  });
});
