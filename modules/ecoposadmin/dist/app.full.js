angular.module('ecopos.admin', ['ui.bootstrap','ui.utils','ngRoute','ngAnimate']);

angular.module('ecopos.admin').config(function($routeProvider) {

    $routeProvider.
    when('dashboard',{templateUrl: 'partial/dashboard/dashboard.html'}).
	/* Add New Routes Above */
    otherwise({redirectTo:'/home'});

});

angular.module('ecopos.admin').factory('adminTest',function() {

	var adminTest = {test: "Admin Module Working Service"};

	return adminTest;
});
angular.module('ecopos.admin').factory('money',function() {

	var money = {};

	return money;
});
angular.module('ecopos.admin').factory('confirmPO',function() {

	var confirmPO = {};

	return confirmPO;
});
angular.module('ecopos.admin').factory('editEmployee',function() {

	var editEmployee = {};

	return editEmployee;
});
angular.module('ecopos.admin').factory('editSupplier',function() {

	var editSupplier = {};

	return editSupplier;
});
angular.module('ecopos.admin').factory('editCustomer',function() {

	var editCustomer = {};

	return editCustomer;
});
angular.module('ecopos.admin').factory('editStore',function() {

	var editStore = {};

	return editStore;
});
angular.module('ecopos.admin').factory('fairTrade',function() {

	var fairTrade = {};

	return fairTrade;
});
angular.module('ecopos.admin').directive('accounting', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {

		},
		templateUrl: 'directive/accounting/accounting.html',
		link: function(scope, element, attrs, fn) {


		}
	};
});

angular.module('ecopos.admin').directive('reports', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {

		},
		templateUrl: 'directive/reports/reports.html',
		link: function(scope, element, attrs, fn) {


		}
	};
});

angular.module('ecopos.admin').directive('employee', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {

		},
		templateUrl: 'directive/employee/employee.html',
		link: function(scope, element, attrs, fn) {


		}
	};
});

angular.module('ecopos.admin').directive('customer', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {

		},
		templateUrl: 'directive/customer/customer.html',
		link: function(scope, element, attrs, fn) {


		}
	};
});

angular.module('ecopos.admin').directive('supplier', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {

		},
		templateUrl: 'directive/supplier/supplier.html',
		link: function(scope, element, attrs, fn) {


		}
	};
});

angular.module('ecopos.admin').directive('stock', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {

		},
		templateUrl: 'directive/stock/stock.html',
		link: function(scope, element, attrs, fn) {


		}
	};
});

angular.module('ecopos.admin').directive('graph', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {

		},
		templateUrl: 'directive/graph/graph.html',
		link: function(scope, element, attrs, fn) {


		}
	};
});

angular.module('ecopos.admin').controller('ManageCtrl',function($scope){


});
angular.module('ecopos.admin').controller('InventoryCtrl',function($scope){


});
angular.module('ecopos.admin').controller('AcctPrefsCtrl',function($scope){


});
angular.module('ecopos.admin').controller('DashboardCtrl',function($scope){


});
angular.module('ecopos.admin').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('partial/acct-prefs/acct-prefs.html',
    "<div class=col-md-12 ng-controller=AcctPrefsCtrl></div>"
  );


  $templateCache.put('partial/dashboard/dashboard.html',
    "<div class=col-md-12 ng-controller=DashboardCtrl></div>"
  );


  $templateCache.put('partial/inventory/inventory.html',
    "<div class=col-md-12 ng-controller=InventoryCtrl></div>"
  );


  $templateCache.put('partial/manage/manage.html',
    "<div class=col-md-12 ng-controller=ManageCtrl></div>"
  );


  $templateCache.put('directive/accounting/accounting.html',
    "<div></div>"
  );


  $templateCache.put('directive/customer/customer.html',
    "<div></div>"
  );


  $templateCache.put('directive/employee/employee.html',
    "<div></div>"
  );


  $templateCache.put('directive/graph/graph.html',
    "<div></div>"
  );


  $templateCache.put('directive/reports/reports.html',
    "<div></div>"
  );


  $templateCache.put('directive/stock/stock.html',
    "<div></div>"
  );


  $templateCache.put('directive/supplier/supplier.html',
    "<div></div>"
  );

}]);
