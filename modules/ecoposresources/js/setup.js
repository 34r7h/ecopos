angular.module('ecoposResources', ['ui.bootstrap','ui.utils','ngRoute','ngAnimate']);

angular.module('ecoposResources').config(function($routeProvider) {

    $routeProvider.
    when('agenda',{templateUrl: 'partial/agenda/agenda.html'}).
	/* Add New Routes Above */
    otherwise({redirectTo:'/home'});

});