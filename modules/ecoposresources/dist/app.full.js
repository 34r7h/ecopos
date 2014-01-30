angular.module('ecopos.resources', ['ui.bootstrap','ui.utils','ngRoute','ngAnimate']);

angular.module('ecopos.resources').config(function($routeProvider) {

    $routeProvider.
    when('agenda',{templateUrl: 'partial/agenda/agenda.html'}).
	/* Add New Routes Above */
    otherwise({redirectTo:'/home'});

});
angular.module('ecopos.resources').factory('resourcesTest',function() {

	var resourcesTest = {test: "Resources Module Service Working"};

	return resourcesTest;
});
angular.module('ecopos.resources').factory('deliveryRoute',function() {

	var deliveryRoute = {};

	return deliveryRoute;
});
angular.module('ecopos.resources').factory('deliveryFulfillment',function() {

	var deliveryFulfillment = {};

	return deliveryFulfillment;
});
angular.module('ecopos.resources').factory('schedule',function() {

	var schedule = {};

	return schedule;
});
angular.module('ecopos.resources').factory('editInfo',function() {

	var editInfo = {};

	return editInfo;
});
angular.module('ecopos.resources').directive('calendar', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {

		},
		templateUrl: 'directive/calendar/calendar.html',
		link: function(scope, element, attrs, fn) {


		}
	};
});

angular.module('ecopos.resources').directive('todo', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {

		},
		templateUrl: 'directive/todo/todo.html',
		link: function(scope, element, attrs, fn) {


		}
	};
});

angular.module('ecopos.resources').directive('map', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {

		},
		templateUrl: 'directive/map/map.html',
		link: function(scope, element, attrs, fn) {


		}
	};
});

angular.module('ecopos.resources').directive('info', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {

		},
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
angular.module('ecopos.resources').controller('AgendaCtrl',function($scope){


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
    "<div class=col-md-12 ng-controller=AgendaCtrl></div>"
  );


  $templateCache.put('partial/delivery/delivery.html',
    "<div class=col-md-12 ng-controller=DeliveryCtrl></div>"
  );


  $templateCache.put('partial/faq/faq.html',
    "<div class=col-md-12 ng-controller=FaqCtrl></div>"
  );


  $templateCache.put('partial/policy/policy.html',
    "<div class=col-md-12 ng-controller=PolicyCtrl></div>"
  );


  $templateCache.put('directive/calendar/calendar.html',
    "<div>Calendar Directive</div>"
  );


  $templateCache.put('directive/info/info.html',
    "<div>Info Directive</div>"
  );


  $templateCache.put('directive/map/map.html',
    "<div>Map Directive</div>"
  );


  $templateCache.put('directive/todo/todo.html',
    "<div>To Do Directive</div>"
  );

}]);
