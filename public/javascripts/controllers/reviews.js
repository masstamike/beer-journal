/**
 * Created by masstamike on 2/15/16.
 */
'use strict';

var app = angular.module('beerJournalApp');
app.controller('ReviewsCtrl', function($scope, $http) {
    var titleBar = document.getElementById('titleBar');
    var title = document.getElementById('title');
    var desc = document.getElementById('description');

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

                review.beerName = '';
                review.brewer = '';
                review.price = 0;
                review.sampleDate = new Date();
                review.rating = 0;
                review.notes = '';
                review.abv = 0;
                review.ibu = 0;
                review.servingType = '';

                var reviewNode = document.getElementById('activeReview');
                var completedReviewNode = reviewNode.cloneNode(true);
                var reviewsNode = document.getElementById('reviews');
                var firstCompletedNode = document.getElementsByClassName('fadeIn')[0];
                var submitButton = completedReviewNode.getElementsByClassName('hoverButton')[0];
                completedReviewNode.removeChild(submitButton);
                completedReviewNode.id="";
                completedReviewNode.classList.add("fadeIn");
                reviewsNode.insertBefore(completedReviewNode, firstCompletedNode);
            }, function (error) {
                console.log("Error: " + error);
            });
    };

    var titleSize = function (maxSize, offset) {

        if (offset <= 64) {
            return (maxSize - offset) + "px";
        } else {
            return "64px";
        }
    };

    window.onscroll = function () {

        var coord = window.pageYOffset;

        titleBar.style.height = titleSize(128, coord);

        if (coord >= 32) {
            if (coord >= 56) {
                title.style.margin = "0 10px";
                title.style.fontSize = "48px";
                titleBar.classList.add("shadow");
            } else {
                title.style.margin = "10px";
                title.style.fontSize = "56px";
                titleBar.classList.remove("shadow");
            }
            if (document.getElementById('description') != undefined) {
                titleBar.removeChild(desc);
            }
        } else {
            titleBar.appendChild(desc);
            title.style.margin = "10px";
            title.style.fontSize = "56px";
            titleBar.classList.remove("shadow");
        }

        // any $scope variable updates
        $scope.$digest();
    };

    $scope.$on('$destroy', function() {
        window.onscroll = null;
    });
});
