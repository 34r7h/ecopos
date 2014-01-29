angular.module('ecoposCommon', ['ui.bootstrap','ui.utils','ngRoute','ngAnimate']);

angular.module('ecoposCommon').config(function($routeProvider) {

    $routeProvider.
    /* Add New Routes Above */
    otherwise({redirectTo:'/home'});

});