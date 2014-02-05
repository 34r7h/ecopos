angular.module('ecopos.admin').directive('accounting', function() {
	return {
		restrict: '[E,A]',
		replace: true,

		templateUrl: 'directive/accounting/accounting.html',
		link: function(scope, element, attrs, fn) {


		}
	};
});
