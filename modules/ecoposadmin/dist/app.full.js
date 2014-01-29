angular.module('ecoposAdmin', ['ui.bootstrap','ui.utils','ngRoute','ngAnimate']);

angular.module('ecoposAdmin').config(function($routeProvider) {

    $routeProvider.
    /* Add New Routes Above */
    otherwise({redirectTo:'/home'});

});

angular.module('ecoposAdmin').factory('adminTest',function() {

	var adminTest = {test: "Admin Module Working Service"};

	return adminTest;
});
