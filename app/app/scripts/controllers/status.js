'use strict';

/**
 * @ngdoc function
 * @name qutTigersApp.controller:StatusCtrl
 * @description
 * # StatusCtrl
 * Controller of the qutTigersApp
 */
angular.module('qutTigersApp')
  .controller('StatusCtrl', function ($scope, $routeParams) {
    $scope.statusId = $routeParams.statusId;
  });
