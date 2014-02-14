angular.module('ecopos.common').directive('login', function(authority, ecoUser, $rootScope, $firebase, $q) {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'directive/login/login.html',
		link: function(scope, element, attrs, fn) {
      // TODO: these should be somewhere else...
      $rootScope.err = 'no errors.';
      $rootScope.regState = authority.REGSTATE.CLEAR;

      scope.user = null; //ecoUser.getActiveUser();
      scope.email = '';
      scope.password = '';

      $rootScope.$on('ecoUser:newActiveUser', function(event, activeUser){
        scope.user = activeUser;
      });

      // TODO: test function, remember to clean up
      scope.loadTestData = function(){
        var testData = $firebase($rootScope.DBFBref.child('test')); //$rootScope.DBFB.$child('test');
        testData.$on("loaded", function(){
          console.log('testData:'+JSON.stringify(testData));
        });

        var badTouch = $rootScope.DBFBref.child('user/plong0').once('value', function(snap){
          console.log('o rly?<o.O>++++++++)))))))>>>>>>'+JSON.stringify(snap.val())+'.,\'^^^.*.^^^*.*^^^.*.^^^*.*^^^.*.^^^\',.');
        },
        function(err){
          console.log(')<(o,0)>(0o-|'+err+'|-o0');
        });
      };

      scope.startRegistration = function(){
        authority.startRegistration();
      };
      scope.completeRegistration = function(){

        if(scope.username){
          authority.validateUsername(scope.username).then(function(valid){
            if(valid){
              $rootScope.username = scope.username;
              authority.completeRegistration();
            }
            else{
              // invalid username should be handled by the reject (err function)
            }
          },
          function(err){
            console.log('invalid username:'+err);
          });
        }
        else{
          $rootScope.err = 'Please enter a username';
        }
      };

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
            }
            else{
              $rootScope.err = 'Unknown error (Add user)';
            }

          });
        }
      };

      scope.saveUser = function(){
        scope.user.$save();
        //ecoUser.saveActiveUserData();
      };

      scope.login = function(){
        if( !scope.email ) {
          $rootScope.err = 'Please enter an email address';
        }
        else if( !scope.password ) {
          $rootScope.err = 'Please enter a password';
        }
        else{
          // TODO: these callbacks on authority.auth* are not necessary if we use ecoUser events
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
