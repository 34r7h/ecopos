angular.module('ecopos', ['ui.bootstrap','ui.utils','ngRoute','ngAnimate', 'ecopos.admin', 'ecopos.resources', 'ecopos.shop', 'ecopos.common']);

angular.module('ecopos').config(function($routeProvider) {

    $routeProvider.
    when('/',{templateUrl: 'partial/test/test.html'}).
	when('/dashboard/:id',{templateUrl: 'partial/dashboard/dashboard.html'}).
	when('/shop/:id',{templateUrl: 'partial/shop/shop.html'}).
	when('/resources/:id',{templateUrl: 'partial/resources/resources.html'}).
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
