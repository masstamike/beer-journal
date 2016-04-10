/**
 * Created by masstamike on 3/10/16.
 */
'use strict';

var app = angular.module('beerJournalApp');
app.controller('LoginCtrl', ['$scope', '$location', 'AuthService', function($scope, $location, AuthService) {
    $scope.creds = {};

    $scope.login = function() {
        $scope.error = false;

        $scope.disabled = true;

        // call login from service
        AuthService.login($scope.creds.username, $scope.creds.password)
            // handle success
            .then(function () {
                $location.path('/');
                $scope.disabled = false;
                $scope.creds = {};
            })
            // handle error
            .catch(function () {
                $scope.error = true;
                $scope.errorMessage = "Invalid username and/or password";
                $scope.disabled = false;
                $scope.creds = {};
            });
    };

}]);
