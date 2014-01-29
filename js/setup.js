angular.module('ecopos', ['ui.bootstrap','ui.utils','ngRoute','ngAnimate', 'ecoposadmin', 'ecoposresources', 'ecoposshop', 'ecoposcommon']);

angular.module('ecopos').config(function($routeProvider) {

    $routeProvider.
    when('/test',{templateUrl: 'partial/test/test.html'}).
	/* Add New Routes Above */
    otherwise({redirectTo:'/home'});

});

angular.module('ecopos').run(function($rootScope) {

	$rootScope.safeApply = function(fn) {
		var phase = $rootScope.$$phase;
		if (phase === '$apply' || phase === '$digest') {
			if (fn && (typeof(fn) === 'function')) {
				fn();
			}
		} else {
			this.$apply(fn);
		}
	};

});
