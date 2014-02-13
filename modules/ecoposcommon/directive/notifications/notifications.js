angular.module('ecopos.common').directive('notifications', function($rootScope, messaging) {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'directive/notifications/notifications.html',
		link: function(scope, element, attrs, fn) {
      scope.newNote = "something sweet";

      scope.spoofNotes = messaging.getUserMessages('plong00');

      scope.addNote = function(){
        console.log('who is:'+$rootScope.user.username+':');
        //messaging.addNote(scope.user.username, scope.newNote);
      };

		}
	};
});
