angular.module('ecoposresources', ['ui.bootstrap','ui.utils','ngRoute','ngAnimate']);

angular.module('ecoposresources').config(function($routeProvider) {

    $routeProvider.
    /* Add New Routes Above */
    otherwise({redirectTo:'/home'});

});
angular.module('ecoposresources').factory('resourcesTest',function() {

	var resourcesTest = {test: "Resources Module Service Working"};

	return resourcesTest;
});
