/**
 * Created by masstamike on 3/21/16.
 */
angular.module('beerJournalApp').factory('AuthService',
    ['$q', '$timeout', '$http',
        function ($q, $timeout, $http) {

            // create user variable
            var user = null;

            var isLoggedIn = function () {
                if (user) {
                    return true;
                } else {
                    return false;
                }
            };

            var getUserStatus = function () {
                $http.get('/user/status')
                    // handle success
                    .success(function (data) {
                        if(data.status){
                            user = true;
                        } else {
                            user = false;
                        }
                    })
                    // handle error
                    .error(function (data) {
                        user = false;
                    });
            };

            var login = function (username, password) {

                var deferred = $q.defer();

                $http.post('/user/login',
                    {username: username, password: password})
                    // handle success
                    .success(function (data, status) {
                        if(status === 200 && data.status){
                            user = true;
                            deferred.resolve();
                        } else {
                            user = false;
                            deferred.reject();
                        }
                    })
                    .error(function (data) {
                        user = false;
                        deferred.reject();
                    });

                return deferred.promise;
            };

            var logout = function () {
                var deferred = $q.defer();

                $http.get('/user/logout')
                    .success(function (data) {
                        user = false;
                        deferred.resolve();
                    })
                    .error(function (data) {
                        user = false;
                        deferred.reject();
                    });
                return deferred.promise;
            };

            var register = function (username, password) {
                var deferred = $q.defer();

                $http.post('/user/register', {
                    username: username,
                    password: password
                })
                    .success (function (data, status) {
                    if (status == 200 && data.status) {
                        deferred.resolve();
                    } else {
                        deferred.reject();
                    }
                })
                    .error (function (data) {
                    deferred.reject();
                });

                return deferred;
            };

            // return available functions for use in the controllers
            return ({
                isLoggedIn: isLoggedIn,
                getUserStatus: getUserStatus,
                login: login,
                logout: logout,
                register: register
            });

        }]);