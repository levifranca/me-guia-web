function MeGuiaHeaderController(localStorageService) {
	var _ctrl = this;
	//var _loggedUser = undefined;

	_ctrl.$doCheck = function() {
		_ctrl.loggedUser = localStorageService.get('loggedUser');
	};

	_ctrl.$onInit = function() {
		_ctrl.loggedUser = localStorageService.get('loggedUser');
	};
}

angular.module('MeGuiaApp.components', [])
.component('meGuiaHeader', {
	templateUrl: 'components/header.html',
	controller: ['localStorageService', MeGuiaHeaderController],
	bindings: {
		loggedUser: '<'
	}
})
;