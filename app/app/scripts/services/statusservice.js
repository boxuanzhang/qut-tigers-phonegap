'use strict';

/**
 * @ngdoc service
 * @name qutTigersApp.StatusService
 * @description
 * # StatusService
 * Factory in the qutTigersApp.
 */
angular.module('qutTigersApp')
  .factory('StatusService', function (BaseService) {
    function PagingParams(after, count) {
      this.after = after || '';
      this.count = count || 20;
    }

    PagingParams.prototype.hasNext = function () {
      return Boolean(this.after);
    };

    PagingParams.prototype._toData = function () {
      return {
        '_after': this.after,
        '_per_page': this.count
      }
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
          success(data.statuses);
        },
        function (data, status) {
          error();
        }
      );
    };

    return new StatusService();
  });
