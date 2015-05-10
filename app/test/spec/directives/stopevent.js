'use strict';

describe('Directive: stopEvent', function () {

  // load the directive's module
  beforeEach(module('qutTigersApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<stop-event></stop-event>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the stopEvent directive');
  }));
});
