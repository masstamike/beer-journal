/**
 * Created by masstamike on 2/15/16.
 */
'use strict';

var app = angular.module('beerJournalApp');
app.controller('ReviewsCtrl', function($scope, $http) {
    $scope.beerName = '';
    $scope.brewer = '';
    $scope.price = 0;
    $scope.sampleDate = new Date();
    $scope.rating = 0;
    $scope.notes;
    $scope.abv;
    $scope.ibu;
    $scope.servingType;
    $scope.flavorWheel = {};

    $scope.ratingGold = function (place) {
        if (place <= $scope.rating) {
            return "gold";
        }
    };
});