'use strict';

/**
 * @ngdoc function
 * @name qutTigersApp.controller:UsersCtrl
 * @description
 * # UsersCtrl
 * Controller of the qutTigersApp
 */
angular.module('qutTigersApp')
  .controller('UsersCtrl', function ($scope, UserService) {
    $scope.users = [];
    $scope.paging = null;

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
  });
