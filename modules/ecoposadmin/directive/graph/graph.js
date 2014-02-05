angular.module('ecopos.admin').directive('graph', function() {
	return {
		restrict: 'E',
		replace: true,

		templateUrl: 'directive/graph/graph.html',
		link: function(scope, element, attrs, fn) {
            console.log("Graph Link Function");

		}
	};
});
