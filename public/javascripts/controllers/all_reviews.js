/**
 * Created by masstamike on 3/10/16.
 */
'use strict';

var app = angular.module('beerJournalApp');
app.controller('AllReviewsCtrl', function($scope, $http) {

    $scope.reviews = [];
    $scope.newReview = false;
    $scope.templateUrl = "";

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

    $scope.createReview = function() {
        if ($scope.newReview) {
            $scope.newReview = false;
            $scope.templateUrl = "";
        } else {
            $scope.newReview = true;
            $scope.templateUrl = "views/new_review.html";
        }
    }
});