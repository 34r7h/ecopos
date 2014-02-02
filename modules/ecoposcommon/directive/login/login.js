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

      scope.$on('$firebaseSimpleLogin:logout', function(event){
        scope.user = authority.getUserData();
      });

      scope.addUser = function(){
        if( !scope.email ) {
          scope.err = 'Please enter an email address';
        }
        else if( !scope.password ) {
          scope.err = 'Please enter a password';
        }
        else{
          authority.createUser(scope.email, scope.password, function(err, user){
            if(err){
              //scope.err = err.toString();
              scope.err = err.message;
              // switch(scope.err.code)
            }
            else if(user){
              console.log('created user:'+user.id);
            }
            else{
              scope.err = 'Unknown error (Add user)';
            }

          });
        }
      };

      scope.login = function(){
        if( !scope.email ) {
          scope.err = 'Please enter an email address';
        }
        else if( !scope.password ) {
          scope.err = 'Please enter a password';
        }
        else{
          authority.authUser(scope.email, scope.password, function(err, user){
            if(err){
              scope.err = err.message;
            }
            else if(user){
              scope.user = authority.getUserData();
            }
            else{
              scope.err = 'Unknown error (Authentication)';
            }
          });
        }
      };

      scope.logout = function(){
        authority.logout();
      };

      scope.loginFacebook = function(){
        authority.authFacebook(function(err, user){
          if(err){
            scope.err = err.message;
          }
          else if(user){
            scope.user = authority.getUserData();
          }
          else{
            scope.err = 'Unknown error (Facebook)';
          }
        });
      };

      scope.loginTwitter = function(){
        authority.authTwitter(function(err, user){
          if(err){
            scope.err = err.message;
          }
          else if(user){
            scope.user = authority.getUserData();
          }
          else{
            scope.err = 'Unknown error (Twitter)';
          }
        });
      };

      scope.loginGitHub = function(){
        authority.authGitHub(function(err, user){
          if(err){
            scope.err = err.message;
          }
          else if(user){
            scope.user = authority.getUserData();
          }
          else{
            scope.err = 'Unknown error (GitHub)';
          }
        });
      };

		}
	};
});
