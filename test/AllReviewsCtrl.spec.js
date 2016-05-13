'use strict';

describe('Controller: AllReviewsCtrl', function() {
    beforeEach(module('beerJournalApp'));

    var $controller;
    var $scope;

    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;
        $scope = {};
    }));

    describe('getNumber', function() {

        var result;

        beforeEach(inject(function() {
            var controller = $controller('AllReviewsCtrl', {$scope: $scope});
            result = $scope.getNumber(5);
        }));

        it('Array of size 5 should be returned on input=5', function () {
            expect(result.length).toBe(5);
        });

        it('Return type should be an Array', function() {
            expect(result).isArray;
        })
    });
});
