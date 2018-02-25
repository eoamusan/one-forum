app.controller('postCtrl', function($rootScope, $scope, $http, $state, $interval, $stateParams) {
	console.log('In post');
	console.log("http://localhost:3000/Post/"+$stateParams.postid);

    $scope.getPost = function(){
    	$http({
	        method: "GET",
	        url: "http://localhost:3000/Posts/"+$stateParams.postid
	    }).then(function successCallback(response) {
	        // this callback will be called asynchronously
	        // when the response is available

	        console.log(response);

	        $scope.post = response.data.data[0];
	        
	    }, function errorCallback(response) {
	        // called asynchronously if an error occurs
	        // or server returns response with an error status.
	    });
    }

    $scope.getPost();
});