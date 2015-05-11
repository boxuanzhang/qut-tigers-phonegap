'use strict';

/**
 * @ngdoc service
 * @name qutTigersApp.BaseService
 * @description
 * # BaseService
 * Factory in the qutTigersApp.
 */
angular.module('qutTigersApp')
  .factory('BaseService', function ($window, $location, $http, settings) {
    function BaseService() {
    }

    BaseService.prototype._responseHandler = function (data, status, success, error) {
      if (status >= 200 && status <= 299) {
        success(data, status);
      } else if (status == 401) {
        $window.sessionStorage.clear();
        $location.path('/login');
      } else if (status == 403) {
        alert('Permission denied!');  // This should not happen
        error(data, status);
      } else {
        error(data, status);
      }
    };

    BaseService.prototype.getUrl = function (entry) {
      return settings.apiRoot + entry;
    };

    BaseService.prototype.http = function (method, url, data, params, success, error) {
      var self = this;
      $http({
        method: method.toUpperCase(),
        url: url,
        data: data,
        params: params,
        cache: false
      }).success(function (data, status, headers, config) {
        console.log(method.toUpperCase() + ' Response - status: ' + status + ' - data: ' + JSON.stringify(data));
        self._responseHandler(data, status, success, error);
      }).error(function (data, status, headers, config) {
        console.log(method.toUpperCase() + ' Error - status: ' + status + ' - data: ' + JSON.stringify(data));
        self._responseHandler(data, status, success, error);
      });
    };

    BaseService.prototype.post = function (entry, data, success, error) {
      this.http('post', this.getUrl(entry), {}, data, success, error);
    };

    BaseService.prototype.get = function (entry, data, success, error) {
      this.http('get', this.getUrl(entry), {}, data, success, error);
    };

    BaseService.prototype.put = function (entry, data, success, error) {
      this.http('put', this.getUrl(entry), {}, data, success, error);
    };

    BaseService.prototype.delete = function (entry, data, success, error) {
      this.http('delete', this.getUrl(entry), {}, data, success, error);
    };

    return new BaseService();
  });
