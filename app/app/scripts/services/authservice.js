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

    AuthService.prototype._setAuth = function (auth) {
      $window.localStorage.auth = JSON.stringify(auth);
      $window.localStorage.accessToken = auth.accessToken;
    };

    AuthService.prototype._getAuth = function () {
      return JSON.parse($window.localStorage.auth);
    };

    AuthService.prototype.login = function (username, password) {
      var self = this;
      password = CryptoJS.SHA256(password).toString();
      BaseService.get(
        '/auth/',
        {
          username: username,
          password: password
        },
        function (data) {
          var auth = {
            accessToken: data['access_token'],
            expire: data['expire'],
            refreshToken: data['refresh_token'],
            user: data['user'],
            permissions: data['permissions']
          };
          self._setAuth(auth);
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
      return this._getAuth();
    };

    AuthService.prototype.currentUser = function () {
      return this.authInfo().user;
    };

    AuthService.prototype.isLoggedIn = function () {
      return Boolean($window.localStorage.auth);
    };

    AuthService.prototype.hasPermission = function (permission) {
      return this.isLoggedIn() && this.authInfo().permissions.indexOf(permission) != -1;
    };

    return new AuthService();
  });
