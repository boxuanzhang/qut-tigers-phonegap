'use strict';

/**
 * @ngdoc overview
 * @name qutTigersApp
 * @description
 * # qutTigersApp
 *
 * Main module of the application.
 */
angular
  .module('qutTigersApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'infinite-scroll',
    'monospaced.elastic',
    'ngFileUpload'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/profile/:userId?', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl'
      })
      .when('/status/:statusId', {
        templateUrl: 'views/status.html',
        controller: 'StatusCtrl'
      })
      .when('/post', {
        templateUrl: 'views/post.html',
        controller: 'PostCtrl'
      })
      .when('/tweets', {
        templateUrl: 'views/tweets.html',
        controller: 'TweetsCtrl'
      })
      .when('/users', {
        templateUrl: 'views/users.html',
        controller: 'UsersCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
