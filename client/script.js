var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: './static/partials/land.html'
		})
		.otherwise({
			redirectTo: '/'
		})
})