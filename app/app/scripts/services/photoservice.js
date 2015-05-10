'use strict';

/**
 * @ngdoc service
 * @name qutTigersApp.PhotoService
 * @description
 * # PhotoService
 * Factory in the qutTigersApp.
 */
angular.module('qutTigersApp')
  .factory('PhotoService', function (BaseService, $q) {
    function PhotoService() {

    }

    PhotoService.prototype.getPhoto = function (photoId, success, error) {
      BaseService.get(
        '/photo/' + photoId,
        {},
        function (data, status) {
          success(data.photo);
        },
        function (data, status) {
          error();
        }
      );
    };

    PhotoService.prototype.getPhotoPromise = function (photoId) {
      var deffered = $q.defer();

      BaseService.get(
        '/photo/' + photoId,
        {},
        function (data, status) {
          deffered.resolve(data.photo);
        },
        function (data, status) {
          deffered.reject();
        }
      );

      return deffered.promise;
    };

    return new PhotoService();
  });
