/**
 * Created by masstamike on 2/15/16.
 */
'use strict';

var app = angular.module('beerJournalApp');
app.controller('ReviewsCtrl', function($scope, $http) {
    var review = $scope.review = {};
    review.beerName = '';
    review.brewer = '';
    review.price = 0;
    review.sampleDate = new Date();
    review.rating = 0;
    review.notes = '';
    review.abv = 0;
    review.ibu = 0;
    review.servingType = '';
    review.flavorWheel = {
        Alcohol: 0,
        Linger: 0,
        Body: 0,
        Dry: 0,
        Bitter: 0,
        Sour: 0,
        Sweet: 0,
        Burnt: 0,
        Toffee: 0,
        Malty: 0,
        Herbal: 0,
        Spicy: 0,
        Floral: 0,
        Hoppy: 0,
        Citrus: 0,
        DarkFruit: 0
    };

    $scope.ratingGold = function (place) {
        if (place <= $scope.review.rating) {
            return "gold";
        }
    };

    $scope.submitReview = function () {
        $http.post('reviews/new', $scope.review)
            .then(function () {
                console.log("Successfully uploaded review!");
            }, function (error) {
                console.log("Error: " + error);
            });
    }
});