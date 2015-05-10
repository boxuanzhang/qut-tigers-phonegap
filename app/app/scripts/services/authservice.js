'use strict';

/**
 * @ngdoc service
 * @name qutTigersApp.AuthService
 * @description
 * # AuthService
 * Factory in the qutTigersApp.
 */
angular.module('qutTigersApp')
  .factory('AuthService', function ($window, $location, BaseService) {
    function AuthService() {

    }

    AuthService.prototype.login = function (username, password) {
      password = CryptoJS.SHA256(password).toString();
      return BaseService.post(
        '/auth/',
        {
          username: username,
          password: password
        },
        function (data) {
          $window.localStorage.auth = {
            accessToken: data['access_token'],
            expire: data['expire'],
            refreshToken: data['refresh_token'],
            user: data['user'],
            permissions: data['permissions']
          };
          $location.path('/');
        },
        function (error_code) {
          alert('AuthService#login error: ' + error_code)
        }
      )
    };

    AuthService.prototype.logout = function () {
      $window.localStorage.clear();
      $location.path('/');
    };

    AuthService.prototype.authInfo = function () {
      return $window.localStorage.auth;
    }

    AuthService.prototype.isLoggedIn = function () {
      return Boolean($window.localStorage.auth);
    };

    AuthService.prototype.hasPermission = function (permission) {
      return this.isLoggedIn() && this.authInfo().permissions.indexOf(permission) != -1;
    };

    return new AuthService();
  });
