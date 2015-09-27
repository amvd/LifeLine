LifeLine.controller('opController', function($scope, opFactory, $location){
	$scope.login = function(){
		opFactory.login($scope.op, function(data){
			if(data.email == $scope.op.email && data.password == $scope.op.password){
				$location.path("/opDash");
			} else {
				$scope.err = "Invalid Credentials";
			}
		})
	}
})