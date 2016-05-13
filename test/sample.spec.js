'use strict';

describe('Controller: AllReviewsCtrl', function() {
    beforeEach(module('beerJournalApp'));

    var $controller;

    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;
    }));

    describe('getNumber', function() {
        it('Array of size 5 should be returned on input=5', function () {
            var $scope = {};
            var controller = $controller('AllReviewsCtrl', { $scope: $scope });
            var result = $scope.getNumber(5);
            expect(result.length).toBe(5);
            expect(result).isArray;
        });
    });
});
