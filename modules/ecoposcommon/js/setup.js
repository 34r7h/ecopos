angular.module('ecopos.common', ['ui.bootstrap','ui.utils','ngRoute','ngAnimate']);

angular.module('ecopos.common').config(function($routeProvider) {
  $routeProvider.
      when('/', {
        template: '<login></login>'
      }).
      otherwise({ redirectTo: '/' });
});