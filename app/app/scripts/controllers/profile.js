'use strict';

/**
 * @ngdoc function
 * @name qutTigersApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the qutTigersApp
 */
angular.module('qutTigersApp')
  .controller('ProfileCtrl', function ($scope, $routeParams, AuthService, UserService) {
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
  });
