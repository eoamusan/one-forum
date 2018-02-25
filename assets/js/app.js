var app = angular.module("doctorDialApp", ["ui.router", "slick", "ngSanitize", "ngCookies"]);
app.config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

    $urlRouterProvider.otherwise('/');

    $httpProvider.interceptors.push('BasicAuthInterceptorService');

    $stateProvider

        .state('body', {
            templateUrl : "views/body.html",
            controller: 'bodyCtrl'
        })

        .state('account', {
            parent: 'body',
            views: {
                'container@body': {
                    templateUrl : "views/account.html",
                    controller: 'accountCtrl'
                }
            }
        })

        .state('login', {
            url: '/login',
            parent: 'account',
            templateUrl : "views/login.html"
        })

        .state('signup', {
            url: '/signup',
            parent: 'account',
            templateUrl : "views/signup.html"
        })

        .state('home', {
            url: '/',
            parent: 'body',
            views: {
                'container@body': {
                    templateUrl : "views/home.html",
                    controller: 'homeCtrl'
                }
            }
        })

        .state('post', {
            url: '/post/:postid',
            parent: 'body',
            views: {
                'container@body': {
                    templateUrl : "views/post.html",
                    controller: 'postCtrl'
                }
            }
        })

        .state('logout', {
            url: '/logout',
            parent: 'body',
            views: {
                'container@body': {
                    templateUrl : "views/logout.html",
                    controller: 'accountCtrl'
                }
            }
        })

        .state('reset', {
            url: '/reset',
            parent: 'container',
            templateUrl : "views/reset.html",
            controller: 'resetCtrl'
        })

        .state('verify', {
            url: '/verify',
            parent: 'container',
            templateUrl : "views/verify.html",
            controller: 'verifyCtrl',
            params: {
                token: null
            }
        })

});

app.run(function($rootScope, $state, AuthenticationService, $cookieStore, $location, $http) {

    $rootScope.globals = $cookieStore.get('globals') || {};

    console.log($rootScope.globals);

    var routes_nloggedin = ['/login', '/signup/patient', '/signup/doctor'];
    var routes_loggedin = ['/', '/account/doctors', '/question', '/password-change'];

    // if ($rootScope.globals.currentUser) {
    //     var credentials = {
    //         username: $rootScope.globals.currentUser.username,
    //         password: $rootScope.globals.currentUser.password
    //     };

    //     console.log(credentials);

    //     AuthenticationService.Login(credentials, function(data){
    //         console.log(data);

    //         if(data.data._meta.status_code === 200){

    //             AuthenticationService.SetCredentials(credentials.username, credentials.password, data.data);

    //             if(!data.data.data.account_verified){
    //                 $state.go('verify', {token: data.data._meta.token});
    //             }

    //         }else{

    //             console.log('Should be cleared here');

    //             $rootScope.globals = {};
    //             $cookieStore.remove('globals');
    //             $state.go('login');

    //         }

    //     });
    // }

    $rootScope.$on('$locationChangeStart', function(event, toState, toParams, fromState, fromParams) {

        if ((routes_nloggedin.indexOf($location.path()) !== -1) && $rootScope.globals.currentUser) {
            // User isn’t authenticated
            console.log('User is authenticated');

            $state.go("home");
            event.preventDefault();
        }

        console.log(routes_loggedin.indexOf($location.path()));

        if ((routes_loggedin.indexOf($location.path()) !== -1) && !$rootScope.globals.currentUser) {
            // User isn’t authenticated
            console.log('User isn’t authenticated');

            $state.go("login");
            event.preventDefault();
        }
    });
});