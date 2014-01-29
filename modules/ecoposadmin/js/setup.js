angular.module('ecoposadmin', ['ui.bootstrap','ui.utils','ngRoute','ngAnimate']);

angular.module('ecoposadmin').config(function($routeProvider) {

    $routeProvider.
    /* Add New Routes Above */
    otherwise({redirectTo:'/home'});

});
