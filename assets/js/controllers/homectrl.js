app.controller('homeCtrl', function($rootScope, $scope, $http, $state, $interval) {
    $scope.tag = 'all';

    $scope.setTag = function(tag){
    	$scope.tag = tag;
    }
});