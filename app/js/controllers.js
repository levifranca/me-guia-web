angular.module('MeGuiaApp.controllers', [])
.controller('loginController', ['$scope', '$location', 'meGuiaAPIservice', function($scope, $location, meGuiaAPIservice) {

	$scope.signIn = function() {



		var success = function(result) {
			$scope.errorMessage = "";
			console.log(result);

			$location.url('/home');
		};

		var fail = function(data) {
			console.log(data);

			$scope.pass = "";

			if (data.httpStatus >= 500) {
				$scope.errorMessage = "Erro inexperado no sistema.";
			} else {
				$scope.errorMessage = "Login/senha incorretos.";
			}
		};

		meGuiaAPIservice.login($scope.login, $scope.pass, success, fail);

	};
 
}])

.controller('homeController', ['$scope', 'localStorageService', function($scope, localStorageService) {
	$scope.nome = localStorageService.get('loggedUser').nome;
}])

;