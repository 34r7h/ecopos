angular.module('ecopos.admin', ['ui.bootstrap','ui.utils','ngRoute','ngAnimate']);

angular.module('ecopos.admin').config(function($routeProvider) {

    $routeProvider.
	when('/dashtest',{templateUrl: 'partial/dashTest/dashTest.html'});
	/* Add New Routes Above */


});

angular.module('ecopos.admin').factory('adminTest',function() {

	var adminTest = {test: "Admin Module Working Service"};

	return adminTest;
});
angular.module('ecopos.admin').factory('money',function() {

	var money = {test:"Money Service WhooHOOOO!!"};

	return money;
});
angular.module('ecopos.admin').factory('confirmPO',function() {

	var confirmPO = {test: "Confirm Purchase Order Service"};

	return confirmPO;
});
angular.module('ecopos.admin').factory('editEmployee',function() {

	var editEmployee = {test:"Edit Employee Service"};

	return editEmployee;
});
angular.module('ecopos.admin').factory('editSupplier',function() {

	var editSupplier = {test:"Edit Supplier Service"};

	return editSupplier;
});
angular.module('ecopos.admin').factory('editCustomer',function() {

	var editCustomer = {test:"Edit Customer Service"};

	return editCustomer;
});
angular.module('ecopos.admin').factory('editStore',function() {

	var editStore = {test:"Edit Store Service"};

	return editStore;
});
angular.module('ecopos.admin').factory('fairTrade',function() {

	var fairTrade = {test:"Fair Trade Service"};

	return fairTrade;
});
angular.module('ecopos.admin').directive('accounting', function() {
	return {
		restrict: '[E,A]',
		replace: true,

		templateUrl: 'directive/accounting/accounting.html',
		link: function(scope, element, attrs, fn) {


		}
	};
});

angular.module('ecopos.admin').directive('reports', function() {
	return {
		restrict: 'E',
		replace: true,

		templateUrl: 'directive/reports/reports.html',
		link: function(scope, element, attrs, fn) {


		}
	};
});

angular.module('ecopos.admin').directive('employee', function() {
	return {
		restrict: 'E',
		replace: true,

		templateUrl: 'directive/employee/employee.html',
		link: function(scope, element, attrs, fn) {


		}
	};
});

angular.module('ecopos.admin').directive('customer', function() {
	return {
		restrict: 'E',
		replace: true,

		templateUrl: 'directive/customer/customer.html',
		link: function(scope, element, attrs, fn) {


		}
	};
});

angular.module('ecopos.admin').directive('supplier', function() {
	return {
		restrict: 'E',
		replace: true,

		templateUrl: 'directive/supplier/supplier.html',
		link: function(scope, element, attrs, fn) {


		}
	};
});

angular.module('ecopos.admin').directive('stock', function() {
	return {
		restrict: 'E',
		replace: true,

		templateUrl: 'directive/stock/stock.html',
		link: function(scope, element, attrs, fn) {


		}
	};
});

angular.module('ecopos.admin').directive('graph', function() {
	return {
		restrict: 'E',
		replace: true,

		templateUrl: 'directive/graph/graph.html',
		link: function(scope, element, attrs, fn) {
            console.log("Graph Link Function");

		}
	};
});

angular.module('ecopos.admin').controller('ManageCtrl',function($scope){


});
angular.module('ecopos.admin').controller('InventoryCtrl',function($scope){


});
angular.module('ecopos.admin').controller('AcctPrefsCtrl',function($scope){


});
angular.module('ecopos.admin').controller('DashtestCtrl',function($scope){


});
angular.module('ecopos.admin').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('partial/acct-prefs/acct-prefs.html',
    "<div class=col-md-12 ng-controller=AcctPrefsCtrl><h3>Account and Preferences Partial</h3><customer></customer><employee></employee><supplier></supplier></div>"
  );


  $templateCache.put('partial/dashTest/dashTest.html',
    "<div class=col-md-12 ng-controller=DashtestCtrl><p>≈We're at Test Dash! Home to the following directives:</p><accounting></accounting><customer></customer><employee></employee><graph></graph><reports></reports><stock></stock><supplier></supplier></div>"
  );


  $templateCache.put('partial/inventory/inventory.html',
    "<div class=col-md-12 ng-controller=InventoryCtrl><h3>Inventory Partial</h3><stock></stock></div>"
  );


  $templateCache.put('partial/manage/manage.html',
    "<div class=col-md-12 ng-controller=ManageCtrl><h3>Store Management</h3><div class=row><div class=col-lg-6><accounting></accounting><graph></graph><reports></reports><stock></stock></div><div class=col-lg-6><customer></customer><employee></employee><supplier></supplier></div></div></div>"
  );


  $templateCache.put('directive/accounting/accounting.html',
    "<div class=panel><h4>Accounting Directive</h4>{{money}}, {{fairTrade}}</div>"
  );


  $templateCache.put('directive/customer/customer.html',
    "<div><h4>Customer Directive</h4>{{editCustomer}}, {{fairTrade}}, {{money}}</div>"
  );


  $templateCache.put('directive/employee/employee.html',
    "<div><h4>Employee Directive</h4>{{editEmployee}}, {{fairTrade}}, {{money}}</div>"
  );


  $templateCache.put('directive/graph/graph.html',
    "<div><h4>Graph Directive</h4></div>"
  );


  $templateCache.put('directive/reports/reports.html',
    "<div><h4>Reports Directive</h4></div>"
  );


  $templateCache.put('directive/stock/stock.html',
    "<div><h4>Stock Directive</h4>{{fairTrade}}</div>"
  );


  $templateCache.put('directive/supplier/supplier.html',
    "<div><h4>Supplier Directive</h4>{{editSupplier}}, {{fairTrade}}, {{money}}</div>"
  );

}]);
