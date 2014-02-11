angular.module('ecopos.common').directive('login', function(authority, $rootScope) {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'directive/login/login.html',
		link: function(scope, element, attrs, fn) {
      $rootScope.user = null;
      $rootScope.err = 'no errors.';

      scope.email = '';
      scope.password = '';

      scope.addUser = function(){
        if( !scope.email ) {
          $rootScope.err = 'Please enter an email address';
        }
        else if( !scope.password ) {
          $rootScope.err = 'Please enter a password';
        }
        else{
          authority.createUser(scope.email, scope.password, function(err, user){
            if(err){
              $rootScope.err = err.message;
            }
            else if(user){
              // TODO: visual notify of user creation
              console.log('created user:'+user.id);
            }
            else{
              $rootScope.err = 'Unknown error (Add user)';
            }

          });
        }
      };

      scope.login = function(){
        if( !scope.email ) {
          $rootScope.err = 'Please enter an email address';
        }
        else if( !scope.password ) {
          $rootScope.err = 'Please enter a password';
        }
        else{
          authority.authUser(scope.email, scope.password, function(err, user){
            if(err){
              $rootScope.err = err.message;
            }
            else if(user){}
            else{
              $rootScope.err = 'Unknown error (Authentication)';
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
            $rootScope.err = err.message;
          }
          else if(user){}
          else{
            $rootScope.err = 'Unknown error (Facebook)';
          }
        });
      };

      scope.loginTwitter = function(){
        authority.authTwitter(function(err, user){
          if(err){
            $rootScope.err = err.message;
          }
          else if(user){}
          else{
            $rootScope.err = 'Unknown error (Twitter)';
          }
        });
      };

      scope.loginGitHub = function(){
        authority.authGitHub(function(err, user){
          if(err){
            $rootScope.err = err.message;
          }
          else if(user){}
          else{
            $rootScope.err = 'Unknown error (GitHub)';
          }
        });
      };

		}
	};
});
