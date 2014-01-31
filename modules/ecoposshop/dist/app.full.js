angular.module('ecopos.shop', ['ui.bootstrap','ui.utils','ngRoute','ngAnimate', 'ecopos.common']);

angular.module('ecopos.shop').config(function($routeProvider) {

    $routeProvider.
    when('/testShopPartial',{templateUrl: 'partial/testShopPartial/testShopPartial.html'});

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

angular.module('ecopos.shop').directive('cart', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {

		},
		templateUrl: 'directive/cart/cart.html',
		link: function(scope, element, attrs, fn) {


		}
	};
});

angular.module('ecopos.shop').directive('checkout', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {

		},
		templateUrl: 'directive/checkout/checkout.html',
		link: function(scope, element, attrs, fn) {


		}
	};
});

angular.module('ecopos.shop').filter('productsFilter', function() {
	return function(input,arg) {
		return 'output';
	};
});
angular.module('ecopos.shop').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('directive/cart/cart.html',
    "<div>Cart Directive</div>"
  );


  $templateCache.put('directive/checkout/checkout.html',
    "<div>Checkout Directive</div>"
  );


  $templateCache.put('directive/editCart/editCart.html',
    "<div>Edit Cart Directive</div>"
  );


  $templateCache.put('directive/productDetail/productDetail.html',
    "<div>Product Detail Directive</div>"
  );


  $templateCache.put('directive/productList/productList.html',
    "<div>Product List Directive</div>"
  );

}]);
