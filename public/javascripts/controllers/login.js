/**
 * Created by masstamike on 3/10/16.
 */
'use strict';

var app = angular.module('beerJournalApp');
app.controller('LoginCtrl', function($scope, $http) {
    $scope.creds = {};

    $scope.submitLogin = function() {

        $http.post('/login', $scope.creds)
            .then(function() {
                alert("Success, " + $scope.creds.username);
            }, function() {
                alert("Fail!");
            });
    };
});