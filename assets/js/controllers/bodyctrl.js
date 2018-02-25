app.controller('bodyCtrl', function($rootScope, $scope, $http, $state, $interval, AuthenticationService) {
    $scope.logout = function(){
    	$state.go('logout');
    	AuthenticationService.ClearCredentials();
    }
});