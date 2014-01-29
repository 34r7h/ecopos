angular.module('ecoposshop', ['ui.bootstrap','ui.utils','ngRoute','ngAnimate', 'ecoposcommon']);

angular.module('ecoposshop').config(function($routeProvider) {

    $routeProvider.
    when('/testShopPartial',{templateUrl: 'partial/testShopPartial/testShopPartial.html'}).
	/* Add New Routes Above */
    otherwise({redirectTo:'/home'});

});



angular.module('ecoposshop').factory('shopTest',function() {

	var shopTest = {test: "Shop Module Working Service"};

	return shopTest;
});
angular.module('ecoposshop').controller('TestshoppartialCtrl',function($scope, commonTest){

$scope.commonTest = commonTest.test;

});
angular.module('ecoposshop').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('partial/testShopPartial/testShopPartial.html',
    "<div class=col-md-12 ng-controller=TestshoppartialCtrl>{{commonTest}}</div>"
  );

}]);
