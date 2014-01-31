angular.module('ecopos.admin', ['ui.bootstrap','ui.utils','ngRoute','ngAnimate']);

angular.module('ecopos.admin').config(function($routeProvider) {

    $routeProvider.
    when('dashboard',{templateUrl: 'partial/dashboard/dashboard.html'});
	/* Add New Routes Above */


});
