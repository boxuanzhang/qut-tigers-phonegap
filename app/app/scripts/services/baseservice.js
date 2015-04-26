'use strict';

/**
 * @ngdoc service
 * @name qutTigersApp.BaseService
 * @description
 * # BaseService
 * Factory in the qutTigersApp.
 */
angular.module('qutTigersApp')
  .factory('BaseService', function () {
    function BaseService() {}

    BaseService.prototype._transform = function (data) {
      return $.param(data);
    };

    BaseService.prototype._responseHandler = function (data, success, error) {
      var ret;
      if (typeof data.ret == 'undefined')
        ret = -1;
      else
        ret = data.ret;

      switch (ret) {
        case 0:
          success(data);
          break;
        case 2002:
          $window.sessionStorage.clear();
          $location.path('/');
          break;
        case 2006:
          alert('操作过于频繁');
          break;
        default:
          console.log('Error ret: ' + ret);
          error(ret);
      }
    };

    BaseService.prototype.getUrl = function (entry) {
      return settings.apiRoot + entry;
    };

    BaseService.prototype.http = function (method, entry, data, success, error) {
      var self = this;
      $http({
        method: method.toUpperCase(),
        url: this.getUrl(entry),
        params: {
          '_t': Date.now().toString()
        },
        data: data,
        
      });

      ($http[method.toLowerCase()])(
        this.getUrl(entry),
        '',
        {
          params: data
        })
        .success(function (data, status, headers, config) {
          console.log('POST Response - status: ' + status + ' - data: ' + JSON.stringify(data));
          self._responseHandler(data, success, error);
        })
        .error(function (data, status, headers, config) {
          console.log('POST Network error - status: ' + status + ' - data: ' + JSON.stringify(data));
          error(-1);
        });
    };

    BaseService.prototype.httpPost = function (entry, data, success, error) {
      var self = this;
      var timestamp = Date.now().toString();
      data[timestamp] = '';
      $http.post(
        this.getUrl(entry),
        '',
        {
          params: data
        })
        .success(function (data, status, headers, config) {
          console.log('POST Response - status: ' + status + ' - data: ' + JSON.stringify(data));
          self._responseHandler(data, success, error);
        })
        .error(function (data, status, headers, config) {
          console.log('POST Network error - status: ' + status + ' - data: ' + JSON.stringify(data));
          error(-1);
        });
    };

    BaseService.prototype.httpGet = function (entry, data, success, error) {
      var self = this;
      var timestamp = Date.now().toString();
      data[timestamp] = '';
      $http.get(this.getUrl(entry),
        {
          params: data
        })
        .success(function (data, status, headers, config) {
          console.log('GET Response - status: ' + status + ' - data: ' + JSON.stringify(data));
          self._responseHandler(data, success, error);
        })
        .error(function (data, status, headers, config) {
          console.log('GET Network error - status: ' + status + ' - data: ' + JSON.stringify(data));
          error(-1);
        });
    };
  });
