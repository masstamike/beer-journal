/**
 * Created by masstamike on 3/10/16.
 */
'use strict';

var app = angular.module('beerJournalApp');
app.controller('RegisterCtrl', function($scope, $http) {
    $scope.creds = {};

    $scope.sendCreds = function (endpoint) {
        $http.post(endpoint, $scope.creds)
            .then(function() {
                alert("Success, " + $scope.creds.username);
            }, function() {
                alert("Fail!");
            });
    };

    $scope.submitRegister = $scope.sendCreds;
});