function MeGuiaHeaderController(localStorageService, $location, $rootScope) {
	var _ctrl = this;
	//var _loggedUser = undefined;

	_ctrl.$doCheck = function() {
		_ctrl.loggedUser = localStorageService.get('loggedUser');
		_ctrl.activeTab = $rootScope.activeTab;
	};

	_ctrl.$onInit = function() {
		_ctrl.loggedUser = localStorageService.get('loggedUser');
	};

	_ctrl.loggoff = function() {
		localStorageService.remove('loggedUser');
		localStorageService.remove('userPassBase64');
		$location.url('/');
	};
}

angular.module('MeGuiaApp.components', [])
.component('meGuiaHeader', {
	templateUrl: 'components/header.html',
	controller: ['localStorageService', '$location', '$rootScope', MeGuiaHeaderController],
	bindings: {
		loggedUser: '<'
	}
})
;