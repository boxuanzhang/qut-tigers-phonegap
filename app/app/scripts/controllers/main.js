'use strict';

/**
 * @ngdoc function
 * @name qutTigersApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the qutTigersApp
 */
angular.module('qutTigersApp')
  .controller('MainCtrl', function ($scope) {
    $scope.images = [1, 2, 3, 4, 5, 6, 7, 8];

    $scope.loadMore = function() {
      var last = $scope.images[$scope.images.length - 1];
      for(var i = 1; i <= 20; i++) {
        $scope.images.push(last + i);
      }
    };
  });
