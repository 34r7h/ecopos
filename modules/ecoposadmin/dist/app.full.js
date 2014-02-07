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

    this.inventory = {
        "Banana": {
            variations:{
                locallyGrown: {
                    stock: 200,
                    unit: "lbs",
                    price: 0.79,
                    suppliers:{
                        "Banana Manna":{
                            "Cost":0.20,
                            "Order Number": 34652
                        }
                    },
                    autoOrder:50,
                    minOrder:250,
                    category: "Fruit",
                    taxRate:1
                }
            },
            tags: ["fruit", "potassium"],
            "Description":"Like avocado, only whiter and sweeter"

        },
        "Milk": {
            variations: {
                "1%": {
                    stock: 5,
                    ctType: "ltr",
                    price: 4,
                    suppliers:{
                        "Cow":{
                            "Cost":0.20,
                            "Order Number": 34652
                        },
                        "Goat":{
                            "Cost":4,
                            "Order Number": 064
                        }
                    },
                    autoOrder:50,
                    minOrder:250,
                    tags: ["lactose", "grandma"],
                    category: "Dairy",
                    taxRate:1
                },
                "18%": {
                    stock: 9,
                    ctType: "ltr",
                    price: 5,
                    "Description":"Like avocado, only whiter and sweeter",
                    suppliers:{
                        "Cow":{
                            "Cost":0.20,
                            "Order Number": 54269
                        },
                        "Goat":{
                            "Cost":4,
                            "Order Number": 34652
                        }
                    },
                    autoOrder:50,
                    minOrder:250,
                    tags: ["lactose", "mom"],
                    category: "Dairy",
                    taxRate:1
                }
            },
            tags: ["lactose", "mom"],
            "Description":"Thin stuff"
        }
    };

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
    "<div class=col-md-12 ng-controller=\"InventoryCtrl as stock\"><h3>Inventory Partial</h3><stock></stock></div>"
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
    "<div><h4>Graph Directive</h4><nvd3-line-chart data=exampleData showxaxis=true showyaxis=true tooltips=true interactive=true></nvd3-line-chart></div>"
  );


  $templateCache.put('directive/reports/reports.html',
    "<div><h4>Reports Directive</h4><table ng-table=tableParams class=table><tr ng-repeat=\"user in $data\"><td data-title=\"'Name'\">{{user.name}}</td><td data-title=\"'Age'\">{{user.age}}</td></tr></table></div>"
  );


  $templateCache.put('directive/stock/stock.html',
    "<div><h4>Stock Directive</h4>{{fairTrade}}<div><div ng-repeat=\"(key, item) in stock.inventory\" ng-init=\"ikey=key\"><div><table ng-table=tableParams class=table><tr ng-repeat=\"(key,variation) in item.variations\" ng-init=\"vkey = key\"><td data-title=ikey>{{vkey}}</td><td data-title=\"'Price'\">{{variation.price}}</td><td data-title=\"'In Stock'\">{{variation.stock}}{{variation.unit}}</td></tr></table>Description: <span><i>{{item.Description}}</i></span><br>Tags: <span ng-repeat=\"tag in item.tags\"><b>{{tag}},</b></span></div></div></div></div>"
  );


  $templateCache.put('directive/supplier/supplier.html',
    "<div><h4>Supplier Directive</h4>{{editSupplier}}, {{fairTrade}}, {{money}}</div>"
  );

}]);
