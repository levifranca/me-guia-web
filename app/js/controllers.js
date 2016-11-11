angular.module('MeGuiaApp.controllers', [])
.controller('loginController', ['$scope', '$location', 'meGuiaAPIservice', function($scope, $location, meGuiaAPIservice) {

	$scope.signIn = function() {



		var success = function(result) {
			$scope.errorMessage = "";
			console.log(result);

			$location.url('/home');
		};

		var fail = function(result) {
			console.log(result);

			$scope.pass = "";

			if (result.status >= 500) {
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

.controller('listarBeaconsController', ['$scope', 'meGuiaAPIservice', '$filter', function($scope, meGuiaAPIservice,  $filter){

	var getBeacons = function() {

		var successBeacons = function(result) {
			$scope.beacons = result.data;
		};

		var failBeacons = function(result) {

			if (result.status >= 500) {
				$scope.errorMessage = "Erro inexperado no sistema.";
			} else {
				$scope.errorMessage = "Nenhum beacon encontrado.";
			}
			if (result.st)
			$scope.errorMessage = "";
		};

		meGuiaAPIservice.getBeacons(successBeacons, failBeacons);
	};



	getBeacons();

}])

;