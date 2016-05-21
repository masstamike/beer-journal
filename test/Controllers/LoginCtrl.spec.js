/**
 * Created by masstamike on 5/16/16.
 */
'use strict';

describe("Controller: Login", function() {
    beforeEach(module('beerJournalApp'));

    var $controller;
    var $scope;
    var location;
    var $q;
    var deferred;
    var httpBackend;

    beforeEach(inject(function(_$rootScope_, _$controller_, $httpBackend, $http, $location, _$q_, AuthService){
        $controller = _$controller_;
        $q = _$q_;
        $scope = _$rootScope_.$new();
        $scope.creds = {
            username: '',
            password: ''
        };
        deferred = _$q_.defer();

        // Use a Jasmine Spy to return the deferred promise
        spyOn(AuthService, 'login').and.returnValue(deferred.promise);
        spyOn($location, 'path').and.callThrough();

        $controller('LoginCtrl', {$scope: $scope, $location: $location, AuthService: AuthService});
    }));

    describe('login', function() {
        beforeEach(inject(function($location, $httpBackend) {
            location = $location;
            httpBackend = $httpBackend;
        }));

        it('Should redirect to / on Success', function() {
            $scope.login();
            deferred.resolve("Success");
            httpBackend.expect('GET', 'user/status').respond(200, {status:true});
            httpBackend.expect('GET', 'views/all_reviews.html').respond(200, "<div></div>");
            $scope.$apply();
            httpBackend.flush();
            expect(location.path).toHaveBeenCalledWith('/');
        });

        it('Should set error and errorMessage on Error', function() {
            $scope.login();
            deferred.reject("Failure");
            httpBackend.expect('GET', 'user/status').respond(400);
            httpBackend.expect('GET', 'user/status').respond(400);
            httpBackend.expect('GET', 'views/all_reviews.html').respond(200, "<div></div>");
            $scope.$apply();
            httpBackend.flush();
            expect($scope.error).toBe(true);
        });

        afterEach(function() {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });

    });
});