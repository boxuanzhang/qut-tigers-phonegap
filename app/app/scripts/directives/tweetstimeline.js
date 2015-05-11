'use strict';

/**
 * @ngdoc directive
 * @name qutTigersApp.directive:tweetsTimeline
 * @description
 * # tweetsTimeline
 */
angular.module('qutTigersApp')
  .directive('twitterTimeline', function ($timeout) {
    return {
      restrict: 'A',
      scope: {
        cssUrl: "@",
        autoResize: "="
      },
      link: function (scope, element, attrs) {
        if ($('body').attr('data-twttr-rendered')) {
          $('body').removeAttr('data-twttr-rendered');
          $timeout(function () {
            twttr.widgets.load();
          });
        }

        element
          .attr('id', 'twitter-feed')
          .attr("width", "100%" || attrs.width)
          .attr('data-chrome', 'noheader transparent')
          .attr('data-widget-id', attrs.twitterTimeline)
          .addClass('twitter-timeline');

        function render() {
          var body = $('.twitter-timeline').contents().find('body');

          if (scope.cssUrl) {
            body.append($('<link/>', { rel: 'stylesheet', href: scope.cssUrl, type: 'text/css' }));
          }

          function setHeight() {
            if (body.find('.stream').length == 0) {
              setTimeout(setHeight, 100);
            } else {
              body.find('.stream').addClass('stream-new').removeClass('stream').css('height', 'auto');
              $('.twitter-timeline').css('height', (body.height() + 20) + 'px');
            }
          }

          if (scope.autoResize) {
            setHeight();
          }
        }

        if (!$('#twitter-wjs').length) {
          jQuery.getScript((/^http:/.test(document.location)?'http':'https') + '://platform.twitter.com/widgets.js', function() {
            render();
            $('.twitter-timeline').load(render);
          });
        }
      }
    };
  });


!function (d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0], p = /^http:/.test(d.location) ? 'http' : 'https';
  if (!d.getElementById(id)) {
    js = d.createElement(s);
    js.id = id;
    js.src = p + "://platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js, fjs);
  }
}(document, "script", "twitter-wjs");

