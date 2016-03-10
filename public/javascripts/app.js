'use strict';

/**
 * @ngdoc overview
 * @name beerJournalApp
 * @description
 * # Journal to keep track of beer tastings.
 *
 * Main module of the application.
 */
angular
  .module('beerJournalApp', [
    //'ngAnimate',
    //'ngCookies',
    //'ngResource',
    'ngRoute'
    //'ngSanitize',
    //'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider

      // Root Page.
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'ReviewsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

var xhttp = new XMLHttpRequest();