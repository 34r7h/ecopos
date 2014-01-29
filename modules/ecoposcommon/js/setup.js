angular.module('ecoposcommon', ['ui.bootstrap','ui.utils','ngRoute','ngAnimate']);

angular.module('ecoposcommon').config(function($routeProvider) {

    $routeProvider.
    /* Add New Routes Above */
    otherwise({redirectTo:'/home'});

});