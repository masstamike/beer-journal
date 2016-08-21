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
                templateUrl: 'views/all_reviews.html',
                controller: 'AllReviewsCtrl',
                access: {restricted: true},
                resolve: {
                    user: function() {
                        return "all";
                    }
                }
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl',
                access: {restricted: false}

            })
            .when('/logout', {
                templateUrl: 'views/login.html',
                controller: 'LogoutCtrl',
                access: {restricted: true}
            })
            .when('/register', {
                templateUrl: 'views/register.html',
                controller: 'RegisterCtrl',
                access: {restricted: false}
            })
            .when('/reviews', {
                templateUrl: 'views/all_reviews.html',
                controller: 'AllReviewsCtrl',
                access: {restricted: false},
                resolve: {
                    user: function() {
                        return "all";
                    }
                }
            })
            .when('/myReviews', {
                templateUrl: 'views/all_reviews.html',
                controller: 'AllReviewsCtrl',
                access: {restricted: true},
                resolve: {
                    user: function() {
                        return "self";
                    }
                    
                }
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .run(function ($rootScope, $location, $route, AuthService) {
        $rootScope.$on('$routeChangeStart',
            function (event, next, current) {
                AuthService.getUserStatus().then(function() {
                    if (next.access && next.access.restricted && AuthService.isLoggedIn() === false) {
                        $location.path('/login');
                        $route.reload();
                    }});
            });
    });

var xhttp = new XMLHttpRequest();