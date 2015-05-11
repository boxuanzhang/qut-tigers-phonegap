'use strict';

/**
 * @ngdoc function
 * @name qutTigersApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the qutTigersApp
 */
angular.module('qutTigersApp')
  .controller('MainCtrl', function ($scope, $location, $timeout, AuthService, StatusService, PhotoService, UserService) {
    $scope.statuses = [];
    $scope.photos = {};
    $scope.users = {};
    $scope.paging = null;

    var processing = false;

    $scope.loadMore = function() {
      if (processing) {
        return;
      }
      processing = true;

      StatusService.getList($scope.paging, function (statuses, paging) {
        if (!$scope.paging || (paging.after != $scope.paging.after)) {
          console.log('Concat: ' + JSON.stringify(statuses));

          $scope.statuses = $scope.statuses.concat(statuses);

          for (var i = 0, j = statuses.length; i != j; ++i) {
            var status = statuses[i];
            PhotoService.getPhotoPromise(status.photos[0])
              .then(
              function (photo) {
                $scope.photos[photo.id] = photo;
              }
            );

            UserService.getUserPromise(status.user)
              .then(
              function (user) {
                $scope.users[user.id] = user;
              }
            );
          }
        }
        $scope.paging = paging;

        processing = false;
      }, function () {
        processing = false;
      });
    };

    $scope.getStatusCover = function (status) {
      var photo = $scope.photos[status.photos[0]];
      if (photo) {
        return 'background-image: url(' + photo.url_large + ')';
      }
      return 'background-color: #BDBDBD';
    };

    $scope.getStatusUser = function (status) {
      var user = $scope.users[status.user];
      if (user) {
        return user.name;
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

    $scope.goToPost = function () {
      $location.path('/post');
    };

    $scope.canPost = function () {
      return AuthService.hasPermission('statuses:post');
    };
  });
