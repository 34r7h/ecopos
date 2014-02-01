angular.module('ecopos', [
    'ui.bootstrap',
    'ui.utils',
    'ngRoute',
    'ngAnimate',
    'ui.router',
    'ecopos.admin',
    'ecopos.resources',
    'ecopos.shop',
    'ecopos.common',
    'firebase'
]);

angular.module('ecopos').config(function($routeProvider, $stateProvider, $urlRouterProvider) {

    $urlRouterProvider.
        otherwise('/');

    $stateProvider.
        state('shop', {
            url: '/shop/:id',
            template: "<div ui-view></div>"
        }).
            state('shop.pos',{
                url: '/pos',
                templateUrl: '/partial/shop/shop.html'
            }).
            state('shop.cafe',{
                url: '/cafe',
                template: 'Cafe State'
            }).
            state('shop.so',{
                url: '/sunshine',
                template: 'Sunshine Organics'
            }).
            state('shop.cart',{
                url: '/cart',
                template: 'A Le Cart'
            }).
            state('shop.checkout',{
                url: '/checkout',
                template: 'Check me out'
            }).

        state('admin',{
            url: '/dashboard/:id',
            templateUrl: '/partial/dashboard/dashboard.html'
        }).
            state('admin.settings',{
                url: '/settings',
                template: 'admin settings'
            }).
            state('admin.inventory',{
                url: '/inventory',
                template: 'admin inventory'
            }).
            state('admin.store',{
                url: '/store',
                template: 'admin store management'
            }).

        state('resources',{
            url: '/resources/:id',
            template: '<div ui-view></div>'
        }).
            state('resources.agenda',{
                url: '/agenda',
                template: 'Agenda Resources'
            }).
            state('resources.delivery',{
                url: '/delivery',
                template: 'Delivery Resources'
            }).
            state('resources.info',{
                url: '/info',
                template: 'Informative Resources'
            }).
            state('testpat', {
                url: '/testpat',
                template: '<login></login>'
            });

 });




angular.module('ecopos').run(function($rootScope, $firebase, Firebase) {

  $rootScope.DBFB = $firebase(new Firebase('https://ecopos.firebaseio.com/'));

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
