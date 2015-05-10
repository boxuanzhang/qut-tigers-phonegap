'use strict';

/**
 * @ngdoc service
 * @name qutTigersApp.authInterceptor
 * @description
 * # authInterceptor
 * Factory in the qutTigersApp.
 */
angular.module('qutTigersApp')
  .factory('authInterceptor', function ($rootScope, $q, $window) {
    return {
      request: function (config) {
        config.headers = config.headers || {};
        if ($window.sessionStorage.auth) {
          config.headers.Authorization = 'Bearer ' + $window.sessionStorage.auth.accessToken;
        }
        return config;
      },
      response: function (response) {
        return response || $q.when(response);
      }
    };
  });
