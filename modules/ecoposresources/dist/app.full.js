angular.module('ecoposResources', ['ui.bootstrap','ui.utils','ngRoute','ngAnimate']);

angular.module('ecoposResources').config(function($routeProvider) {

    $routeProvider.
    /* Add New Routes Above */
    otherwise({redirectTo:'/home'});

});
angular.module('ecoposResources').factory('resourcesTest',function() {

	var resourcesTest = {test: "Resources Module Service Working"};

	return resourcesTest;
});
