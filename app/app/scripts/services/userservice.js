'use strict';

/**
 * @ngdoc service
 * @name qutTigersApp.UserService
 * @description
 * # UserService
 * Factory in the qutTigersApp.
 */
angular.module('qutTigersApp')
  .factory('UserService', function (BaseService, $q) {
    function UserService() {

    }

    UserService.prototype.getUserPromise = function (userId) {
      var deffered = $q.defer();

      BaseService.get(
        '/user/' + userId,
        {},
        function (data, status) {
          deffered.resolve(data.user);
        },
        function (data, status) {
          deffered.reject();
        }
      );

      return deffered.promise;
    };

    return new UserService();
  });
