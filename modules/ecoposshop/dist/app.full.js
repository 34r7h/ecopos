angular.module('ecopos.shop', ['ui.bootstrap','ui.utils','ngRoute','ngAnimate', 'ecopos.common']);

angular.module('ecopos.shop').config(function($routeProvider) {

    $routeProvider.
    when('/testShopPartial',{templateUrl: 'partial/testShopPartial/testShopPartial.html'});

});



angular.module('ecopos.shop').factory('shopTest',function($q, $timeout) {
  var testData = null;

	var shopTest = {
    test: "Shop Module Working Service",
    getTestData: function(){
      return testData;
    },
    refreshTestData: function(){
      var d = $q.defer();
      $timeout(function() {
        d.resolve('a simple resolution');
      }, 2000);
      return d.promise;
    }
  };

	return shopTest;
});
angular.module('ecopos.shop').factory('updateCart',function() {

	var updateCart = {test:"Update Cart Service"};

	return updateCart;
});
angular.module('ecopos.shop').factory('bins',function() {

	var bins = {test:"Bin Service"};

	return bins;
});
angular.module('ecopos.shop').factory('purchaseOrders',function() {

	var purchaseOrders = {test:"purchase Order Service"};

	return purchaseOrders;
});
angular.module('ecopos.shop').factory('specialOrders',function() {

	var specialOrders = {test:"Special Order Service"};

	return specialOrders;
});
angular.module('ecopos.shop').factory('payment',function() {

	var payment = {test: "Payment Service"};

	return payment;
});
angular.module('ecopos.shop').directive('editCart', function() {
	return {
		restrict: 'E',
		replace: true,

		templateUrl: 'directive/editCart/editCart.html',
		link: function(scope, element, attrs, fn) {


		}
	};
});

angular.module('ecopos.shop').directive('productList', function() {
	return {
		restrict: 'E',
		replace: true,

		templateUrl: 'directive/productList/productList.html',
		link: function(scope, element, attrs, fn) {
		}
	};
});

angular.module('ecopos.shop').directive('productDetail', function() {
	return {
		restrict: 'E',
		replace: true,

		templateUrl: 'directive/productDetail/productDetail.html',
		link: function(scope, element, attrs, fn) {


		}
	};
});

angular.module('ecopos.shop').directive('cart', function() {
	return {
		restrict: 'E',
		replace: true,

		templateUrl: 'directive/cart/cart.html',
		link: function(scope, element, attrs, fn) {


		}
	};
});

angular.module('ecopos.shop').directive('checkout', function() {
	return {
		restrict: 'E',
		replace: true,

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
angular.module('ecopos.shop').controller('CafeCtrl',function($scope, bins, payment, purchaseOrders, specialOrders, updateCart){
    $scope.bins = bins.test;
    $scope.payment = payment.test;
    $scope.purchaseOrders = purchaseOrders.test;
    $scope.specialOrders = specialOrders.test;
    $scope.updateCart = updateCart.test;


});
angular.module('ecopos.shop').controller('SunshineCtrl',function($scope){


});
angular.module('ecopos.shop').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('partial/cafe/cafe.html',
    "<div class=col-md-12 ng-controller=CafeCtrl><h3>Cafe Partial</h3><div class=row><div class=\"col-lg-8 panel panel-default\"><product-list></product-list><product-detail></product-detail></div><div class=\"col-lg-4 panel panel-default\"><cart></cart><edit-cart></edit-cart><checkout></checkout></div></div></div>"
  );


  $templateCache.put('partial/sunshine/sunshine.html',
    "<div class=col-md-12 ng-controller=SunshineCtrl><h3>Sunshine Partial</h3><div class=row><div class=\"col-lg-8 panel panel-default\"><product-list></product-list><product-detail></product-detail></div><div class=\"col-lg-4 panel panel-default\"><cart></cart><edit-cart></edit-cart><checkout></checkout></div></div></div>"
  );


  $templateCache.put('directive/cart/cart.html',
    "<div><h4>Cart Directive</h4>{{bins}}, {{payment}}, {{purchaseOrders}}, {{specialOrders}}, {{updateCart}}</div>"
  );


  $templateCache.put('directive/checkout/checkout.html',
    "<div><h4>Checkout Directive</h4>{{bins}}, {{payment}}, {{purchaseOrders}}, {{specialOrders}}, {{updateCart}}</div>"
  );


  $templateCache.put('directive/editCart/editCart.html',
    "<div><h4>Edit Cart Directive</h4>{{bins}}, {{payment}}, {{purchaseOrders}}, {{specialOrders}}, {{updateCart}}</div>"
  );


  $templateCache.put('directive/productDetail/productDetail.html',
    "<div><h4>Product Detail Directive</h4>{{bins}}, {{payment}}, {{purchaseOrders}}, {{specialOrders}}, {{updateCart}}</div>"
  );


  $templateCache.put('directive/productList/productList.html',
    "<div><h4>Product List Directive</h4><p>{{bins}}, {{payment}}, {{purchaseOrders}}, {{specialOrders}}, {{updateCart}}</p><div>Let's see what we can load.<p>{{ testData }}</p></div></div>"
  );

}]);
