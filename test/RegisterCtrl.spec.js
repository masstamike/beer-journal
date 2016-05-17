/**
 * Created by masstamike on 5/16/16.
 */
'use strict';

describe("Controller: Register", function() {
    beforeEach(module('beerJournalApp'));

    var $controller;
    var $scope;
    var httpBackend;
    var http;

    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;
        $scope = {
            review: {}
        };
    }));

    describe('sendCreds', function() {
        beforeEach(inject(function($http, $httpBackend) {
            http = $http;
            httpBackend = $httpBackend;
            $controller('RegisterCtrl', {$scope: $scope, $http: http});
        }));

        it('Should alert Success', function() {
            $scope.creds.username = "FooBar";
            httpBackend.expect('POST', '/fake/auth').respond(200, $scope.creds);
            httpBackend.expect('GET', 'user/status').respond(200, {status:true});
            httpBackend.expect('GET', 'user/status').respond(200, {status:true});
            httpBackend.expect('GET', '').respond(200, '<div></div>');
            $scope.alert = function() {};
            spyOn(window, "alert");
            $scope.sendCreds('/fake/auth');
            httpBackend.flush();
            expect(window.alert).toHaveBeenCalledWith('Success, ' + $scope.creds.username);
        });

        it('Should alert Failure', function() {
            httpBackend.expect('POST', '/fake/auth').respond(400);
            httpBackend.expect('GET', 'user/status').respond(200, {status:true});
            httpBackend.expect('GET', 'user/status').respond(200, {status:true});
            httpBackend.expect('GET', '').respond(200, '<div></div>');
            $scope.alert = function() {};
            spyOn(window, "alert");
            $scope.sendCreds('/fake/auth');
            httpBackend.flush();
            expect(window.alert).toHaveBeenCalledWith('Fail!');

        })

    });
});