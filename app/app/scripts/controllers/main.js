'use strict';

/**
 * @ngdoc function
 * @name qutTigersApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the qutTigersApp
 */
angular.module('qutTigersApp')
  .controller('MainCtrl', function ($scope, StatusService, PhotoService) {
    $scope.statuses = [];
    $scope.photos = {};
    $scope.paging = null;

    $scope.loadMore = function() {
      StatusService.getList($scope.paging, function (statuses, paging) {
        $scope.statuses = statuses;
        $scope.paging = paging;

        for (var i = 0, j = statuses.length; i != j; ++i) {
          PhotoService.getPhotoPromise(statuses[i].photos[0])
            .then(
            function (photo) {
              $scope.photos[photo.id] = photo;
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

    $scope.getStatusTime = function (status) {
      return moment.unix(status.timestamp).fromNow();
    };

  });
