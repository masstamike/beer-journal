'use strict';

describe('Controller: AllReviewsCtrl', function() {
    beforeEach(module('beerJournalApp'));

    var $controller;
    var $scope;
    var httpBackend;
    var http;
    var deferred;

    beforeEach(inject(function(_$controller_, $httpBackend, _$q_, $http, _$rootScope_, AuthService){
        $controller = _$controller_;
        $scope = _$rootScope_.$new();
        httpBackend = $httpBackend;
        http = $http;

        deferred = _$q_.defer();
        spyOn(AuthService, 'getUsername').and.returnValue("username1");
        $controller('AllReviewsCtrl', {$scope: $scope, $http: http, user: "not-self"});
    }));

    it('Should initialize newReview to false', function() {
        expect($scope.newReview).toBe(false);
    });

    describe('getNumber', function() {

        var result, size;

        beforeEach(inject(function () {
            size = 5;
            result = $scope.getNumber(5);
            httpBackend.when('GET', 'reviews/all').respond(200, [{sampled: 0}]);
            httpBackend.when('GET', 'user/status').respond(200, {status:true});
            httpBackend.when('GET', '').respond(200, "<div></div>");
            httpBackend.flush();
        }));

        it('Array of size 5 should be returned on input=5', function () {
            expect(result.length).toBe(size);
        });

        it('Return type should be an Array', function () {
            var arr = [];
            expect(result.prototype).toBe(arr.prototype);
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
            spyOn(console, "error");
            $scope.getReviews();
            httpBackend.flush();
            expect(console.error).toHaveBeenCalled();
        });
    });

    describe('getMyReviews', function() {
        it("Should load user's reviews onto page", function() {
            var username = 'username1';
            var currTime = new Date().toDateString();
            var reviews = [{beer:"beer1", sampled: currTime},
            {beer:"beer2", sampled: currTime}];

            httpBackend.when('GET', "views/all_reviews.html").respond(200, []);
            httpBackend.when('GET', "reviews/all").respond(200, []);
            httpBackend.when('GET', 'user/status').respond(200, {status:true});
            httpBackend.when('GET', "reviews/" + username).respond(200, reviews);
            $scope.getMyReviews();
            httpBackend.flush();
            expect($scope.reviews).toEqual(reviews);
        });
    });

    describe('createReview switch', function() {
        it('Should initialize to false', function() {
            expect($scope.newReview).toBe(false);
        });

        it('Should switch newReview to true', function() {
            $scope.createReview();
            expect($scope.newReview).toBe(true);
        });

        it('Should switch from true to false', function() {
            $scope.newReview = true;
            $scope.createReview();
            expect($scope.newReview).toBe(false);
        });
    });

    describe('titleSize', function() {

        it('Should return "64px" if offset is greater than 64', function() {
            var max_size = 128,
                offset = 100;
            var response = $scope.titleSize(max_size, offset);
            expect(response).toBe("64px");
        });

        it('Should return max size if offset is 0', function() {
            var max_size = 128,
                offset = 0;
            var response = $scope.titleSize(max_size, offset);
            expect(response).toBe(max_size + "px");
        });

        it('Should return max size less offset if 64>offset>=max size', function() {
            var max_size = 128,
                offset = 32;
            var response = $scope.titleSize(max_size, offset);
            expect(response).toBe(max_size-offset + "px");
        });
    });

    describe('window.onscroll', function() {
        var dummyNode, dummyNodeNested;
        beforeEach(function() {
            httpBackend.when('GET', 'reviews/all').respond(200, [{sampled: 0}]);
            dummyNodeNested = document.createElement("div");
            dummyNode = document.createElement("div");
            dummyNode.appendChild(dummyNodeNested);
            spyOn(document, 'getElementById').and.returnValue(dummyNode);
            $controller('AllReviewsCtrl', {$scope: $scope, $http: http, window: window, user: "not-self"});
        });

        it('Should shrink title bar when scroll is >= 56', function() {
            spyOn($scope, 'getYOffset').and.returnValue(100);
            $scope.desc = dummyNodeNested;
            $scope.titleBar = dummyNode;
            window.onscroll();
            expect($scope.title.style.margin).toBe("0px 10px");
            expect($scope.title.style.fontSize).toBe("48px");
            expect($scope.titleBar.classList).toContain("shadow");
        });

        it('Should expand title bar when scroll is 32 <= x < 56', function() {
            spyOn($scope, 'getYOffset').and.returnValue(42);
            $scope.desc = dummyNodeNested;
            $scope.titleBar = dummyNode;
            window.onscroll();
            expect($scope.title.style.margin).toBe("10px");
            expect($scope.title.style.fontSize).toBe("56px");
            expect($scope.titleBar.classList.length).toBe(0);
        });

        it('Should add description to title scroll < 32', function() {
            spyOn($scope, 'getYOffset').and.returnValue(31);
            $scope.desc = dummyNodeNested;
            $scope.titleBar = dummyNode;
            window.onscroll();
            expect($scope.title.style.margin).toBe("10px");
            expect($scope.title.style.fontSize).toBe("56px");
            expect($scope.titleBar.classList.length).toBe(0);
        });

        it('Should remove description when title scroll >= 32', function() {
            spyOn($scope, 'getYOffset').and.returnValue(32);
            $scope.desc = dummyNodeNested;
            $scope.titleBar = dummyNode;
            expect($scope.titleBar.childElementCount).toBe(1);
            window.onscroll();
            window.onscroll();
            expect($scope.titleBar.childElementCount).toBe(0);
        });
    });

    describe('getYOffset', function() {
        it("Should return the window's Y-Offset", function() {
            var mockWindow = {
                pageYOffset: 42
            };
            var yOffset = $scope.getYOffset(mockWindow);
            expect(yOffset).toBe(mockWindow.pageYOffset);
        });
    });

});
