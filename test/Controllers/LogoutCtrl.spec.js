/**
 * Created by masstamike on 5/17/16.
 */
'use strict';

describe('Controller: LogoutCtrl', function() {
    beforeEach(module('beerJournalApp'));

    var httpBackend;
    var $scope;
    var $location;

    beforeEach(inject(function($http, _$rootScope_, $controller, $httpBackend, _$location_) {
        $scope = _$rootScope_.$new();
        httpBackend = $httpBackend;
        $location = _$location_;
        $controller('LogoutCtrl', {$scope: $scope, $http: $http, $location: $location});
    }));

    it('Should redirect to / when logged out.', function() {
        httpBackend.expect('POST', 'user/logout').respond(200);
        httpBackend.expect('GET', 'user/status').respond(200, {status:true});
        spyOn($location, 'path').and.callFake(function() {
            return {search: function() {return {replace: function(){}}}}
        });
        httpBackend.flush();
        expect($location.path).toHaveBeenCalledWith('/');
    });

    it('Should log error on failure to logout.', function() {
        spyOn(console, 'error');
        httpBackend.expect('POST', 'user/logout').respond(400, {err:"Failure"});
        httpBackend.expect('GET', 'user/status').respond(200, {status:true});
        httpBackend.expect('GET', 'user/status').respond(200, {status:true});
        httpBackend.expect('GET', '').respond(200, '');
        httpBackend.flush();
        $scope.$apply();
        expect(console.error).toHaveBeenCalled();
    });

});