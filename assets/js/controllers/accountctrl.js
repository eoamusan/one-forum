app.controller('accountCtrl', function($rootScope, $scope, $http, $state, $interval, $timeout, AuthenticationService) {
    $scope.user = {};
    $scope.userSignup = {};

    $scope.login = function(){
        $state.go('login');
    }

    $scope.signup = function(){
        $state.go('signup');
    }

    $scope.loginUser = function(){

        console.log("Logging in");

        $scope.onLogin = true;

        $scope.successLoginStatus = false;
        $scope.errorLoginStatus = false;

        if($scope.validate("loginUser") == 0){

            // Login process
            AuthenticationService.Login($scope.user, function(data){
                console.log(data);
                
                if(data.data._meta.status_code !== 200){

                    $scope.onLogin = false;
                    $scope.errorLoginStatus = true;
                    $scope.showLoginStatus = data.data._meta.message;

                }else if(data.data.data){

                    $scope.onLogin = false;
                    $scope.errorLoginStatus = true;

                    if(data.data._meta.status_code === 200){

                        $scope.showLoginStatus = "User logged in";
                        $scope.successLoginStatus = true;

                        AuthenticationService.SetCredentials($scope.user.email, $scope.user.password, data.data);

                        $timeout(function(){
                            $state.go('home');
                        }, 0);

                    } else {

                        $scope.showLoginStatus = "Something went wrong";
                   
                    }
                }

            });

        }else{
            $scope.onLogin = false;
            $scope.errorLoginStatus = true;

            $scope.showLoginStatus = 'Please provide all credentials';
        }

    }

    $scope.signupUser = function(){
        $scope.onSignup = true;

        $scope.successSignupStatus = false;
        $scope.errorSignupStatus = false;

        // Signup process
        if($scope.validate("signupUser") == 0){

            var signup_request = $http({
                method: "post",
                url: "http://localhost:3000/Users/register",
                data: $scope.userSignup
            });

            signup_request.then(function successCallback(data) {
                console.log(data);
               
                if(data.data._meta.status_code === 200){

                    $scope.onSignup = false;
                    $scope.showSignupStatus = "Account Created";
                    $scope.successSignupStatus = true;

                }else{

                    $scope.onSignup = false;
                    $scope.showSignupStatus = "Something went wrong";
                    $scope.errorSignupStatus = true;
               
                }
                
            }, function errorCallback(data) {
                
                $scope.onSignup = false;
                $scope.errorSignupStatus = true;

                $scope.showSignupStatus = data.data._meta.message;

            });

        }else{
            $scope.onSignup = false;
            $scope.errorSignupStatus = true;

            $scope.showSignupStatus = 'Please fill all fields';
        }
    }
});