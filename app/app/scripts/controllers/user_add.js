'use strict';

/**
 * @ngdoc function
 * @name qutTigersApp.controller:UserAddCtrl
 * @description
 * # UserAddCtrl
 * Controller of the qutTigersApp
 */
angular.module('qutTigersApp')
  .controller('UserAddCtrl', function ($scope, $location, GroupService, UserService) {
    $scope.allGroups = [];
    $scope.groups = [];

    GroupService.getGroupListPromise()
      .then(function (groups) {
        $scope.allGroups = groups;
      });

    $scope.submit = function () {
      UserService.addUserPromise($scope.username, $scope.name, $scope.description, $scope.password, $scope.groups)
        .then(function (user) {
          $location.path('/users');
        });
    };
  });
