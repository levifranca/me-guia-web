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

.controller('listarBeaconsController', ['$scope', 'meGuiaAPIservice', '$filter', 'localStorageService', function($scope, meGuiaAPIservice, $filter, localStorageService){

	var getBeacons = function() {

		var successBeacons = function(result) {
			console.log(result);
			
			$scope.beacons = result.data;
		};

		var failBeacons = function(result) {
			console.log(result);
			

			if (result.status >= 500) {
				$scope.errorMessage = "Erro inexperado no sistema.";
			} else {
				$scope.errorMessage = "Nenhum beacon encontrado.";
			}
		};

		meGuiaAPIservice.getBeacons(successBeacons, failBeacons);
	};

	var errorMessageExterior = localStorageService.get('errorMessageExterior');
	if (errorMessageExterior) {
		$scope.errorMessageExterior = errorMessageExterior;
		localStorageService.remove('errorMessageExterior');
	}
	var successMessageExterior = localStorageService.get('successMessageExterior');
	if (successMessageExterior) {
		$scope.successMessageExterior = successMessageExterior;
		localStorageService.remove('successMessageExterior');
	}

	getBeacons();

}])

.controller('editarBeaconsController', ['$scope', '$routeParams', 'meGuiaAPIservice', '$location', 'localStorageService', function($scope, $routeParams, meGuiaAPIservice, $location, localStorageService){


	var getBeacon = function(id) {

		var successBeacon = function(result) {
			console.log(result);
			
			$scope.beacon = result.data;
			if ($scope.regioes) {
				$scope.beacon.regiao_id = $scope.beacon.regiao.id;
			}
		};

		var failBeacon = function(result) {
			console.log(result);

			var errorMessage = "";
			if (result.status >= 500) {
				errorMessage = "Erro inexperado no sistema.";
			} else {
				errorMessage = "Sistema não pode realizar a ação.";
			}

			localStorageService.set('errorMessageExterior', errorMessage);
			$location.url('/beacons');
		};

		meGuiaAPIservice.getBeacon(id, successBeacon, failBeacon);
	};

	var getRegioes = function() {

		var successRegioes = function(result) {
			console.log(result);
			
			for(var i = 0; i < result.data.length; i++) {
				if (!result.data[i].ativo) {
					result.data.splice(i, 1);
				}
			}

			$scope.regioes = result.data;
			if ($scope.beacon) {
				$scope.beacon.regiao_id = $scope.beacon.regiao.id;
			}
		};

		var failRegioes = function(result) {
			console.log(result);
			
			$scope.regioes = {};
		};

		meGuiaAPIservice.getRegioes(successRegioes, failRegioes);
	};


	$scope.submit = function() {

		var successBeaconPost = function(result) {
			console.log(result);

			var successMessageExterior = "Beacon inserido com sucesso!";
			localStorageService.set('successMessageExterior', successMessageExterior);
			$location.url('/beacons');
		};

		var failBeaconPost = function(result) {
			console.log(result);

			if (result.status >= 500) {
				errorMessage = "Erro inexperado no sistema.";
			} else {
				$scope.errorMessage = result.dataAsJson().mensagem;
			}

		};

		var loggedUserLogin = localStorageService.get('loggedUser').login;
		if ($scope.id) {
			$scope.beacon.login_modificador = loggedUserLogin;
		} else {
			$scope.beacon.login_criador = loggedUserLogin;
		}

		console.log($scope.beacon);

		meGuiaAPIservice.postBeacon($scope.beacon, successBeaconPost, failBeaconPost);
	};

	getRegioes();

	$scope.id = $routeParams.id;
	if ($scope.id) {
		getBeacon($scope.id);
	}

	
}])

.controller('listarRegioesController', ['$scope', 'localStorageService', 'meGuiaAPIservice', '$filter', function($scope, localStorageService, meGuiaAPIservice, $filter) {

	var getRegioes = function() {

		var successRegioes = function(result) {
			console.log(result);

			$scope.regioes = result.data;

		};

		var failRegioes = function(result) {
			console.log(result);
			
			if (result.status >= 500) {
				$scope.errorMessage = "Erro inexperado no sistema.";
			} else {
				$scope.errorMessage = "Nenhuma região encontrada.";
			}
		};

		meGuiaAPIservice.getRegioes(successRegioes, failRegioes);
	};

	var errorMessageExterior = localStorageService.get('errorMessageExterior');
	if (errorMessageExterior) {
		$scope.errorMessageExterior = errorMessageExterior;
		localStorageService.remove('errorMessageExterior');
	}
	var successMessageExterior = localStorageService.get('successMessageExterior');
	if (successMessageExterior) {
		$scope.successMessageExterior = successMessageExterior;
		localStorageService.remove('successMessageExterior');
	}

	getRegioes();
}])

;