'use strict';

describe('Controller: AllReviewsCtrl', function() {
    beforeEach(module('beerJournalApp'));

    var $controller;
    var $scope;
    var httpBackend;
    var http;

    beforeEach(inject(function(_$controller_, $httpBackend, $http){
        $controller = _$controller_;
        $scope = {};
        httpBackend = $httpBackend;
        http = $http;
        $controller('AllReviewsCtrl', {$scope: $scope, $http: http});
    }));

    it('Should initialize newReview to false', function() {
        expect($scope.newReview).toBe(false);
    });

    describe('getNumber', function() {

        var result;

        beforeEach(inject(function () {
            result = $scope.getNumber(5);
            httpBackend.when('GET', 'reviews/all').respond(200, [{sampled: 0}]);
            httpBackend.when('GET', 'user/status').respond(200, {status:true});
            httpBackend.when('GET', '').respond(200, "<div></div>");
            httpBackend.flush();
        }));

        it('Array of size 5 should be returned on input=5', function () {
            expect(result.length).toBe(5);
        });

        it('Return type should be an Array', function () {
            expect(result).isArray;
        });
    });

    describe('getReviews', function() {

        afterEach(function () {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });

        it('Should convert dates to string.', function () {
            var d = new Date();
            httpBackend.when('GET', 'reviews/all').respond(200, [{sampled: d}]);
            httpBackend.when('GET', '').respond(200, "<div></div>");
            httpBackend.when('GET', 'user/status').respond(200, {status: true});
            $scope.getReviews();
            httpBackend.flush();
            expect($scope.reviews[0].sampled).toBe(d.toDateString());
        });
    });

    describe('getReviews Failed', function() {

        it('Should log errors.', function() {
            httpBackend.when('GET', 'views/all_reviews.html').respond(200, "<div></div>");
            httpBackend.when('GET', 'user/status').respond(200, {status:true});
            httpBackend.when('GET', 'reviews/all').respond(400);
            $scope.getReviews();
            httpBackend.flush();
            expect($scope.reviews[0].beer).toBe("Failed to retrieve reviews.");
        });
    });

    describe('createReview switch', function() {
        it('Should initialize to false', function() {
            expect($scope.newReview).toBe(false);
        });

        it('Should switch newReview to true', function() {
            $scope.createReview();
            expect($scope.newReview).toBe(true);
        })

        it('Should switch from true to false', function() {
            $scope.newReview = true;
            $scope.createReview();
            expect($scope.newReview).toBe(false);
        })
    });
});
