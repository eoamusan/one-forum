app.controller('postCtrl', function($rootScope, $scope, $http, $state, $interval, $stateParams) {
	$scope.commentAdd = {};

    $scope.getPost = function(){
    	$http({
	        method: "GET",
	        url: "http://localhost:3000/Posts/"+$stateParams.postid
	    }).then(function successCallback(response) {
	        // this callback will be called asynchronously
	        // when the response is available

	        console.log(response.data.data);

	        $scope.post = response.data.data;
	        
	    }, function errorCallback(response) {
	        // called asynchronously if an error occurs
	        // or server returns response with an error status.
	    });
    }

    $scope.getPost();

    $scope.addComment = function(){
    	$scope.commentAdd.postid = $stateParams.postid;
    	$scope.commentAdd.userid = $rootScope.globals.currentUser.userdata.data[0].id;

    	$http({
	        method: "POST",
	        url: "http://localhost:3000/Comments",
	        data: $scope.commentAdd
	    }).then(function successCallback(response) {
	        // this callback will be called asynchronously
	        // when the response is available

	        $scope.commentAdd = {};
	        $scope.getPost();
	        
	    }, function errorCallback(response) {
	        // called asynchronously if an error occurs
	        // or server returns response with an error status.
	    });
    }
});