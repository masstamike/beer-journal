/**
 * Created by masstamike on 3/10/16.
 */
'use strict';

var app = angular.module('beerJournalApp');
app.controller('AllReviewsCtrl', function($scope, $http) {

    $scope.reviews = [];
    $scope.newReview = false;
    $scope.templateUrl = "";
    $scope.titleBar = document.getElementById('titleBar');
    $scope.title = document.getElementById('title');
    $scope.desc = document.getElementById('description');

    $scope.getReviews = function () {
        $http.get('reviews/all').then(function (reviews) {
            reviews = reviews.data.map(function (cur, index, arr) {
                var sampledNice = new Date(arr[index].sampled);
                arr[index].sampled = sampledNice.toDateString();
                return arr[index];
            });
            $scope.reviews = reviews;
        }, function (err) {
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

    $scope.getYOffset = function(window) {
        return window.pageYOffset;
    };

    window.onscroll = function () {

        var coord = $scope.getYOffset(window);

        $scope.titleBar.style.height = $scope.titleSize(128, coord);

        if (coord >= 32) {
            if (coord >= 56) {
                $scope.title.style.margin = "0 10px";
                $scope.title.style.fontSize = "48px";
                $scope.titleBar.classList.add("shadow");
            } else {
                $scope.title.style.margin = "10px";
                $scope.title.style.fontSize = "56px";
                $scope.titleBar.classList.remove("shadow");
            }
            if ($scope.titleBar.childElementCount != 0
                && document.getElementById('description') != undefined) {
                $scope.titleBar.removeChild($scope.desc);
            }
        } else {
            $scope.titleBar.appendChild($scope.desc);
            $scope.title.style.margin = "10px";
            $scope.title.style.fontSize = "56px";
            $scope.titleBar.classList.remove("shadow");
        }

        // any $scope variable updates
        $scope.$digest();
    };

    $scope.$on('$destroy', function() {
        window.onscroll = null;
    });

    $scope.getReviews();

});
