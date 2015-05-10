'use strict';

/**
 * @ngdoc function
 * @name qutTigersApp.controller:NavBarCtrl
 * @description
 * # NavbarctrlCtrl
 * Controller of the qutTigersApp
 */
angular.module('qutTigersApp')
  .controller('NavBarCtrl', function ($scope, $location, $window, AuthService) {
    $scope.isActive = function (viewLocation) {
      return $location.path() == viewLocation;
    };

    $scope.isLoggedIn = function () {
      return AuthService.isLoggedIn();
    };

    $scope.hasPermission = function (permission) {
      return AuthService.hasPermission(permission);
    };

    $scope.back = function () {
      $window.history.back();
    };
  });
