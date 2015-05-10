'use strict';

describe('Service: PhotoService', function () {

  // load the service's module
  beforeEach(module('qutTigersApp'));

  // instantiate service
  var PhotoService;
  beforeEach(inject(function (_PhotoService_) {
    PhotoService = _PhotoService_;
  }));

  it('should do something', function () {
    expect(!!PhotoService).toBe(true);
  });

});
