'use strict';

/**
 * @ngdoc function
 * @name qutTigersApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the qutTigersApp
 */
angular.module('qutTigersApp')
  .controller('ProfileCtrl', function ($scope, $routeParams, $window, AuthService, UserService) {
    $scope.userId = $routeParams.userId || AuthService.currentUser().id;

    UserService.getUserPromise($scope.userId)
      .then(function (user) {
        $scope.user = user;
      });

    $scope.isSelf = function () {
      return $scope.userId == AuthService.currentUser().id;
    };

    $scope.logout = function () {
      AuthService.logout();
    };

    $scope.canDelete = function () {
      return AuthService.hasPermission('user:delete') && $scope.userId != AuthService.currentUser().id;
    };

    $scope.deleteUser = function () {
      UserService.deleteUserPromise($scope.userId)
        .then(function () {
          $window.history.back();
        });
    }
  });
