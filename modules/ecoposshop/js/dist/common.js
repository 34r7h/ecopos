angular.module('ecoposcommon', ['ui.bootstrap','ui.utils','ngRoute','ngAnimate']);

angular.module('ecoposcommon').config(function($routeProvider) {

    $routeProvider.
    /* Add New Routes Above */
    otherwise({redirectTo:'/home'});

});
angular.module('ecoposcommon').factory('commonTest',function() {

	var commonTest = {test: "Common Module Service Test OK!!"};

	return commonTest;
});
