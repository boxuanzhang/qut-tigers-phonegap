'use strict';

describe('Directive: fileOnChange', function () {

  // load the directive's module
  beforeEach(module('qutTigersApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<file-on-change></file-on-change>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the fileOnChange directive');
  }));
});
