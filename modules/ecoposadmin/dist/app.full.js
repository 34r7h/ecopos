angular.module('ecoposadmin', ['ui.bootstrap','ui.utils','ngRoute','ngAnimate']);

angular.module('ecoposadmin').config(function($routeProvider) {

    $routeProvider.
    /* Add New Routes Above */
    otherwise({redirectTo:'/home'});

});

angular.module('ecoposadmin').factory('adminTest',function() {

	var adminTest = {test: "Admin Module Working Service"};

	return adminTest;
});
