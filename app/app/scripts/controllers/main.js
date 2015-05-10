'use strict';

/**
 * @ngdoc function
 * @name qutTigersApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the qutTigersApp
 */
angular.module('qutTigersApp')
  .controller('MainCtrl', function ($scope, StatusService) {
    $scope.statuses = [];

    $scope.loadMore = function() {
      StatusService.getList(null, function (statuses) {
        $scope.statuses = statuses;
      })
    };
  });
