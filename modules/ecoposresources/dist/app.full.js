angular.module('ecopos.resources', ['ui.bootstrap','ui.utils','ngRoute','ngAnimate']);

angular.module('ecopos.resources').config(function($routeProvider) {

    $routeProvider.
    when('agenda',{templateUrl: 'partial/agenda/agenda.html'});

});
angular.module('ecopos.resources').factory('resourcesTest',function() {

	var resourcesTest = {test: "Resources Module Service Working"};

	return resourcesTest;
});
angular.module('ecopos.resources').factory('deliveryRoute',function() {

	var deliveryRoute = {test:"Delivery Route Service"};

	return deliveryRoute;
});
angular.module('ecopos.resources').factory('deliveryFulfillment',function() {

	var deliveryFulfillment = {test:"Delivery Fulfillment Service"};

	return deliveryFulfillment;
});
angular.module('ecopos.resources').factory('schedule',function() {

	var schedule = {test: "Schedule Service"};

	return schedule;
});
angular.module('ecopos.resources').factory('editInfo',function() {

	var editInfo = {test:"Edit Info Service"};

	return editInfo;
});
angular.module('ecopos.resources').directive('calendar', function() {
	return {
		restrict: 'E',
		replace: true,

		templateUrl: 'directive/calendar/calendar.html',
		link: function(scope, element, attrs, fn) {


		}
	};
});

angular.module('ecopos.resources').directive('todo', function() {
	return {
		restrict: 'E',
		replace: true,

		templateUrl: 'directive/todo/todo.html',
		link: function(scope, element, attrs, fn) {


		}
	};
});

angular.module('ecopos.resources').directive('map', function() {
	return {
		restrict: 'E',
		replace: true,

		templateUrl: 'directive/map/map.html',
		link: function(scope, element, attrs, fn) {


		}
	};
});

angular.module('ecopos.resources').directive('info', function() {
	return {
		restrict: 'E',
		replace: true,

		templateUrl: 'directive/info/info.html',
		link: function(scope, element, attrs, fn) {


		}
	};
});

angular.module('ecopos.resources').filter('mapFilter', function() {
	return function(input,arg) {
		return 'output';
	};
});
angular.module('ecopos.resources').filter('infoFilter', function() {
	return function(input,arg) {
		return 'output';
	};
});
angular.module('ecopos.resources').controller('AgendaCtrl',function($scope, schedule){
$scope.test = schedule.test;

});
angular.module('ecopos.resources').controller('FaqCtrl',function($scope){


});
angular.module('ecopos.resources').controller('DeliveryCtrl',function($scope){


});
angular.module('ecopos.resources').controller('PolicyCtrl',function($scope){


});
angular.module('ecopos.resources').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('partial/agenda/agenda.html',
    "<div class=col-md-12 ng-controller=AgendaCtrl><h3>Agenda</h3><div class=row><div class=\"col-lg-5 panel panel-default\"><calendar></calendar></div><div class=\"col-lg-6 panel panel-default\"><todo></todo></div></div></div>"
  );


  $templateCache.put('partial/delivery/delivery.html',
    "<div class=col-md-12 ng-controller=DeliveryCtrl><h3>Delivery Partial</h3><div class=row><div class=\"col-lg-7 panel panel-default\"><map></map></div><div class=\"col-lg-5 panel panel-default\"><info></info></div></div>Partial Services {{deliveryFulfillment}}, {{deliveryRoute}}, {{editInfo}}</div>"
  );


  $templateCache.put('partial/faq/faq.html',
    "<div class=col-md-12 ng-controller=FaqCtrl></div>"
  );


  $templateCache.put('partial/policy/policy.html',
    "<div class=col-md-12 ng-controller=PolicyCtrl></div>"
  );


  $templateCache.put('directive/calendar/calendar.html',
    "<div><h4>Calendar Directive</h4>{{test}}</div>"
  );


  $templateCache.put('directive/info/info.html',
    "<div><h4>Info Directive</h4>{{editInfo}}</div>"
  );


  $templateCache.put('directive/map/map.html',
    "<div><h4>Map Directive</h4>{{deliveryFulfillment}}, {{deliveryRoute}}</div>"
  );


  $templateCache.put('directive/todo/todo.html',
    "<div><h4>To Do Directive</h4>{{test}}</div>"
  );

}]);
