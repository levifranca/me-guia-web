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

.controller('editarRegioesController', ['$scope', '$routeParams', 'meGuiaAPIservice', 'localStorageService', '$location', function($scope, $routeParams, meGuiaAPIservice, localStorageService, $location){
	var getRegiao = function(id) {

		var successRegiao = function(result) {
			console.log(result);
			
			$scope.regiao = result.data;
		};

		var failRegiao = function(result) {
			console.log(result);

			var errorMessage = "";
			if (result.status >= 500) {
				errorMessage = "Erro inexperado no sistema.";
			} else {
				errorMessage = "Sistema não pode realizar a ação.";
			}

			localStorageService.set('errorMessageExterior', errorMessage);
			$location.url('/regioes');
		};

		meGuiaAPIservice.getRegiao(id, successRegiao, failRegiao);
	};

	$scope.submit = function() {

		var successRegiaoPost = function(result) {
			console.log(result);

			var successMessageExterior = "Região inserida com sucesso!";
			localStorageService.set('successMessageExterior', successMessageExterior);
			$location.url('/regioes');
		};

		var failRegiaoPost = function(result) {
			console.log(result);

			if (result.status >= 500) {
				errorMessage = "Erro inexperado no sistema.";
			} else {
				$scope.errorMessage = result.dataAsJson().mensagem;
			}

		};

		var loggedUserLogin = localStorageService.get('loggedUser').login;
		if ($scope.id) {
			$scope.regiao.login_modificador = loggedUserLogin;
		} else {
			$scope.regiao.login_criador = loggedUserLogin;
		}

		console.log($scope.regiao);

		meGuiaAPIservice.postRegiao($scope.regiao, successRegiaoPost, failRegiaoPost);
	};


	$scope.id = $routeParams.id;
	if ($scope.id) {
		getRegiao($scope.id);
	}
}])

.controller('listarCadastradoresController', ['$scope', 'localStorageService', 'meGuiaAPIservice', function($scope, localStorageService, meGuiaAPIservice){
	var cadastradoresTipo = [];

	var getCadastradoresTipo = function() {

		var successCadastradorTipo = function(result) {
			console.log(result);

			cadastradoresTipo = result.data;

		};

		var failCadastradorTipo = function(result) {
			console.log(result);
			
			if (result.status >= 500) {
				$scope.errorMessage = "Erro inexperado no sistema.";
			} else {
				$scope.errorMessage = "Nenhum tipo de cadastrador encontrado.";
			}
		};

		meGuiaAPIservice.getCadastradoresTipo(successCadastradorTipo, failCadastradorTipo);
	};

	var getCadastradores = function() {

		var successCadastrador = function(result) {
			console.log(result);

			result.data.forEach(function(cadastrador){
				cadastrador.tipoString = cadastradoresTipo[cadastrador.tipo].nome;
			}); 

			$scope.cadastradores = result.data;

		};

		var failCadastrador = function(result) {
			console.log(result);
			
			if (result.status >= 500) {
				$scope.errorMessage = "Erro inexperado no sistema.";
			} else {
				$scope.errorMessage = "Nenhum cadastrador encontrado.";
			}
		};

		meGuiaAPIservice.getCadastradores(successCadastrador, failCadastrador);
	};

	getCadastradoresTipo();

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

	getCadastradores();
}])

.controller('editarCadastradoresController', ['$scope', 'meGuiaAPIservice', '$routeParams', 'localStorageService', '$location', '$base64', function($scope, meGuiaAPIservice, $routeParams, localStorageService, $location, $base64){
	var loggedUser = localStorageService.get('loggedUser');

	var getCadastrador = function(login) {

		var successCadastrador = function(result) {
			console.log(result);
			
			$scope.cadastrador = result.data;

		};

		var failCadastrador = function(result) {
			console.log(result);

			var errorMessage = "";
			if (result.status >= 500) {
				errorMessage = "Erro inexperado no sistema.";
			} else {
				errorMessage = "Sistema não pode realizar a ação.";
			}

			localStorageService.set('errorMessageExterior', errorMessage);
			$location.url('/cadastradores');
		};

		meGuiaAPIservice.getCadastrador(login, successCadastrador, failCadastrador);
	};

	var getCadastradoresTipo = function() {

		var successCadastradorTipo = function(result) {
			console.log(result);

			if (!(loggedUser.tipo === 0)) {
				result.data.splice(0, 1);
			}
			$scope.cadastradoresTipo = result.data;

		};

		var failCadastradorTipo = function(result) {
			console.log(result);
			
			if (result.status >= 500) {
				$scope.errorMessage = "Erro inexperado no sistema.";
			} else {
				$scope.errorMessage = "Nenhum cadastrador encontrado.";
			}
		};

		meGuiaAPIservice.getCadastradoresTipo(successCadastradorTipo, failCadastradorTipo);
	};

	var confirmCurrentPass = function(senhaAtual) {
		var login = loggedUser.login;
		var base64 = $base64.encode(login + ':' + senhaAtual);
		var loggedUserPassBase64 = localStorageService.get('userPassBase64');

		return base64 === loggedUserPassBase64;
	};

	var isChangePassword = function() {
		return $scope.isUpdate && $scope.isLoggedUser;
	};

	$scope.submit = function() {

		var successCadastradorPost = function(result) {
			console.log(result);

			if (isChangePassword() && $scope.novaSenha) {
				var successLogin = function(result) {
					console.log(result);

					var successMessageExterior = "Cadastrador inserido com sucesso!";
					localStorageService.set('successMessageExterior', successMessageExterior);
					$location.url('/cadastradores');
				};

				var failLogin = function(result) {
					console.log(result);

					if (result.status >= 500) {
						errorMessage = "Erro inexperado no sistema.";
					} else {
						$scope.errorMessage = result.dataAsJson().mensagem;
					}
				};

				meGuiaAPIservice.login(loggedUser.login, $scope.novaSenha, successLogin, failLogin);
			} else {

				var successMessageExterior = "Cadastrador inserido com sucesso!";
				localStorageService.set('successMessageExterior', successMessageExterior);
				$location.url('/cadastradores');
			}

		};

		var failCadastradorPost = function(result) {
			console.log(result);

			if (result.status >= 500) {
				errorMessage = "Erro inexperado no sistema.";
			} else {
				$scope.errorMessage = result.dataAsJson().mensagem;
			}

		};

		if (!$scope.isUpdate) {
			if ($scope.novaSenha === $scope.confirmacaoSenha) {
				$scope.cadastrador.senha = $scope.novaSenha;
			}
		} else if (isChangePassword() && confirmCurrentPass($scope.atualSenha)) {
			if ($scope.novaSenha === $scope.confirmacaoSenha) {
				$scope.cadastrador.senha_nova = $scope.novaSenha;
				$scope.cadastrador.senha_atual = $scope.atualSenha;
			}
		}


		var loggedUserLogin = loggedUser.login;
		if ($scope.login) {
			$scope.cadastrador.login_modificador = loggedUserLogin;
		} else {
			$scope.cadastrador.login_criador = loggedUserLogin;
		}

		console.log($scope.cadastrador);

		meGuiaAPIservice.postCadastrador($scope.cadastrador, $scope.isUpdate, successCadastradorPost, failCadastradorPost);
	};

	$scope.isAdmin = loggedUser.tipo === 0;

	getCadastradoresTipo();

	$scope.login = $routeParams.login;
	if ($scope.login) {
		$scope.isUpdate = true;
		$scope.isLoggedUser = $scope.login === loggedUser.login;
		getCadastrador($scope.login);
	}

}])

;