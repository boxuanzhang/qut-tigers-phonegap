'use strict';

/**
 * @ngdoc service
 * @name qutTigersApp.StatusService
 * @description
 * # StatusService
 * Factory in the qutTigersApp.
 */
angular.module('qutTigersApp')
  .factory('StatusService', function (BaseService, $q) {
    function PagingParams(after, count) {
      this.after = after || null;
      this.count = count || 20;
    }

    PagingParams.prototype.hasNext = function () {
      return Boolean(this.after);
    };

    PagingParams.prototype._toData = function () {
      var param = {
        '_per_page': this.count
      };
      if (this.after) {
        param['_after'] = this.after;
      }
      return param;
    };


    function StatusService() {
    }

    StatusService.prototype.getList = function (paging, success, error) {
      if (!paging) {
        paging = new PagingParams();
      }

      BaseService.get(
        '/status/',
        paging._toData(),
        function (data, status) {
          success(data.statuses, new PagingParams(data._paging.after));
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

    return new StatusService();
  });
