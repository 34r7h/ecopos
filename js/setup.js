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
            controller: 'ShopCtrl',
            template: '<h2>Shop</h2><div class="ui-view-container"><div ui-view></div>'
        }).
            state('shop.pos',{
                url: '/pos',
                templateUrl: 'partial/shop/shop.html'
            }).
            state('shop.cafe',{
                url: '/cafe',
                templateUrl: 'partial/cafe/cafe.html'
            }).
            state('shop.so',{
                url: '/sunshine',
                templateUrl: 'partial/sunshine/sunshine.html'
            }).
            state('shop.cart',{
                url: '/cart',

                template: '<cart></cart>'
            }).
            state('shop.checkout',{
                url: '/checkout',

                template: '<checkout></checkout>'
            }).

        state('admin',{
            url: '/dashboard/:id',
            controller: 'DashboardCtrl',
            template: '<h2>Dashboard</h2><div class="ui-view-container"><div ui-view></div>'
        }).
            state('admin.settings',{
                url: '/settings',

                templateUrl: 'partial/acct-prefs/acct-prefs.html'
            }).
            state('admin.inventory',{
                url: '/inventory',

                templateUrl: 'partial/inventory/inventory.html'
            }).
            state('admin.store',{
                url: '/store',

                templateUrl: 'partial/manage/manage.html'
            }).

        state('resources',{
            url: '/resources/:id',
            controller: 'ResourcesCtrl',
            template: '<h2>Resources</h2><div class="ui-view-container"><div ui-view></div>'
        }).
            state('resources.agenda',{
                url: '/agenda',
                templateUrl: 'partial/agenda/agenda.html'
            }).
            state('resources.delivery',{
                url: '/delivery',

                templateUrl: 'partial/delivery/delivery.html'
            }).
            state('resources.info',{
                url: '/info',

                template: '<info></info>'
            }).
            state('resources.map',{
                url:'/map',
                template: '<map></map>'
        });

 });




angular.module('ecopos').run(function($rootScope, $firebase, Firebase) {

    $rootScope.items = $firebase(new Firebase('https://ecopos.firebaseio.com/items'));

    $rootScope.addItem = function(){
        $rootScope.items.$add({test:"run"});
    };

    $rootScope.loseItem = function(){
        $rootScope.items.$remove("test");
    };

    $rootScope.loseAllItems = function(){
        $rootScope.items.$remove();
    };



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
