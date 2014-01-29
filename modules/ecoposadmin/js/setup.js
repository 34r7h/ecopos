angular.module('ecoposadmin', ['ui.bootstrap','ui.utils','ngRoute','ngAnimate']);

angular.module('ecoposadmin').config(function($routeProvider) {

    $routeProvider.
    when('dashboard',{templateUrl: 'partial/dashboard/dashboard.html'}).
	/* Add New Routes Above */
    otherwise({redirectTo:'/home'});

});
