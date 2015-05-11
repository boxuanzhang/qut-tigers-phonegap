'use strict';

/**
 * @ngdoc function
 * @name qutTigersApp.controller:PostCtrl
 * @description
 * # PostCtrl
 * Controller of the qutTigersApp
 */
angular.module('qutTigersApp')
  .controller('PostCtrl', function ($scope, $location, PhotoService, StatusService) {
    $scope.getStatusCover = function (status) {
      var photo = $scope.photo;
      if (photo) {
        return 'background-image: url(' + photo.url_large + ')';
      }
      return 'background-color: #BDBDBD';
    };

    $scope.selectPhoto = function () {
      angular.element('#photoFile').click();
    };

    $scope.uploadPhoto = function (files) {
      if (files && files.length) {
        PhotoService.getUploadPhotoPromise(files[0])
          .then(function (photo) {
            $scope.photo = photo;
          });
      }
    };

    $scope.postStatus = function () {
      if (!$scope.photo) {
        alert('Photo not selected!');
        return;
      }
      StatusService.getPostStatusPromise($scope.title, $scope.subtitle, $scope.content, [$scope.photo.id])
        .then(function (status) {
          $location.path('/status/' + status.id);
        })
    };
  });
