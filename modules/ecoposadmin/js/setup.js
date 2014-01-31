angular.module('ecopos.admin', ['ui.bootstrap','ui.utils','ngRoute','ngAnimate']);

angular.module('ecopos.admin').config(function($routeProvider) {

    $routeProvider.
	when('/dashtest',{templateUrl: 'partial/dashTest/dashTest.html'});
	/* Add New Routes Above */


});
