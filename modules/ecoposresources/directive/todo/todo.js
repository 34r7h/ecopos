angular.module('ecopos.resources').directive('todo', function() {
	return {
		restrict: 'E',
		replace: true,

		templateUrl: 'directive/todo/todo.html',
		link: function(scope, element, attrs, fn) {


		}
	};
});
