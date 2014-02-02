angular.module('ecopos.common').directive('notifications', function(notify, $rootScope) {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'directive/notifications/notifications.html',
		link: function(scope, element, attrs, fn) {
      scope.newNote = "something sweet";

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
