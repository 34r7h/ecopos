angular.module('ecopos.common').directive('login', function($rootScope) {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'directive/login/login.html',
		link: function(scope, element, attrs, fn) {
      scope.test = $rootScope.DBFB.$child('love');

		}
	};
});
