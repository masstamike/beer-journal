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
                controller: 'ReviewsCtrl',
                access: {restricted: true}
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl',
                access: {restricted: false}

            })
            .when('/logout', {
                controller: 'LogoutCtrl',
                access: {restricted: true}
            })
            .when('/register', {
                templateUrl: 'views/register.html',
                controller: 'RegisterCtrl',
                access: {restricted: false}
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .run(function ($rootScope, $location, $route, AuthService) {
        $rootScope.$on('$routeChangeStart',
            function (event, next, current) {
                AuthService.getUserStatus();
                if (next.access.restricted && AuthService.isLoggedIn() === false) {
                    alert("Whoops! " + !AuthService);
                    $location.path('/login');
                    $route.reload();
                }
            });
    });

var xhttp = new XMLHttpRequest();