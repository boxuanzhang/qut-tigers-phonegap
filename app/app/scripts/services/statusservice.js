'use strict';

/**
 * @ngdoc service
 * @name qutTigersApp.StatusService
 * @description
 * # StatusService
 * Factory in the qutTigersApp.
 */
angular.module('qutTigersApp')
  .factory('StatusService', function (BaseService, $q, PagingParam) {

    function StatusService() {
    }

    StatusService.prototype.getList = function (paging, success, error) {
      if (!paging) {
        paging = new PagingParam();
      }

      BaseService.get(
        '/status/',
        paging._toData(),
        function (data, status) {
          success(data.statuses, new PagingParam(data._paging.after));
        },
        function (data, status) {
          error();
        }
      );
    };

    StatusService.prototype.getStatusPromise = function (statusId) {
      var deffered = $q.defer();

      var cacheKey = 'status_' + statusId;
      var cache = lscache.get(cacheKey);
      if (cache) {
        deffered.resolve(cache);
      } else {
        BaseService.get(
          '/status/' + statusId,
          {},
          function (data, status) {
            lscache.set(cacheKey, data.status, 60);
            deffered.resolve(data.status);
          },
          function (data, status) {
            deffered.reject();
          }
        );
      }

      return deffered.promise;
    };

    StatusService.prototype.getPostStatusPromise = function (title, subtitle, content, photoIds) {
      var deffered = $q.defer();

      BaseService.post(
        '/status/',
        {
          title: title,
          subtitle: subtitle,
          content: content,
          photos: photoIds[0]
        },
        function (data, status) {
          deffered.resolve(data.status);
        },
        function (data, status) {
          deffered.reject();
        }
      );

      return deffered.promise;
    };

    StatusService.prototype.getDeleteStatusPromise = function (statusId) {
      var deffered = $q.defer();

      BaseService.delete(
        '/status/' + statusId,
        {},
        function (data, status) {
          deffered.resolve();
        },
        function (data, status) {
          deffered.reject();
        }
      );

      return deffered.promise;
    };

    return new StatusService();
  });
