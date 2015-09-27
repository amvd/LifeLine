LifeLine.factory('opFactory', function($http){
	var factory = {};

	factory.login = function(op, callback){
		$http.post('/login', op).success(function(output){
			callback(output);
		})
		// console.log(op);
	}
	return factory;
})