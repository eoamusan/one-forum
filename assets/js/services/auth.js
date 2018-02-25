app.factory('AuthenticationService', ['Base64', '$http', '$cookieStore', '$rootScope', '$timeout',
    function(Base64, $http, $cookieStore, $rootScope, $timeout) {
        var service = {};

        service.Login = function(credentials, callback) {

            var login_request = $http({
                method: "post",
                url: "http://localhost:3000/Users/login",
                data: credentials
            });

            login_request.then(function successCallback(data) {
               
                callback(data);
                
            }, function errorCallback(data) {
                
                callback(data);

            });

        };

        service.SetCredentials = function(username, password, userdata) {
            var authdata = Base64.encode(username + ':' + password);

            $rootScope.globals = {
                currentUser: {
                    username: username,
                    password: password,
                    userdata: userdata
                }
            };

            $cookieStore.put('globals', $rootScope.globals);
        };

        service.ClearCredentials = function() {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
        };

        return service;
    }
]);