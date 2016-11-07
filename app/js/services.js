angular.module('MeGuiaApp.services', [])
.factory('meGuiaAPIservice', ['$http', '$base64', function($http, $base64) {

	var meGuiaAPI = {};

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


	return meGuiaAPI;
}])

;