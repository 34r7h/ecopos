angular.module('ecopos.common', ['ui.bootstrap','ui.utils','ngRoute','ngAnimate']);

angular.module('ecopos.common').config(function($routeProvider) {

    $routeProvider.
    /* Add New Routes Above */
    otherwise({redirectTo:'/home'});

});
