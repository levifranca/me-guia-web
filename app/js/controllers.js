angular.module('MeGuiaApp.controllers', [])
.controller('loginController', ['$scope', '$location', 'meGuiaAPIservice', function($scope, $location, meGuiaAPIservice) {

	$scope.signIn = function() {

		meGuiaAPIservice.test($scope.login, $scope.senha);

		//$location.url('/home');
	};

}])

.controller('homeController', ['$scope', function($scope) {
	
}])

;