LifeLine.factory('opFactory', function($http){
	var factory = {};

	// factory.getProducts = function(callback){
	// 	$http.get('/all_products').success(function(output){
	// 		callback(output);
	// 	})
	// }
	factory.login = function(op, callback){
		$http.post('/login', op).success(function(output){
			callback(output);
		})
		// console.log(op);
	}
	return factory;
})