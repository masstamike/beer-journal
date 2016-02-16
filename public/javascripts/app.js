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
      // Internal RSVP management page.
      /*.when('/about', {
        templateUrl: 'views/coming.html',
        controller: 'ComingCtrl'
      })
      // RSVP Form
      .when('/boda', {
        templateUrl: 'views/boda.html',
        controller: 'BodaCtrl'
      })
      // Login Page
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      // Map Page
      .when('/map', {
        templateUrl: 'views/map.html',
        controller: 'MapCtrl'
      })*/
      // Otherwise, default to root.
      .otherwise({
        redirectTo: '/'
      });
  })

  // Service to hold the hash from Login Page.
  /*.service('sharedProperties', function () {
    var property;

    return {
      getProperty: function () {
        return property;
      },
      setProperty: function(value) {
        property = value;
      }
    };
  });*/
