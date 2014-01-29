angular.module('ecopos.shop', ['ui.bootstrap','ui.utils','ngRoute','ngAnimate', 'ecopos.common']);

angular.module('ecopos.shop').config(function($routeProvider) {

    $routeProvider.
    when('/testShopPartial',{templateUrl: 'partial/testShopPartial/testShopPartial.html'}).
	/* Add New Routes Above */
    otherwise({redirectTo:'/home'});

});



angular.module('ecopos.shop').factory('shopTest',function() {

	var shopTest = {test: "Shop Module Working Service"};

	return shopTest;
});
angular.module('ecopos.shop').factory('updateCart',function() {

	var updateCart = {};

	return updateCart;
});
angular.module('ecopos.shop').factory('bins',function() {

	var bins = {};

	return bins;
});
angular.module('ecopos.shop').factory('purchaseOrders',function() {

	var purchaseOrders = {};

	return purchaseOrders;
});
angular.module('ecopos.shop').factory('specialOrders',function() {

	var specialOrders = {};

	return specialOrders;
});
angular.module('ecopos.shop').factory('payment',function() {

	var payment = {};

	return payment;
});
angular.module('ecopos.shop').directive('editCart', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {

		},
		templateUrl: 'directive/editCart/editCart.html',
		link: function(scope, element, attrs, fn) {


		}
	};
});

angular.module('ecopos.shop').directive('productList', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {

		},
		templateUrl: 'directive/productList/productList.html',
		link: function(scope, element, attrs, fn) {


		}
	};
});

angular.module('ecopos.shop').directive('productDetail', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {

		},
		templateUrl: 'directive/productDetail/productDetail.html',
		link: function(scope, element, attrs, fn) {


		}
	};
});

angular.module('ecopos.shop').filter('productsFilter', function() {
	return function(input,arg) {
		return 'output';
	};
});
angular.module('ecopos.shop').controller('TestshoppartialCtrl',function($scope, commonTest){

$scope.commonTest = commonTest.test;

});
angular.module('ecopos.shop').controller('CartCtrl',function($scope){


});
angular.module('ecopos.shop').controller('ProductCtrl',function($scope){


});
angular.module('ecopos.shop').controller('ProductsCtrl',function($scope){


});
angular.module('ecopos.shop').controller('CheckoutCtrl',function($scope){


});
angular.module('ecopos.shop').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('partial/cart/cart.html',
    "<div class=col-md-12 ng-controller=CartCtrl></div>"
  );


  $templateCache.put('partial/checkout/checkout.html',
    "<div class=col-md-12 ng-controller=CheckoutCtrl></div>"
  );


  $templateCache.put('partial/product/product.html',
    "<div class=col-md-12 ng-controller=ProductCtrl></div>"
  );


  $templateCache.put('partial/products/products.html',
    "<div class=col-md-12 ng-controller=ProductsCtrl></div>"
  );


  $templateCache.put('partial/testShopPartial/testShopPartial.html',
    "<div class=col-md-12 ng-controller=TestshoppartialCtrl>{{commonTest}}</div>"
  );


  $templateCache.put('directive/editCart/editCart.html',
    "<div></div>"
  );


  $templateCache.put('directive/productDetail/productDetail.html',
    "<div></div>"
  );


  $templateCache.put('directive/productList/productList.html',
    "<div></div>"
  );

}]);
