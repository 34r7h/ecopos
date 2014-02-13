angular.module('ecopos.common').directive('notifications', function($rootScope, ecoUser, messaging) {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'directive/notifications/notifications.html',
		link: function(scope, element, attrs, fn) {
      scope.activeUser = ecoUser.getActiveUser();

      scope.newNote = "something sweet";

      scope.spoofNotes = messaging.getUserMessages('plong00');

      scope.addNote = function(){
        console.log('who is:'+scope.activeUser.username+':'+scope.activeUser.displayName+':');
        //messaging.addNote(scope.user.username, scope.newNote);
      };

		}
	};
});
