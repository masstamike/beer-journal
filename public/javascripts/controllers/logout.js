/**
 * Created by masstamike on 3/10/16.
 */
'use strict';

var app = angular.module('beerJournalApp');
app.controller('LogoutCtrl', ['$http', '$location', function($http, $location) {

    $http.post('user/logout').then(function(response) {
        $location.path('/');
    }, function(err) {
        console.error(err);
    });

}]);
