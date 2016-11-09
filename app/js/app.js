angular.module('MeGuiaApp', [
	'MeGuiaApp.components',
	'MeGuiaApp.controllers',
	'MeGuiaApp.services',
	'ngRoute',
	'base64',
	'LocalStorageModule'
]).
config(['$httpProvider', '$routeProvider', 'localStorageServiceProvider', function($httpProvider, $routeProvider, localStorageServiceProvider) {
	$httpProvider.defaults.headers.common['Authorization'] = '';

	localStorageServiceProvider
	.setPrefix('meGuiaApp')
	.setStorageType('localStorage')
    .setNotify(true, true)
	;
	
	$routeProvider
	.when("/login", {templateUrl: "partials/login.html", controller: "loginController"})
	.when("/home", {templateUrl: "partials/home.html", controller: "homeController"})
	//.when("/drivers/:id", {templateUrl: "partials/driver.html", controller: "driverController"})
	.otherwise({redirectTo: '/login'})
	;
}])
.run( function($rootScope, localStorageService, $location) {

	// register listener to watch route changes
	$rootScope.$on( "$routeChangeStart", function(event, next, current) {
		var loggedUser = localStorageService.get('loggedUser');
		var goingToLoginPage = next.templateUrl == "partials/login.html";

		if ( !loggedUser && !goingToLoginPage ) {
			$location.path( "/login" );
		}

		if ( loggedUser && goingToLoginPage ) {
			$location.path( "/home" );
		}
	});
})
;