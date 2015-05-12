'use strict';

/**
 * @ngdoc function
 * @name qutTigersApp.controller:UsersCtrl
 * @description
 * # UsersCtrl
 * Controller of the qutTigersApp
 */
angular.module('qutTigersApp')
  .controller('UsersCtrl', function ($scope, $location, UserService, GroupService) {
    $scope.users = [];
    $scope.paging = null;
    $scope.groups = {};

    var processing = false;

    $scope.loadMore = function () {
      if (processing) {
        return;
      }
      processing = true;

      UserService.getUsersListPromise($scope.paging)
        .then(
        function (value) {
          var users = value.users;
          var paging = value.paging;
          if (!$scope.paging || (paging.after != $scope.paging.after)) {
            $scope.users = $scope.users.concat(users);
          }
          $scope.paging = paging;

          processing = false;
        }, function () {
          processing = false;
        }
      );
    };

    var processingGruops = {};

    $scope.groupName = function (groupId) {
      if ($scope.groups[groupId]) {
        return $scope.groups[groupId].name;
      } else if (!processingGruops[groupId]) {
        processingGruops[groupId] = true;
        GroupService.getGroupPromise(groupId)
          .then(function (group) {
            $scope.groups[group.id] = group;
          });
      }
    };

    $scope.goToUserAdd = function () {
      $location.path('/user_add');
    };
  });
