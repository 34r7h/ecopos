angular.module('ecopos.resources', ['ui.bootstrap','ui.utils','ngRoute','ngAnimate']);

angular.module('ecopos.resources').config(function($routeProvider) {

    $routeProvider.
    when('agenda',{templateUrl: 'partial/agenda/agenda.html'});

});