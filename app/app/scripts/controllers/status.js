'use strict';

/**
 * @ngdoc function
 * @name qutTigersApp.controller:StatusCtrl
 * @description
 * # StatusCtrl
 * Controller of the qutTigersApp
 */
angular.module('qutTigersApp')
  .controller('StatusCtrl', function ($scope, $routeParams, $location, StatusService, PhotoService, UserService, AuthService) {
    $scope.statusId = $routeParams.statusId;

    StatusService.getStatusPromise($scope.statusId)
      .then(
      function (status) {
        $scope.status = status;

        PhotoService.getPhotoPromise(status.photos[0])
          .then(
          function (photo) {
            $scope.photo = photo;
          }
        );

        UserService.getUserPromise(status.user)
          .then(
          function (user) {
            $scope.user = user;
          }
        );
      }
    );

    $scope.getStatusCover = function (status) {
      if ($scope.photo) {
        return 'background-image: url(' + $scope.photo.url_large + ')';
      }
      return 'background-color: #BDBDBD';
    };

    $scope.getStatusUser = function (status) {
      if ($scope.user) {
        return $scope.user.name;
      }
      return '...';
    };

    $scope.getStatusTime = function (status) {
      return moment.unix(status.timestamp).fromNow();
    };

    $scope.goToDetail = function (status) {
      $location.path('/status/' + status.id);
    };

    $scope.goToProfile = function (status) {
      $location.path('/profile/' + status.user);
    };

    $scope.canDelete = function (status) {
      return status.user == AuthService.currentUser().id;
    };

    $scope.deletePost = function (status) {
      StatusService.getDeleteStatusPromise(status.id)
        .then(
        function () {
          $location.path('/');
        }
      )
    };
  });
