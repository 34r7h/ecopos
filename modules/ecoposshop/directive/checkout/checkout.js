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
