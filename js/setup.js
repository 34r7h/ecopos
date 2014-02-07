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
    'firebase',
    'google-maps'
]);

angular.module('ecopos').config(function($routeProvider, $stateProvider, $urlRouterProvider, $provide) {
    $urlRouterProvider.
        otherwise('/');

    $stateProvider.
        state('shop', {
            url: '/shop/:id',
            controller: 'ShopCtrl',
            templateUrl: 'partial/shop/shop.html'

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
            templateUrl: 'partial/dashboard/dashboard.html'
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
            templateUrl: 'partial/resources/resources.html'
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
            }).
        state('testpat', {
          url: '/testpat',
          template: '<div class="error">{{ err }}</div><notifications></notifications><login></login>'
        }).
        state('testresolves', {
          url: '/testresolves',
          template: '<h3>Testing Resolves</h3><product-list></product-list>',
          resolve: {
            TestData: function($q, shopTest){
              return shopTest.refreshTestData().
                then(function(data){ return 'message:'+data+':'; });

            }
          },
          controller: function($scope, TestData){
            $scope.testData = TestData;
          }
        });

    // Prevents view jumps on state change
    $provide.decorator('$uiViewScroll', function ($delegate) {
        return function (uiViewElement) {
            console.log("Manually scroll to:", uiViewElement);
        };
    });

 });




angular.module('ecopos').run(function($rootScope, $firebase, Firebase, FB_URL) {
    $rootScope.DBFBref = new Firebase(FB_URL);
    $rootScope.DBFB = $firebase($rootScope.DBFBref);
    $rootScope.transitionClass = 'slide-left';

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

}).
constant('FB_URL', 'https://ecopos.firebaseio.com/');
