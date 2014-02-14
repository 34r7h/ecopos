angular.module('ecopos.common').factory('authority',function($rootScope, DB, ecoUser, $q, $firebaseSimpleLogin, md5, $timeout) {
  var fbLogin = $firebaseSimpleLogin(DB.FB);

  $rootScope.$on('$firebaseSimpleLogin:login', function(err, user){
    //console.log('login event:'+err+':'+JSON.stringify(user)+':');
    console.log('login!~');
    authority.loadUserData();
  });
  $rootScope.$on('$firebaseSimpleLogin:logout', function(err, user){
    //console.log('logout event:'+err+':'+JSON.stringify(user)+':');
    console.log('~logout!');
    authority.unloadUserData();
  });

	var authority = {
    REGSTATE: {CLEAR: 0, STARTED: 1, CONFIRM: 2, COMPLETE: 3},
    regStateWatch: null,
    startRegistration: function(){
      console.log('starting registration...');
      $rootScope.regState = authority.REGSTATE.STARTED;
    },
    completeRegistration: function(){
      console.log('completing registration ('+$rootScope.username+')...');
      $rootScope.regState = authority.REGSTATE.COMPLETE;

      $timeout(function(){
        console.log('clearing...');
        $rootScope.regState = authority.REGSTATE.CLEAR;
      }, 10000);
    },
    validateUsername: function(username){
      var d = $q.defer();
      if(!username){
        d.reject('Username may not be empty.');
      }
      else{
        authority.userHashExists(username).then(function(exists){
          if(exists){
            d.reject('Username exists.');
          }
          else{
            d.resolve(true);
          }
        });
      }
      return d.promise;
    },
    getUserByUID: function(uid){
      var d = $q.defer();
      DB.FB.child('linkedAccount/'+uid).
          once('value',function(snap){
            var linkedAccount = snap.val();
            if(linkedAccount){
              // we found the linkedAccount record for uid, load the user profile
              var user = DB.firebind(DB.FB.child('user/'+linkedAccount.username));
              d.resolve(user);
            }
            else{
              // no user exists for this account, if regState is triggered to start a registration process, go for it
              if($rootScope.regState === authority.REGSTATE.STARTED){
                // load whatever user data was given by the simpleLogin auth provider
                var userData = ecoUser.getAuthenticatedUserData(fbLogin.user);

                // need to apply because this would have been triggered by UI-scope
                $rootScope.$apply(function(){
                  $rootScope.username = userData.username; // let's start with what the auth gave us
                  $rootScope.regState = authority.REGSTATE.CONFIRM;  // go to registration confirmation box
                });

                // now watch the regState to see if we move on with user registration/creation
                authority.regStateWatch = $rootScope.$watch('regState', function(newValue, oldValue){
                  console.log('regState changed?'+newValue+':'+oldValue+':'+$rootScope.username+':');
                  if(newValue === authority.REGSTATE.COMPLETE){
                    // claim our place in the userHash list
                    authority.addUserHash($rootScope.username);

                    // final bits of data that ecoUser will want
                    userData.username = $rootScope.username;
                    userData.displayName = userData.username;
                    userData.created = new Date();
                    console.log('ok good:'+JSON.stringify(userData)+'.');
                    console.log('golly:'+userData.username+':');
                    var newUser = ecoUser.saveUserProfile(userData);
                    console.log('newUser:'+newUser);
                    d.resolve(DB.firebind(newUser));

                    console.log('great!');
                    authority.regStateWatch(); // no more watching, deregister
                  }
                });

              }

            }
          },
          function(err){
            d.reject('error loading linked:'+err);
          }
      );

      return d.promise;
    },
    addUserHash: function(username){
      DB.FB.child('userHash/'+md5.createHash(username)).set(true);
    },
    userHashExists: function(username){
      var d = $q.defer();
      DB.FB.child('userHash/'+md5.createHash(username)).once('value', function(snap){
        d.resolve(snap.val()); // found it, what does it say?
      },
      function(err){
        d.resolve(false); // not found, doesn't exist
      });
      return d.promise;
    },
    removeUserHash: function(username){
      DB.FB.child('userHash/'+md5.createHash(username)).remove();
    },
    createUser: function(email, password, callback){
      // TODO: set optional third argument as true to disable auto-login - this would be inconsistent with the 1-click access for other providers
      fbLogin.$createUser(email, password, false).then(
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
      fbLogin.$login('password', {email: email, password: password}).then(
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
      fbLogin.$login('facebook', {scope:'email,user_likes'}).then(
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
      fbLogin.$login('twitter').then(
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
      fbLogin.$login('github').then(
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
      ecoUser.setActiveUser(null);
      DB.FB.unauth();
      fbLogin.$logout();
    },
    loadUserAuth: function(user){
      var d = $q.defer();
      // loads our custom user authentication token
      var tokenGenerator = new FirebaseTokenGenerator('JAtgnifGwqpLO4vYXScMFe9M9oW9Rj8VOWVLfe3E');
      var tokenData = {uid: fbLogin.user.uid, username: user.$id, role: user.roles};
      console.log('creating token for:'+JSON.stringify(tokenData)+':');
      var token = tokenGenerator.createToken(tokenData);
      console.log('token:'+token+':');
      DB.FB.auth(token, function(err, result){
        if(err){
          console.log('error:'+err+':');
          d.reject(err);
        }
        else{
          console.log('auth success!'+JSON.stringify(result.auth)+':');
          d.resolve(result.auth);
        }
      });
      return d.promise;
    },
    loadUserData: function(){
      // load up the user data into $rootScope based on currently authenticated user
      if(fbLogin.user && fbLogin.user.id){
        authority.getUserByUID(fbLogin.user.uid).
            then(function(user){
              if(user){
                user.$on('loaded', function(){
                  authority.loadUserAuth(user).then(function(){
                    console.log('set active:'+JSON.stringify(user)+':');
                    //$rootScope.user = user;
                    ecoUser.setActiveUser(user); // potent line

                    user.lastLogin = new Date();
                    user.$save('lastLogin');
                    console.log('win:'+JSON.stringify(user));
                  },
                  function(err){
                    console.log('could not make custom token:'+err);
                  });
                });
              }
              else{
                // this means getUserByUID resolved null (ie. linkedAccount record does not exist and was not created for uid)
                console.log('lose :(');
              }
            },
            function(err){
              console.log('lose:'+err);
            }
        );
      }
      else{
        console.log('No authenticated user to load data for.');
      }
    },
    unloadUserData: function(){
      // clear the user data from $rootScope (should be called when user logs out)
      //$rootScope.user = null;
      ecoUser.setActiveUser(null);
    }
  };

	return authority;
});
