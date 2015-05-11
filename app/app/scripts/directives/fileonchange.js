'use strict';

/**
 * @ngdoc directive
 * @name qutTigersApp.directive:fileOnChange
 * @description
 * # fileOnChange
 */
angular.module('qutTigersApp')
  .directive('fileOnChange', function () {
    return {
      restrict: 'A',
      link: function(scope, element, attr, ctrl) {
        ctrl.$viewChangeListeners.push(function() {
          scope.$eval(attr.ngChange);
        });
      }
    };
  });
