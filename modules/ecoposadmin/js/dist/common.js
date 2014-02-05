angular.module('ecopos.common', ['ui.bootstrap','ui.utils','ngRoute','ngAnimate']);

angular.module('ecopos.common').config(function() {



});
angular.module('ecopos.common').factory('commonTest',function() {

	var commonTest = {test: "Common Module Service Test OK!!"};

	return commonTest;
});
angular.module('ecopos.common').factory('notify',function($rootScope) {

	var notify = {
    addNote: function(uid, note){
      var notes = $rootScope.DBFB.$child('notes');
      notes.$child(uid).$add({'note': note});
    }
  };

	return notify;
});
angular.module('ecopos.common').factory('authority',function($rootScope, $firebaseSimpleLogin) {
  var auth = $firebaseSimpleLogin($rootScope.DBFBref);

	var authority = {
    createUser: function(email, password, callback){

      auth.$createUser(email, password, true).then(
          function(user){
            if(callback){
              callback(null, user);
            }
          },
          function(error){
            if(callback){
              callback(error, null);
            }
          }
      );
    },
    authUser: function(email, password, callback){
      auth.$login('password', {email: email, password: password}).then(
          function(user){
            console.log('Logged in as: '+ user.uid);
            if(callback){
              callback(null, user);
            }
          },
          function(error){
            console.log('Login failed: '+ error);
            if(callback){
              callback(error, null);
            }
          }
      );
    },
    authFacebook: function(callback){
      auth.$login('facebook').then(
          function(user){
            console.log('Logged in via Facebook as: '+ user.uid);
            if(callback){
              callback(null, user);
            }
          },
          function(error){
            console.log('Login via Facebook failed: '+ error);
            if(callback){
              callback(error, null);
            }
          }
      );
    },
    authTwitter: function(callback){
      auth.$login('twitter').then(
          function(user){
            //console.log('Logged in via Twitter as: '+ user.uid);
            if(callback){
              callback(null, user);
            }
          },
          function(error){
            //console.log('Login via Twitter failed: '+ error);
            if(callback){
              callback(error, null);
            }
          }
      );
    },
    authGitHub: function(callback){
      auth.$login('github').then(
          function(user){
            console.log('Logged in via GitHub as: '+ user.uid);
            if(callback){
              callback(null, user);
            }
          },
          function(error){
            console.log('Login via GitHub failed: '+ error);
            if(callback){
              callback(error, null);
            }
          }
      );
    },
    logout: function(){
      auth.$logout();
    },
    getUserData: function(){
      var userData = {};

      if(auth.user && auth.user.id){
        userData = {
          provider: auth.user.provider,
          id: auth.user.id,
          uid: auth.user.uid,
          authToken: auth.user.firebaseAuthToken
        };

        if(auth.user.provider === 'password'){
          userData.loginService = 'User Account';
          userData.username = auth.user.email;
          userData.email = auth.user.email;
          userData.displayName = auth.user.email;
        }
        else if(auth.user.provider === 'facebook'){
          userData.loginService = 'Facebook';
          userData.username = auth.user.username;
          userData.email = auth.user.email;
          userData.displayName = auth.user.displayName;
        }
        else if(auth.user.provider === 'twitter'){
          userData.loginService = 'Twitter';
          userData.username = auth.user.username;
          userData.email = auth.user.email;
          userData.displayName = auth.user.displayName;
        }
        else if(auth.user.provider === 'github'){
          userData.loginService = 'GitHub';
          userData.username = auth.user.username;
          userData.email = auth.user.email;
          userData.displayName = (auth.user.displayName?auth.user.displayName:auth.user.username);
        }

        if(userData.uid){
          userData.notes = $rootScope.DBFB.$child('notes/'+userData.uid);
        }
      }

      return userData;
    }
  };

	return authority;
});
angular.module('ecopos.common').factory('messaging',function() {

	var messaging = {};

	return messaging;
});
angular.module('ecopos.common').factory('DBfirebase',function() {

	var DBfirebase = {};

	return DBfirebase;
});
angular.module('ecopos.common').factory('DBappEngine',function() {

	var DBappEngine = {};

	return DBappEngine;
});
angular.module('ecopos.common').factory('social',function() {

	var social = {};

	return social;
});
angular.module('ecopos.common').directive('sharing', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {

		},
		templateUrl: 'directive/sharing/sharing.html',
		link: function(scope, element, attrs, fn) {


		}
	};
});

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


      $rootScope.$on('$firebaseSimpleLogin:login', function(event){
        $rootScope.user = authority.getUserData();
      });
      $rootScope.$on('$firebaseSimpleLogin:logout', function(event){
        $rootScope.user = authority.getUserData();
      });

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

angular.module('ecopos.common').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('directive/login/login.html',
    "<div><div class=user-block data-ng-show=user.uid><span data-ng-show=user.displayName>Logged in as: {{ user.displayName }}<span data-ng-show=user.loginService>&nbsp;via {{ user.loginService }}</span><span data-ng-show=user.id>&nbsp;(#{{ user.id }})</span></span><div><input type=button value=Logout ng-click=logout()></div></div><div class=register-block><h3>Register</h3><div><label for=email>Email:</label><input name=email id=email data-ng-model=email></div><div><label for=password>Password:</label><input type=password name=password id=password data-ng-model=password></div><div><label for=passwordConfirm>Confirm password:</label><input type=password name=passwordConfirm id=passwordConfirm data-ng-model=passwordConfirm></div><div><input type=button value=\"Create User\" ng-click=addUser()></div></div><div class=login-block><h3>Login</h3><div><label for=email>Email:</label><input name=email id=email data-ng-model=email></div><div><label for=password>Password:</label><input type=password name=password id=password data-ng-model=password></div><div><input type=button value=Login ng-click=login()></div><div><input type=button value=\"Login with Facebook\" ng-click=loginFacebook()></div><div><input type=button value=\"Login with Twitter\" ng-click=loginTwitter()></div><div><input type=button value=\"Login with GitHub\" ng-click=loginGitHub()></div></div></div>"
  );


  $templateCache.put('directive/notifications/notifications.html',
    "<div>notifications<div class=user-notifications data-ng-show=user.uid><ul><li data-ng-repeat=\"n in user.notes\">{{ n.note }}</li></ul><h4>spoofable?</h4><ul><li data-ng-repeat=\"s in spoofNotes\">{{ s.note }}</li></ul><div><input data-ng-model=newNote><input type=button value=\"Add Note\" ng-click=addNote()><input type=button value=\"Spoof Note\" ng-click=spoofNote()></div></div></div>"
  );


  $templateCache.put('directive/sharing/sharing.html',
    "<div></div>"
  );

}]);
