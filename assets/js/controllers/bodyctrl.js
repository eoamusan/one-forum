app.controller('bodyCtrl', function($rootScope, $scope, $http, $state, $interval, AuthenticationService, $timeout, $filter) {
	$scope.post = {};
	$scope.category = "entertainment";
	$scope.editingPost = false;

    $scope.logout = function(){
    	$state.go('logout');
    	AuthenticationService.ClearCredentials();
    }

    $scope.validate = function(elem){
        var elem = document.getElementById(elem);
        var valids = angular.element(elem.querySelectorAll('[data-validate]'));

        console.log(valids);

        var validation = 0;

        angular.forEach(valids, function(valid){

            angular.element(valid.querySelector('div.valid_status')).removeClass('showValidStatus');

            if(angular.element(valid).find('input').val() == ""){
                angular.element(valid.querySelector('div.valid_status')).html(valid.attributes['data-validate'].value+" is required");
                angular.element(valid.querySelector('div.valid_status')).addClass('showValidStatus');
                validation++;
            }else if(angular.element(valid).find('textarea').val() == ""){
                angular.element(valid.querySelector('div.valid_status')).html(valid.attributes['data-validate'].value+" is required");
                angular.element(valid.querySelector('div.valid_status')).addClass('showValidStatus');
                validation++;
            }else if(valid.attributes['data-validate'].value == "Confirm Password"){
                if($scope.user.password != $scope.user.confirmpassword){
                    angular.element(valid.querySelector('div.valid_status')).html("Please confirm password correctly");
                    angular.element(valid.querySelector('div.valid_status')).addClass('showValidStatus');

                    validation++;
                }
            }

        });

        return validation;
    }

    $scope.parsePreview = function(value){
    	var parsedValue = $filter('lowercase')(value).replace(/[^A-Z0-9]+/ig, "");
    	parsedValue = parsedValue.substring(0, 3) + '...' + (parsedValue.slice((parsedValue.length - 3), parsedValue.length));

    	return parsedValue.charAt(0).toUpperCase()+parsedValue.slice(1);
    }

    $scope.createPost = function(){
    	$scope.creatingPost = true;
    }

    $scope.closeCreatePost = function(){
    	$scope.creatingPost = false;
    }

    $scope.getPosts = function(){
    	$http({
	        method: "GET",
	        url: "http://localhost:3000/Posts"
	    }).then(function successCallback(response) {
	        // this callback will be called asynchronously
	        // when the response is available

	        console.log(response);

	        $scope.posts = response.data.data;
	        
	    }, function errorCallback(response) {
	        // called asynchronously if an error occurs
	        // or server returns response with an error status.
	    });
    }

    $scope.getPosts();

    $scope.delete = function(id){
    	$http({
	        method: "DELETE",
	        url: "http://localhost:3000/Posts/"+id
	    }).then(function successCallback(response) {
	        // this callback will be called asynchronously
	        // when the response is available

	        if(response.data._meta.status_code === 200){
	        	$scope.getPosts();
	        }
	        
	    }, function errorCallback(response) {
	        // called asynchronously if an error occurs
	        // or server returns response with an error status.
	    });
    }

    $scope.sendPost = function(){
    	$scope.onSendPost = true;

        $scope.successPostStatus = false;
        $scope.errorPostStatus = false;

        // Post process
        if($scope.validate("createPost") == 0){

        	$scope.post.userid = $rootScope.globals.currentUser.userdata.data[0].id;

        	if(!$scope.editingPost){
	            var post_request = $http({
	                method: "post",
	                url: "http://localhost:3000/Posts",
	                data: $scope.post
	            });
	        }else{
	        	var post_request = $http({
	                method: "put",
	                url: "http://localhost:3000/Posts/"+$scope.editingPost,
	                data: $scope.post
	            });
	        }

            post_request.then(function successCallback(data) {
               
                if(data.data._meta.status_code === 200){

                    $scope.onSendPost = false;

                    if(!$scope.editingPost){
	                    $scope.showPostStatus = "Post Created";
	                }else{
	                	$scope.showPostStatus = "Post Updated";
	                }

                    $scope.successPostStatus = true;
                    $scope.post = {};
                    $scope.getPosts();

                    $timeout(function(){
                    	$scope.creatingPost = false;
                    	$scope.editingPost = false;
                    	$scope.showPostStatus = '';
                    }, 500);

                }else{

                    $scope.onSendPost = false;
                    $scope.showPostStatus = "Something went wrong";
                    $scope.errorPostStatus = true;
               
                }
                
            }, function errorCallback(data) {
                
                $scope.onSendPost = false;
                $scope.errorPostStatus = true;

                $scope.showPostStatus = data.data._meta.message;

            });

        }else{
            $scope.onSendPost = false;
            $scope.errorPostStatus = true;

            $scope.showPostStatus = 'Please fill all fields';
        }
    }

    $scope.edit = function(post){
    	$scope.post = post;
    	$scope.creatingPost = true;
    	$scope.editingPost = post.id;
    }
});