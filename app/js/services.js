angular.module('MeGuiaApp.services', [])
.factory('meGuiaAPIservice', ['$http', '$base64', 'localStorageService', function($http, $base64, localStorageService) {

	// Public object
	var meGuiaAPI = {};

	// Private elements
	var ME_GUIA_API_HOST = 'http://localhost:8080';
	var ME_GUIA_API_CONTEXT_PATH = '/me-guia-server/api';
	var ME_GUIA_API_ADDRESS = ME_GUIA_API_HOST + ME_GUIA_API_CONTEXT_PATH;
	
	var setResult = function(status, data) {
		var _status = status;
		var _data = data;

		var dataAsJson = function() {
			try {
				return JSON.parse(_data)
			} catch (err) {};
			return null;
		};

		var result = {
			status: _status,
			data: _data,
			dataAsJson: dataAsJson
		};
		return result;
	};


	var getWithBasicAuth = function(path, success, fail) {

		var userPassBase64 = localStorageService.get('userPassBase64');

		if (!userPassBase64) {
			console.error('User is not logged in!');
			var result = setResult(401, {error: 'User is not logged in!'})

			fail && fail(result);
		}

		var headers = { 'Authorization': 'Basic ' + userPassBase64 };
		$http.get(ME_GUIA_API_ADDRESS + path, {headers: headers}).then(success, fail);

	};
	
	
	// Public object methods definition
	meGuiaAPI.test = function(user, pass) {

		var userPassBase64 = $base64.encode(user + ':' + pass);

		var success = function(resp) {
			console.log(resp);
			alert(resp.data);
		};

		var fail = function(resp) {
			console.log(resp);
			alert(resp.data);
		};

		var headers = { 'Authorization': 'Basic ' + userPassBase64 };
		$http.get('http://localhost:8080/me-guia-server/index', {headers: headers, transformResponse: undefined}).then(success, fail);
	};


	meGuiaAPI.login = function(user, pass, successCallback, failCallback) {
		var userPassBase64 = $base64.encode(user + ':' + pass);
		
		var success = function(resp) {
			console.log(resp);

			var result = setResult(resp.status, resp.data);

			localStorageService.set('loggedUser', result.dataAsJson());
			localStorageService.set('userPassBase64', userPassBase64);

			successCallback && successCallback(result);
		};

		var fail = function(resp) {
			console.log(resp);
			var result = setResult(resp.status, resp.data);
			failCallback && failCallback(result);
		};

		var headers = { 'Authorization': 'Basic ' + userPassBase64 };
		$http.get(ME_GUIA_API_ADDRESS + '/cadastrador/' + user, {headers: headers, transformResponse: undefined}).then(success, fail);

	};

	meGuiaAPI.getBeacons = function (successCallback, failCallback) {

		var success = function(resp) {
			console.log(resp);

			var result = setResult(resp.status, resp.data);
			successCallback && successCallback(result);
		};

		var fail = function(resp) {
			console.log(resp);

			var result = setResult(resp.status, resp.data);
			failCallback && failCallback(result);
		};

		getWithBasicAuth('/beacons', success, fail);
	};


	return meGuiaAPI;
}])

;