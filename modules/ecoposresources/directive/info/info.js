angular.module('ecopos.resources').directive('info', function() {
	return {
		restrict: 'E',
		replace: true,

		templateUrl: 'directive/info/info.html',
		link: function(scope, element, attrs, fn) {


		}
	};
});
