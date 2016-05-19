/**
 * Created by masstamike on 5/12/16.
 */
'use strict';

describe('Controller: ReviewsCtrl', function() {
    beforeEach(module('beerJournalApp'));

    var $controller;
    var $scope;
    var httpBackend;
    var http;

    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;
        $scope = {
            review: {},
            $on: function(action, callback) {}
        };
    }));

    describe('ratingGold', function() {


        beforeEach(inject(function() {
            $controller('ReviewsCtrl', {$scope: $scope});
            $scope.review.rating = 3;
        }));

        it('Returns "gold" when place is less than review rating', function() {
            var result = $scope.ratingGold(2);
            expect(result).toBe("gold");
        });

        it('Returns "gold" when place is equal to review rating', function() {
            expect($scope.ratingGold(3)).toBe("gold");
        });

        it('Returns undefined when place is greater than review rating', function() {
            expect($scope.ratingGold(4)).toBeUndefined();
        });
    });

    describe('submitReview', function() {
        beforeEach(inject(function($httpBackend, $http) {
            httpBackend = $httpBackend;
            http = $http;
        }));

        it('Should reset all values on successful upload.', function() {
            $controller('ReviewsCtrl', {$scope: $scope, $http: http});
            httpBackend.expectPOST('reviews/new').respond(200);
            httpBackend.expectGET('user/status').respond(200, {status:true});
            httpBackend.expectGET('user/status').respond(200, {status:true});
            httpBackend.expectGET('views/all_reviews.html').respond(200, '<div></div>');
            $scope.review.beerName = 'Beer';
            $scope.review.brewer = 'Brewer';
            $scope.review.price = 10;
            $scope.review.sampleDate = new Date();
            $scope.review.rating = 3;
            $scope.review.notes = 'Great beer...';
            $scope.review.abv = 5;
            $scope.review.ibu = 50;
            $scope.review.servingType = 'growler';
            spyOn(console, "log");
            $scope.submitReview();
            httpBackend.flush();
            expect($scope.review.beerName).toBe('');
        });

        it('Should log errors.', function() {
            $controller('ReviewsCtrl', {$scope: $scope, $http: http});
            var errorMessage = "Error message.",
                errorStatus = 400;
            spyOn(console, 'error');
            httpBackend.expectPOST('reviews/new').respond(errorStatus, errorMessage);
            httpBackend.expectGET('user/status').respond(200, {status:true});
            httpBackend.expectGET('user/status').respond(200, {status:true});
            httpBackend.expectGET('').respond(200, '');
            $scope.submitReview();
            httpBackend.flush();
            expect(console.error).toHaveBeenCalledWith("Error " + errorStatus + ": " + errorMessage);
        });
    });

});