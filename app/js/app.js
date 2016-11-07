angular.module('MeGuiaApp', [
	'MeGuiaApp.controllers',
	'MeGuiaApp.services',
	'ngRoute',
	'base64'
]).
config(['$httpProvider', '$routeProvider', function($httpProvider, $routeProvider) {
	//var auth = $base64.encode("foo:bar");
    $httpProvider.defaults.headers.common['Authorization'] = '';
	
	$routeProvider
	.when("/login", {templateUrl: "partials/login.html", controller: "loginController"})
	.when("/home", {templateUrl: "partials/home.html", controller: "homeController"})
	//.when("/drivers/:id", {templateUrl: "partials/driver.html", controller: "driverController"})
	.otherwise({redirectTo: '/login'})
	;
}]);