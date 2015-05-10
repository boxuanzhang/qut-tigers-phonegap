'use strict';

/**
 * @ngdoc function
 * @name qutTigersApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the qutTigersApp
 */
angular.module('qutTigersApp')
  .controller('ProfileCtrl', function ($scope, $routeParams) {
    $scope.userId = $routeParams.userId;
  });
