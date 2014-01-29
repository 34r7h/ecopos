angular.module('ecoposShop', ['ui.bootstrap','ui.utils','ngRoute','ngAnimate', 'ecoposCommon']);

angular.module('ecoposShop').config(function($routeProvider) {

    $routeProvider.
    when('/testShopPartial',{templateUrl: 'partial/testShopPartial/testShopPartial.html'}).
	/* Add New Routes Above */
    otherwise({redirectTo:'/home'});

});


