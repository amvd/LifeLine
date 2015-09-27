LifeLine.controller('opController', function($scope, opFactory, $location){
	$scope.login = function(){
		if($scope.op.email == undefined || $scope.op.password == undefined){
			$scope.err = "Invalid Credentials";
		} else {
			opFactory.login($scope.op, function(data){
				if(data.email == $scope.op.email && data.password == $scope.op.password){
					$location.path("/opDash");
				} else {
					$scope.err = "Invalid Credentials";
				}
			})
		}
	}
})