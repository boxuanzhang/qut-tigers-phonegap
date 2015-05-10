'use strict';

/**
 * @ngdoc directive
 * @name qutTigersApp.directive:stopEvent
 * @description
 * # stopEvent
 */
angular.module('qutTigersApp')
  .directive('stopEvent', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attr) {
        element.bind(attr.stopEvent, function (e) {
          e.stopPropagation();
        });
      }
    };
  });
