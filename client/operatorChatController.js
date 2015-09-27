LifeLine.controller("operatorChatController", function($scope, $window){

	$scope.class = "ng-show"
	$scope.loader = "ng-hide"

	$scope.hide = function() {
		$scope.class = "ng-hide"
		$scope.loader = "ng-show"
	}

	var operatorNumber = Math.floor(Math.random() * 1000000) + 1

	var socket = io.connect();

	socket.on('connect', function () {
	  console.log('BROWSER::WE ARE USING SOCKETS!');
	  socket.emit('newOperator', operatorNumber)

		socket.on('help', function(data){
			// alert(data)
			$window.open('localhost:8000/#/operatorChating/' + data, '_blank');
		})
	})


});
