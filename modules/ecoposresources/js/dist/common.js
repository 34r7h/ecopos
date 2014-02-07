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
angular.module('ecopos.common').factory('authority',function($rootScope, $firebaseSimpleLogin, $q) {
  var auth = $firebaseSimpleLogin($rootScope.DBFBref);

	var authority = {
    getUserByUID: function(uid){
      var d = $q.defer();

      // first, try to load the linkedAccount by its uid
      $rootScope.DBFBref.child('linkedAccount/'+uid).
          once('value',
          function(linkedSnap){
            var linkedVal = linkedSnap.val();
            if(linkedVal){
              // we found the linkedAccount record for uid
              $rootScope.DBFBref.child('user/'+linkedVal.userID).
                  once('value',
                  function(userSnap){
                    d.resolve(userSnap.val());
                  },
                  function(err){
                    d.reject('error loading user profile:'+err);
                  });
            }
            else{
              // could not load the linkedAccount
              d.resolve(null);
            }
          },
          function(err){
            d.reject('error loading linked:'+err);
          }
      );
      //"simplelogin:3","github:584954","facebook:304703258"

      return d.promise;
    },
    saveUserData: function(data){
      // to avoid accidentally duplicating a user, data.userID must be explicitly set
      if(data.userID === undefined){ return; } // for a new user, use data.userID = null

      var dbUserRef = $rootScope.DBFBref.child('user');

      // create a new user profile if no userID given
      if(data.userID === null){ data.userID = dbUserRef.push().name(); }

      // handle linking with accounts
      if(data.uid){
        if(!(data.uid instanceof Array)){ data.uid = [data.uid]; } // make it an array

        var linkBools = {};

        // handle every uid we've been told to link with
        $.each(data.uid, function(key, uid){
          // break apart the uid to discover its provider and id
          var uidParts = uid.split(':', 2);
          var cProv = 'unknown';
          var cId = 0;
          if(uidParts.length === 2){
            cProv = uidParts[0];
            cId = uidParts[1];
          }

          // associate this account with userID
          var cLinkAccount = $rootScope.DBFBref.child('linkedAccount/'+uid);
          cLinkAccount.once('value',
              function(snap){
                var cLinkAccountData = snap.val();
                if(!cLinkAccountData){
                  // linkedAccount is not setup
                  cLinkAccount.set({userID: data.userID, provider: cProv, id: cId});
                  linkBools[uid] = true; // we'd prefer to have the uid as the index rather than value (more efficient lookups)
                }
                else{
                  // linkedAccount is there...
                  // TODO: check the userID
                  //   if it is different from data.userID
                  //     then this account is already linked to a different profile (throw an error?)
                  console.log('what is linkedAccount:'+JSON.stringify(cLinkAccountData));
                }
              },
              function(err){
                console.log('error:'+err);
              }
          );
        });

        // ok, we can update the user profile
        dbUserRef.child(data.userID).
            update({displayName: data.name, testing: 'testing 123...', linkedAccounts: linkBools, created: new Date(), lastLogin: new Date()});
      }
    },
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
    authFacebook: function(callback){
      auth.$login('facebook').then(
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
    authTwitter: function(callback){
      auth.$login('twitter').then(
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
    authGitHub: function(callback){
      auth.$login('github').then(
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
          var userProfile = null;
          authority.getUserByUID(userData.uid).
              then(
                function(userProfile){
                  if(userProfile){
                    console.log('win:'+JSON.stringify(userProfile));
                    userData.userID = userProfile.userID;
                    $rootScope.DBFB.$child('user/'+userData.userID+'/lastLogin').
                        $set(new Date());
                  }
                  else{
                    console.log('creating new user profile for uid:'+userData.uid);
                    authority.saveUserData({userID: null, uid: userData.uid, name: userData.displayName, lastLogin: new Date()});
                  }
                },
                function(err){
                  console.log('lose:'+err);
                }
              );
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
    "<div><div class=user-block data-ng-show=user.uid><span data-ng-show=user.displayName>Logged in as: {{ user.displayName }}<span data-ng-show=user.loginService>&nbsp;via {{ user.loginService }}</span><span data-ng-show=user.id>&nbsp;(#{{ user.id }})</span></span><div><input type=button value=Logout data-ng-click=logout()></div></div><div class=profile-block data-ng-show=user.uid><h3>My Profile</h3><h4>{{ user.displayName }}</h4><div><label for=displayName>Name:</label><input name=displayName id=displayName data-ng-model=user.displayName></div><div><input type=button value=\"Save Profile\" data-ng-click=saveUserData()></div></div><div class=anonymous-block data-ng-hide=user.uid><div class=register-block><h3>Register</h3><div><label for=email>Email:</label><input name=email id=email data-ng-model=email></div><div><label for=password>Password:</label><input type=password name=password id=password data-ng-model=password></div><div><label for=passwordConfirm>Confirm password:</label><input type=password name=passwordConfirm id=passwordConfirm data-ng-model=passwordConfirm></div><div><input type=button value=\"Create User\" data-ng-click=addUser()></div></div><div class=login-block><h3>Login</h3><div><label for=email>Email:</label><input name=email id=email data-ng-model=email></div><div><label for=password>Password:</label><input type=password name=password id=password data-ng-model=password></div><div><input type=button value=Login data-ng-click=login()></div><div><input type=button value=\"Login with Facebook\" data-ng-click=loginFacebook()></div><div><input type=button value=\"Login with Twitter\" data-ng-click=loginTwitter()></div><div><input type=button value=\"Login with GitHub\" data-ng-click=loginGitHub()></div></div></div></div>"
  );


  $templateCache.put('directive/notifications/notifications.html',
    "<div>notifications<div class=user-notifications data-ng-show=user.uid><ul><li data-ng-repeat=\"n in user.notes\">{{ n.note }}</li></ul><h4>spoofable?</h4><ul><li data-ng-repeat=\"s in spoofNotes\">{{ s.note }}</li></ul><div><input data-ng-model=newNote><input type=button value=\"Add Note\" ng-click=addNote()><input type=button value=\"Spoof Note\" ng-click=spoofNote()></div></div></div>"
  );


  $templateCache.put('directive/sharing/sharing.html',
    "<div></div>"
  );

}]);
