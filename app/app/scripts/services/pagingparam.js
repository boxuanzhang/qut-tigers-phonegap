'use strict';

/**
 * @ngdoc service
 * @name qutTigersApp.PagingParam
 * @description
 * # PagingParam
 * Factory in the qutTigersApp.
 */
angular.module('qutTigersApp')
  .factory('PagingParam', function () {
    function PagingParam(after, count) {
      this.after = after || null;
      this.count = count || 20;
    }

    PagingParam.prototype.hasNext = function () {
      return Boolean(this.after);
    };

    PagingParam.prototype._toData = function () {
      var param = {
        '_per_page': this.count
      };
      if (this.after) {
        param['_after'] = this.after;
      }
      return param;
    };

    return PagingParam;
  });
