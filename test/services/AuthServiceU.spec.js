/**
 * Created by masstamike on 5/19/16.
 */
'use strict';

describe('Service: AuthService', function() {
    beforeEach(module('beerJournalApp'));

    describe('login()', function() {

        var service,
            httpBackend;

        beforeEach(inject(function(AuthService, _$httpBackend_) {
            service = AuthService;
            httpBackend = _$httpBackend_;
        }));

        describe('Successful Replies', function() {

            // Log A User In
            beforeEach(function() {
                httpBackend.expect('POST', 'user/login').respond(200, {status: true});
                httpBackend.expect('GET', 'user/status').respond(200, {status: true});
                httpBackend.expect('GET', 'user/status').respond(200, {status: true});
                httpBackend.expect('GET', '').respond(200);
                service.login('username', 'password');
                httpBackend.flush();
            });

            it('Should Log A User In', function() {
                expect(service.isLoggedIn()).toBeTruthy();
            });

            it('Should Log A User Out', function() {
                httpBackend.expect('GET', 'user/logout').respond(200);
                service.logout();
                httpBackend.flush();
                expect(service.isLoggedIn()).toBeFalsy();
            });
        });

        describe('Handle Failures', function() {
            beforeEach(function() {
            });

            it('Should handle failure on login', function() {
                httpBackend.expect('POST', 'user/login').respond(200, {status: false});
                httpBackend.expect('GET', 'user/status').respond(200, {status: false});
                httpBackend.expect('GET', 'user/status').respond(200, {status: false});
                httpBackend.expect('GET', '').respond(200, '');
                httpBackend.expect('GET', 'user/status').respond(200, {status: false});
                httpBackend.expect('GET', 'views/login.html').respond(200, '');
                httpBackend.expect('GET', 'user/status').respond(200, {status: false});
                service.login('username', 'password');
                httpBackend.flush();
                expect(service.isLoggedIn()).toBeFalsy();
            });

            it('Should handle error on user/login call', function() {
                var response = 'not called';
                httpBackend.expect('POST', 'user/login').respond(400, {status: false});
                httpBackend.expect('GET', 'user/status').respond(200, {status: false});
                httpBackend.expect('GET', 'user/status').respond(200, {status: false});
                httpBackend.expect('GET', '').respond(200, '');
                httpBackend.expect('GET', 'user/status').respond(200, {status: false});
                httpBackend.expect('GET', 'views/login.html').respond(200, '');
                httpBackend.expect('GET', 'user/status').respond(200, {status: false});
                service.login('username', 'password').then(function() {
                    response = 'success';
                }, function() {
                    response = 'error';
                });
                httpBackend.flush();
                expect(response).toBe('error');
            });

            it('Should handle error on user/logout call', function() {
                var response = 'not called';
                httpBackend.expect('GET', 'user/logout').respond(400, {status: false});
                httpBackend.expect('GET', 'user/status').respond(200, {status: false});
                httpBackend.expect('GET', 'user/status').respond(200, {status: false});
                httpBackend.expect('GET', '').respond(200, '');
                httpBackend.expect('GET', 'user/status').respond(200, {status: false});
                httpBackend.expect('GET', 'views/login.html').respond(200, '');
                httpBackend.expect('GET', 'user/status').respond(200, {status: false});
                service.logout('username', 'password').then(function() {
                    response = 'success';
                }, function() {
                    response = 'error';
                });
                httpBackend.flush();
                expect(response).toBe('error');
            });

            afterEach(function() {
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();
            });
        });
    });

    describe('register()', function() {

        var service,
            httpBackend;

        beforeEach(inject(function(AuthService, _$httpBackend_) {
            service = AuthService;
            httpBackend = _$httpBackend_;
        }));

        // Register A User
        it('Should Log A User In', function() {
            var result = 'not called';
            httpBackend.expect('POST', 'user/register').respond(200, {status: true});
            httpBackend.expect('GET', 'user/status').respond(200, {status: true});
            httpBackend.expect('GET', 'user/status').respond(200, {status: true});
            httpBackend.expect('GET', '').respond(200);
            service.register('username', 'password')
                .then(function() {
                    result = 'success';
                }, function() {
                    result = 'failure';
                });
            httpBackend.flush();
            expect(result).toBe('success');
        });


        it('Should handle failure to register', function() {
            var result = 'not called';
            httpBackend.expect('POST', 'user/register').respond(200, {status: false});
            httpBackend.expect('GET', 'user/status').respond(200, {status: true});
            httpBackend.expect('GET', 'user/status').respond(200, {status: true});
            httpBackend.expect('GET', '').respond(200);
            service.register('username', 'password')
                .then(function() {
                    result = 'success';
                }, function() {
                    result = 'failure';
                });
            httpBackend.flush();
            expect(result).toBe('failure');
        });

        it('Should handle error on user/register call', function() {
            var result = 'not called';
            httpBackend.expect('POST', 'user/register').respond(500);
            httpBackend.expect('GET', 'user/status').respond(200, {status: true});
            httpBackend.expect('GET', 'user/status').respond(200, {status: true});
            httpBackend.expect('GET', '').respond(200);
            service.register('username', 'password')
                .then(function() {
                    result = 'success';
                }, function() {
                    result = 'failure';
                });
            httpBackend.flush();
            expect(result).toBe('failure');
        });

        afterEach(function() {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });

    });
});