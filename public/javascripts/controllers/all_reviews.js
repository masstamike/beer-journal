/**
 * Created by masstamike on 3/10/16.
 */
'use strict';

var app = angular.module('beerJournalApp');
app.controller('AllReviewsCtrl', function($scope, $http) {

    $scope.reviews = [];

    $http.get('reviews/all').then(function(reviews) {

        reviews = reviews.data.map(function(cur, index, arr) {
            var sampledNice = new Date(arr[index].sampled);
            arr[index].sampled = sampledNice.toDateString();
            return arr[index];
        });

        $scope.reviews = reviews;
    }).then(function(err) {
        console.log(err);
    });

    $scope.getNumber = function (int) {
        var arr = new Array(int);
        return arr;
    }
});