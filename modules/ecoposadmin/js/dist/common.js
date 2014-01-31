angular.module('ecopos.common', ['ui.bootstrap','ui.utils','ngRoute','ngAnimate']);

angular.module('ecopos.common').config(function($routeProvider) {



});
angular.module('ecopos.common').factory('commonTest',function() {

	var commonTest = {test: "Common Module Service Test OK!!"};

	return commonTest;
});
angular.module('ecopos.common').factory('notify',function() {

	var notify = {};

	return notify;
});
angular.module('ecopos.common').factory('authority',function() {

	var authority = {};

	return authority;
});
angular.module('ecopos.common').factory('messaging',function() {

	var messaging = {};

	return messaging;
});
angular.module('ecopos.common').factory('DBfirebase',function() {

	var DBfirebase = {};

	return DBfirebase;
});
angular.module('ecopos.common').factory('DBappEngine',function() {

	var DBappEngine = {};

	return DBappEngine;
});
angular.module('ecopos.common').factory('social',function() {

	var social = {};

	return social;
});
angular.module('ecopos.common').directive('sharing', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {

		},
		templateUrl: 'directive/sharing/sharing.html',
		link: function(scope, element, attrs, fn) {


		}
	};
});

angular.module('ecopos.common').directive('login', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {

		},
		templateUrl: 'directive/login/login.html',
		link: function(scope, element, attrs, fn) {


		}
	};
});

angular.module('ecopos.common').directive('notifications', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {

		},
		templateUrl: 'directive/notifications/notifications.html',
		link: function(scope, element, attrs, fn) {


		}
	};
});

angular.module('ecopos.common').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('directive/login/login.html',
    "<div></div>"
  );


  $templateCache.put('directive/notifications/notifications.html',
    "<div></div>"
  );


  $templateCache.put('directive/sharing/sharing.html',
    "<div></div>"
  );

}]);
