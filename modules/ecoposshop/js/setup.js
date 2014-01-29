angular.module('ecoposshop', ['ui.bootstrap','ui.utils','ngRoute','ngAnimate', 'ecoposcommon']);

angular.module('ecoposshop').config(function($routeProvider) {

    $routeProvider.
    when('/testShopPartial',{templateUrl: 'partial/testShopPartial/testShopPartial.html'}).
	/* Add New Routes Above */
    otherwise({redirectTo:'/home'});

});


