angular.module('ecoposresources', ['ui.bootstrap','ui.utils','ngRoute','ngAnimate']);

angular.module('ecoposresources').config(function($routeProvider) {

    $routeProvider.
    /* Add New Routes Above */
    otherwise({redirectTo:'/home'});

});