'use strict';

/**
 * @ngdoc function
 * @name qutTigersApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the qutTigersApp
 */
angular.module('qutTigersApp')
  .controller('LoginCtrl', function ($scope, $location, AuthService) {
    $scope.login = function () {
      AuthService.login($scope.username, $scope.password);
    };
  });
