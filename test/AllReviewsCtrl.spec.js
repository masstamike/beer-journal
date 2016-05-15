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
        httpBackend.when('GET', 'reviews/all').respond(200, [{sampled: 0}]);
        httpBackend.when('GET', 'user/status').respond(200, {status:true});
        httpBackend.when('GET', '').respond(200, "<div></div>");
        httpBackend.flush();
    }));

    it('Should initialize newReview to false', function() {
        expect($scope.newReview).toBe(false);
    });

    describe('getNumber', function() {

        var result;

        beforeEach(inject(function () {
            result = $scope.getNumber(5);
            httpBackend.when('GET', '/reviews/all').respond(200, [{sampled: 0}]);
        }));

        it('Array of size 5 should be returned on input=5', function () {
            expect(result.length).toBe(5);
        });

        it('Return type should be an Array', function () {
            expect(result).isArray;
        });
    });

    describe('getReviews', function() {

        beforeEach(inject(function () {
            httpBackend.when('GET', 'reviews/all').respond(200, [{sampled: 0}]);
            httpBackend.when('GET', 'user/status').respond(200, {status:true});
            httpBackend.when('GET', '').respond(200, "<div></div>");
        }));

        it('Should convert dates to string.', function() {
            var d = new Date();
            httpBackend.expectGET('reviews/all').respond([{sampled:d}]);
            $scope.getReviews();
            httpBackend.flush();
            expect($scope.reviews[0].sampled).toBe(d.toDateString());
        });
    });
});
