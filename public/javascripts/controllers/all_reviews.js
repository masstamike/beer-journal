/**
 * Created by masstamike on 3/10/16.
 */
'use strict';

var app = angular.module('beerJournalApp');
app.controller('AllReviewsCtrl', function($scope, $http) {

    $scope.reviews = [];
    $scope.newReview = false;
    $scope.templateUrl = "";
    var titleBar = document.getElementById('titleBar');
    var title = document.getElementById('title');
    var desc = document.getElementById('description');

    $scope.getReviews = function () {
        $http.get('reviews/all').then(function (reviews) {
            reviews = reviews.data.map(function (cur, index, arr) {
                var sampledNice = new Date(arr[index].sampled);
                arr[index].sampled = sampledNice.toDateString();
                return arr[index];
            });
            $scope.reviews = reviews;
        }, function (err) {
            $scope.reviews = [{beer:"Failed to retrieve reviews."}];
            console.error(err.status);
        });
    };

    $scope.getNumber = function (int) {
        return new Array(int);
    };

    $scope.createReview = function() {
        if ($scope.newReview) {
            $scope.newReview = false;
            $scope.templateUrl = "";
        } else {
            $scope.newReview = true;
            $scope.templateUrl = "views/new_review.html";
        }
    };

    $scope.titleSize = function (maxSize, offset) {

        if (offset <= 64) {
            return (maxSize - offset) + "px";
        } else {
            return "64px";
        }
    };

    window.onscroll = function () {

        var coord = window.pageYOffset;

        titleBar.style.height = $scope.titleSize(128, coord);

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

    $scope.getReviews();

});
