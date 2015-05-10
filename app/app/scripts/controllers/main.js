'use strict';

/**
 * @ngdoc function
 * @name qutTigersApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the qutTigersApp
 */
angular.module('qutTigersApp')
  .controller('MainCtrl', function ($scope, StatusService, PhotoService, UserService) {
    $scope.statuses = [];
    $scope.photos = {};
    $scope.users = {};
    $scope.paging = null;

    $scope.loadMore = function() {
      StatusService.getList($scope.paging, function (statuses, paging) {
        $scope.statuses = statuses;
        $scope.paging = paging;

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
      })
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

  });
