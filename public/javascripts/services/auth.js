/**
 * Created by masstamike on 3/21/16.
 */
angular.module('beerJournalApp').factory('AuthService',
    ['$q', '$timeout', '$http',
        function ($q, $timeout, $http) {

            // create user variable
            var user = null;
            var user_handle = "";

            var isLoggedIn = function () {
                if (user) {
                    return true;
                } else {
                    return false;
                }
            };

            var getUsername = function () {
                return user_handle;
            };

            var getUserStatus = function () {
                var callback = $http.get('user/status');
                // handle success
                callback.success(function (data) {
                    if(data.status){
                        user = true;
                        user_handle = data.user;
                    } else {
                        user = false;
                        user_handle = "";
                    }
                })
                    // handle error
                    .error(function () {
                        user = false;
                        user_handle = "";
                    });
                return callback;
            };

            var login = function (username, password) {

                var deferred = $q.defer();

                $http.post('user/login',
                    {username: username, password: password})
                    // handle success
                    .success(function (data, status) {
                        if(status === 200 && data.status){
                            user = true;
                            user_handle = data.user;
                            deferred.resolve();
                        } else {
                            user = false;
                            user_handle = "";
                            deferred.reject();
                        }
                    })
                    .error(function () {
                        user = false;
                        user_handle = "";
                        deferred.reject();
                    });

                return deferred.promise;
            };

            var logout = function () {
                var deferred = $q.defer();

                $http.get('user/logout')
                    .success(function () {
                        user = false;
                        user_handle = "";
                        deferred.resolve();
                    })
                    .error(function () {
                        user = false;
                        user_handle = "";
                        deferred.reject();
                    });
                return deferred.promise;
            };

            var register = function (username, password) {
                var deferred = $q.defer();

                $http.post('user/register', {
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
                    .error (function () {
                    deferred.reject();
                });

                return deferred.promise;
            };

            // return available functions for use in the controllers
            return ({
                isLoggedIn: isLoggedIn,
                getUserStatus: getUserStatus,
                login: login,
                logout: logout,
                register: register,
                getUsername: getUsername
            });

        }]);