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
        scope:{},
		templateUrl: 'directive/cart/cart.html',
		link: function(scope, element, attrs, fn) {
            scope.modal = {tits:"tits", freeks: "fracks"};
            scope.cart = {
                buy: {
                    "Ukranian Cigar": {
                        img: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRNM-AHnM9EwisQDquKko8bL_VWxXCPKqmO-T0wpxbuuRhUEhXX3g",
                        price:32,
                        qty: {
                            num: 2,
                            unitCt: "piece"
                        }
                    },
                    "Used Kale": {
                        img: "",
                        price:42,
                        qty: {
                            num: 1.45,
                            unitCt: "lbs"
                        }
                    }
                }
            };

		}
	};
});

angular.module('ecopos.shop').directive('checkout', function() {
	return {
		restrict: 'E',
		replace: true,

		templateUrl: 'directive/checkout/checkout.html',
		link: function(scope, element, attrs, fn, $modal, $log, $modalInstance) {
            scope.modal = {
                "title": "Title",
                "content": "Hello Modal<br />This is a multiline message!"
            };

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

    this.items = {
        "Bambs": {
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9PCJdr841neSEWlCMR9lGqHfpnXan6e_UumoV4lmF3ykoI9BlYA",
            desc: "Need a friend. Want one now? Your Bambs awaits",
            price: 29

        },
        "Fambs": {
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9PCJdr841neSEWlCMR9lGqHfpnXan6e_UumoV4lmF3ykoI9BlYA",
            desc: "Need a friend. Want one now? Your Bambs awaits",
            price: 29

        },
        "Eambs": {
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9PCJdr841neSEWlCMR9lGqHfpnXan6e_UumoV4lmF3ykoI9BlYA",
            desc: "Need a friend. Want one now? Your Bambs awaits",
            price: 29

        },
        "Pambs": {
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9PCJdr841neSEWlCMR9lGqHfpnXan6e_UumoV4lmF3ykoI9BlYA",
            desc: "Need a friend. Want one now? Your Bambs awaits",
            price: 29

        },
        "Mambs": {
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9PCJdr841neSEWlCMR9lGqHfpnXan6e_UumoV4lmF3ykoI9BlYA",
            desc: "Need a friend. Want one now? Your Bambs awaits",
            price: 29

        },
        " ambs": {
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9PCJdr841neSEWlCMR9lGqHfpnXan6e_UumoV4lmF3ykoI9BlYA",
            desc: "Need a friend. Want one now? Your Bambs awaits",
            price: 29

        }
    };


});
angular.module('ecopos.shop').controller('SunshineCtrl',function($scope){


});
angular.module('ecopos.shop').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('partial/cafe/cafe.html',
    "<div class=col-md-12 ng-controller=\"CafeCtrl as cafe\"><h3>Cafe Partial</h3><div class=row><div class=\"col-lg-8 panel panel-default\"><div class=row><product-list></product-list><product-detail></product-detail></div></div><div class=\"col-lg-4 panel panel-default\"><cart></cart><edit-cart></edit-cart><checkout></checkout></div></div></div>"
  );


  $templateCache.put('partial/sunshine/sunshine.html',
    "<div class=col-md-12 ng-controller=SunshineCtrl><h3>Sunshine Partial</h3><div class=row><div class=\"col-lg-8 panel panel-default\"><product-list></product-list><product-detail></product-detail></div><div class=\"col-lg-4 panel panel-default\"><cart></cart><edit-cart></edit-cart><checkout></checkout></div></div></div>"
  );


  $templateCache.put('directive/cart/cart.html',
    "<div><h4>Cart Directive</h4><div ng-repeat=\"(key, item) in cart.buy\"><div><table ng-table=tableParams class=table><tr><td data-title=Products>{{key}}</td><td data-title=\"'Quantity'\">{{item.qty.num+item.qty.unitCt}}</td><td data-title=\"'Price'\">{{item.price}}</td></tr></table></div></div><table ng-table=tableParams class=table><tr><td data-title=Coupons>{{key}}</td><td data-title=\"'Adjustments'\">{{item.qty.num+item.qty.unitCt}}</td><td data-title=\"'Total'\">{{item.price}}</td></tr></table><button type=button class=\"btn btn-lg btn-primary\" data-animation=am-fade-and-scale data-placement=center bs-modal=modal>Click to toggle modal<br><small>(using an object)</small></button></div>"
  );


  $templateCache.put('directive/checkout/checkout.html',
    "<div><h4>Checkout Directive</h4>{{bins}}, {{payment}}, {{purchaseOrders}}, {{specialOrders}}, {{updateCart}}<div class=modal-header><h3>I'm a modal!</h3></div><div class=modal-body><ul><li ng-repeat=\"item in items\"><a ng-click=\"selected.item = item\">{{ item }}</a></li></ul>Selected: <b>{{ selected.item }}</b></div><div class=modal-footer><button class=\"btn btn-primary\" ng-click=ok()>OK</button> <button class=\"btn btn-warning\" ng-click=cancel()>Cancel</button></div></div>"
  );


  $templateCache.put('directive/editCart/editCart.html',
    "<div><h4>Edit Cart Directive</h4>{{bins}}, {{payment}}, {{purchaseOrders}}, {{specialOrders}}, {{updateCart}}</div>"
  );


  $templateCache.put('directive/productDetail/productDetail.html',
    "<div><h4>Product Detail Directive</h4>{{bins}}, {{payment}}, {{purchaseOrders}}, {{specialOrders}}, {{updateCart}}</div>"
  );


  $templateCache.put('directive/productList/productList.html',
    "<div><div ng-repeat=\"(key, item) in cafe.items\" class=col-lg-4 ng-class=\"{'col-lg-12': itemDetail, 'col-lg-4': itemList}\"><a ng-href=# class=\"panel panel-default\" ng-click=$parent.itemDetail><div class=panel-body><img ng-src={{item.img}} width=100% height=auto></div><div class=panel-heading><h3 class=panel-title>{{key}}!</h3></div><div class=panel-body>{{item.desc}} for just ${{item.price}}.</div></a></div><h4>Product List Directive</h4><p>{{bins}}, {{payment}}, {{purchaseOrders}}, {{specialOrders}}, {{updateCart}}</p><div>Let's see what we can load.<p>{{ testData }}</p></div></div>"
  );

}]);
