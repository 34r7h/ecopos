angular.module('ecopos.shop', ['ui.bootstrap','ui.utils','ngRoute','ngAnimate', 'ecopos.common']);

angular.module('ecopos.shop').config(function($routeProvider) {

    $routeProvider.
    when('/testShopPartial',{templateUrl: 'partial/testShopPartial/testShopPartial.html'});

});


