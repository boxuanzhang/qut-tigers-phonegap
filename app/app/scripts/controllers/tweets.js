'use strict';

/**
 * @ngdoc function
 * @name qutTigersApp.controller:TweetsCtrl
 * @description
 * # TweetsCtrl
 * Controller of the qutTigersApp
 */
angular.module('qutTigersApp')
  .controller('TweetsCtrl', function ($scope, $timeout, $window) {
    if (typeof(twttr) !== 'undefined') {
      $timeout = twttr.widgets.load();
    }
  });
