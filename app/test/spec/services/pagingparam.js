'use strict';

describe('Service: PagingParam', function () {

  // load the service's module
  beforeEach(module('qutTigersApp'));

  // instantiate service
  var PagingParam;
  beforeEach(inject(function (_PagingParam_) {
    PagingParam = _PagingParam_;
  }));

  it('should do something', function () {
    expect(!!PagingParam).toBe(true);
  });

});
