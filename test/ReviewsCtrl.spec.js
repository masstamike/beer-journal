/**
 * Created by masstamike on 5/12/16.
 */
'use strict';

describe('Controller: ReviewsCtrl', function() {
    beforeEach(module('beerJournalApp'));

    var $controller;
    var $scope;

    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;
        $scope = {
            review: {},
            $on: function(action, callback) {}
        };
    }));

    describe('ratingGold', function() {

        beforeEach(inject(function() {
            var controller = $controller('ReviewsCtrl', {$scope: $scope});
            $scope.review.rating = 3;
        }));

        it('Returns "gold" when place is less than review rating', function() {
            var result = $scope.ratingGold(2);
            expect(result).toBe("gold");
        });

        it('Returns "gold" when place is equal to review rating', function() {
            expect($scope.ratingGold(2)).toBe("gold");
        });

        it('Returns nothing when place is greater than review rating', function() {
            expect($scope.ratingGold(2)).isNull;
        });
    });
});