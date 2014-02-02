angular.module('ecopos.common').directive('notifications', function(notify, $rootScope) {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'directive/notifications/notifications.html',
		link: function(scope, element, attrs, fn) {
      scope.newNote = "something sweet";

      $rootScope.$on('$firebaseSimpleLogin:login', function(event){
      //  $rootScope.user = authority.getUserData();
        /** TODO: how do we wait
         *  for other $firebaseSimpleLogin:login
         *  event handlers to fire first
         *  specifically loading of $rootScope.user
         */
        scope.spoofNotes = $rootScope.DBFB.$child('notes/github:584954');
      });

      scope.addNote = function(){
        if(!!$rootScope.user && $rootScope.user.uid){
          notify.addNote($rootScope.user.uid, scope.newNote);
        }
        else{
          $rootScope.err = "Cannot add note, you are not logged in.";
        }
      };

      scope.spoofNote = function(){
        if(!$rootScope.user || $rootScope.user.uid !== 'github:584954'){
          notify.addNote('github:584954', scope.newNote);
        }
        else{
          $rootScope.err = "You can't fool yourself, man.";
        }
      };

		}
	};
});
