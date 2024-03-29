'use strict';

describe('Directive: tweetsTimeline', function () {

  // load the directive's module
  beforeEach(module('qutTigersApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<tweets-timeline></tweets-timeline>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the tweetsTimeline directive');
  }));
});
