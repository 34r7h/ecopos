angular.module('ecopos.admin').directive('employee', function() {
	return {
		restrict: 'E',
		replace: true,

		templateUrl: 'directive/employee/employee.html',
		link: function(scope, element, attrs, fn) {


		}
	};
});
