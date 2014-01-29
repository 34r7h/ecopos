angular.module('ecoposShop', ['ui.bootstrap','ui.utils','ngRoute','ngAnimate', 'ecoposCommon']);

angular.module('ecoposShop').config(function($routeProvider) {

    $routeProvider.
    when('/testShopPartial',{templateUrl: 'partial/testShopPartial/testShopPartial.html'}).
	/* Add New Routes Above */
    otherwise({redirectTo:'/home'});

});



angular.module('ecoposShop').factory('shopTest',function() {

	var shopTest = {test: "Shop Module Working Service"};

	return shopTest;
});
angular.module('ecoposShop').controller('TestshoppartialCtrl',function($scope, commonTest){

$scope.commonTest = commonTest.test;

});
angular.module('ecoposShop').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('partial/testShopPartial/testShopPartial.html',
    "<div class=col-md-12 ng-controller=TestshoppartialCtrl>{{commonTest}}</div>"
  );

}]);
