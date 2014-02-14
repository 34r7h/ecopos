angular.module('ecopos.common').directive('notifications', function($rootScope, ecoUser, messaging) {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'directive/notifications/notifications.html',
		link: function(scope, element, attrs, fn) {
      scope.user = ecoUser.getActiveUser();
      scope.newNote = "something sweet";
      scope.spoofNotes = messaging.getUserMessages('plong00');

      $rootScope.$on('ecoUser:newActiveUser', function(event, activeUser){
        scope.user = activeUser;
      });

      scope.addNote = function(){
        messaging.addNote(scope.user.$id, scope.newNote);
      };

		}
	};
});
