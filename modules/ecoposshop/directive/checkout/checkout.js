angular.module('ecopos.shop').directive('checkout', function() {
	return {
		restrict: 'E',
		replace: true,

		templateUrl: 'directive/checkout/checkout.html',
		link: function(scope, element, attrs, fn) {


		}
	};
});
