'use strict';

/**
 * @ngdoc service
 * @name qutTigersApp.PhotoService
 * @description
 * # PhotoService
 * Factory in the qutTigersApp.
 */
angular.module('qutTigersApp')
  .factory('PhotoService', function (BaseService, $q, Upload) {
    function PhotoService() {

    }

    PhotoService.prototype.getPhotoPromise = function (photoId) {
      var deffered = $q.defer();

      var cacheKey = 'photo_' + photoId;
      var cached = lscache.get(cacheKey);
      if (cached) {
        deffered.resolve(cached);
      } else {
        BaseService.get(
          '/photo/' + photoId,
          {},
          function (data, status) {
            lscache.set(cacheKey, data.photo, 30);
            deffered.resolve(data.photo);
          },
          function (data, status) {
            deffered.reject();
          }
        );
      }

      return deffered.promise;
    };

    PhotoService.prototype.getUploadPhotoPromise = function (file) {
      var deffered = $q.defer();

      BaseService.get(
        '/photo_token/',
        {
          description: 'Photo'
        },
        function (data, status) {
          var upload = data.upload;
          Upload.upload({
            url: upload.url,
            fields: {
              'token': upload.token
            },
            file: file
          }).success(function (data, status, headers, config) {
            deffered.resolve(data.photo);
          }).error(function () {
            deffered.reject();
          });
        },
        function (data, status) {
          deffered.reject();
        }
      );

      return deffered.promise;
    };

    return new PhotoService();
  });
