angular.module('ecopos.common').directive('login', function(authority, $rootScope) {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'directive/login/login.html',
		link: function(scope, element, attrs, fn) {
      scope.test = $rootScope.DBFB.$child('love');

      scope.users = $rootScope.DBFB.$child('users');
      scope.user = null;
      scope.email = '';
      scope.password = '';
      scope.err = 'no errors.';

      scope.addUser = function(){
        if( !scope.email ) {
          scope.err = 'Please enter an email address';
        }
        else if( !scope.password ) {
          scope.err = 'Please enter a password';
        }
        else{
          authority.createUser(scope.email, scope.password, function(err, user){
            console.log('created user:'+user.id);
          });
        }
      };
		}
	};
});
