angular.module('ecopos.common', ['ui.bootstrap','ui.utils','ngRoute','ngAnimate']);

angular.module('ecopos.common').config(function($routeProvider) {
  $routeProvider.
      when('/', {templateUrl: 'directive/login/login.html'}).
      otherwise({ redirectTo: '/' });
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
    "<div><div class=login-block><div><label for=username>Username:</label><input name=username id=username data-ng-model=username></div><div><label for=password>Password:</label><input type=password name=password id=password data-ng-model=\"\\\"password\"></div></div><div class=register-block><div><label for=username>Username:</label><input name=username id=username data-ng-model=username></div><div><label for=password>Password:</label><input type=password name=password id=password data-ng-model=\"\\\"password\"></div><div><label for=passwordConfirm>Confirm password:</label><input type=password name=passwordConfirm id=passwordConfirm data-ng-model=\"\\\"passwordConfirm\"></div></div><div class=user-block><span>Logged in as: {{ user.username }}</span></div></div>"
  );


  $templateCache.put('directive/notifications/notifications.html',
    "<div></div>"
  );


  $templateCache.put('directive/sharing/sharing.html',
    "<div></div>"
  );

}]);
