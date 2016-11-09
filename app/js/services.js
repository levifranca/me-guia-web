angular.module('MeGuiaApp.services', [])
.factory('meGuiaAPIservice', ['$http', '$base64', 'localStorageService', function($http, $base64, localStorageService) {

	// Public object
	var meGuiaAPI = {};

	// Private elements
	var ME_GUIA_API_HOST = 'http://localhost:8080';
	var ME_GUIA_API_CONTEXT_PATH = '/me-guia-server/api';
	var ME_GUIA_API_ADDRESS = ME_GUIA_API_HOST + ME_GUIA_API_CONTEXT_PATH;
	/*
	var getWithBasicAuth = function(url, user, pass, success, fail) {

		var headers = { 'Authorization': 'Basic ' + userPassBase64 };
		$http.get('http://localhost:8080/me-guia-server/index', {headers: headers, transformResponse: undefined}).then(success, fail);


	};
	*/
	var setResult = function(status, data) {
		var _status = status;
		var _data = data;

		var dataAsJson = function() {
			return JSON.parse(_data);
		};

		var result = {
			status: _status,
			data: _data,
			dataAsJson: dataAsJson
		};
		return result;
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
		var success = function(resp) {
			console.log(resp);

			var result = setResult(resp.status, resp.data);

			localStorageService.set('loggedUser', result.dataAsJson());

			successCallback && successCallback(result);
		};

		var fail = function(resp) {
			console.log(resp);
			var result = setResult(resp.status, resp.data);
			failCallback && failCallback(result);
		};

		var userPassBase64 = $base64.encode(user + ':' + pass);
		var headers = { 'Authorization': 'Basic ' + userPassBase64 };
		$http.get(ME_GUIA_API_ADDRESS + '/cadastrador/' + user, {headers: headers, transformResponse: undefined}).then(success, fail);

	};


	return meGuiaAPI;
}])

;