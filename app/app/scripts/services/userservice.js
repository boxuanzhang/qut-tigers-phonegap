'use strict';

/**
 * @ngdoc service
 * @name qutTigersApp.UserService
 * @description
 * # UserService
 * Factory in the qutTigersApp.
 */
angular.module('qutTigersApp')
  .factory('UserService', function (BaseService, $q, PagingParam) {
    function UserService() {

    }

    UserService.prototype.getUserPromise = function (userId) {
      var deffered = $q.defer();

      var cacheKey = 'user_' + userId;
      var cached = lscache.get(cacheKey);
      if (cached) {
        deffered.resolve(cached);
      } else {
        BaseService.get(
          '/user/' + userId,
          {},
          function (data, status) {
            lscache.set(cacheKey, data.user, 30);
            deffered.resolve(data.user);
          },
          function (data, status) {
            deffered.reject();
          }
        );
      }

      return deffered.promise;
    };

    UserService.prototype.getUsersListPromise = function (paging) {
      var deffered = $q.defer();

      if (!paging) {
        paging = new PagingParam();
      }

      BaseService.get(
        '/user/',
        paging._toData(),
        function (data, status) {
          deffered.resolve({
            users: data.users,
            paging: new PagingParam(data._paging.after)
          });
        },
        function (data, status) {
          deffered.reject();
        }
      );

      return deffered.promise;
    };

    return new UserService();
  });
