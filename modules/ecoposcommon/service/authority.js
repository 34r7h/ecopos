angular.module('ecopos.common').factory('authority',function($rootScope, $q, $firebase, $firebaseSimpleLogin) {
  var auth = $firebaseSimpleLogin($rootScope.DBFBref);

  $rootScope.$on('$firebaseSimpleLogin:login', function(event){
    authority.loadUserData();
  });
  $rootScope.$on('$firebaseSimpleLogin:logout', function(event){
    authority.unloadUserData();
  });

	var authority = {
    getUserByUID: function(uid){
      var d = $q.defer();

      // first, try to load the linkedAccount by its uid
      $rootScope.DBFBref.child('linkedAccount/'+uid).
          once('value',function(linkedSnap){
            var linkedAccount = linkedSnap.val();
            if(linkedAccount){
              // we found the linkedAccount record for uid
              var profile = $firebase($rootScope.DBFBref.child('user/'+linkedAccount.userID));
              d.resolve(profile);
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

      return d.promise;
    },
    saveUserData: function(){
      $rootScope.user.$save();
    },
    createUserProfile: function(data){
      // TODO: need to write this

      // to avoid accidentally duping/recreating a user, data.userID must be explicitly set
      if(data.userID === undefined){ return; } // for a new user, use data.userID = null

      var dbUserRef = $rootScope.DBFBref.child('user');

      // create a new user profile if no userID given
      if(data.userID === null){ data.userID = dbUserRef.push().name(); }

      // handle linking with accounts
      if(data.uid){
        if(!(data.uid instanceof Array)){ data.uid = [data.uid]; } // make it an array
        var linkedAccounts = {};
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
                  linkedAccounts[uid] = true; // we'd prefer to have the uid as the index rather than value (more efficient lookups)
                }
                else{
                  // linkedAccount is already there...
                  // TODO: check the userID
                  //   if it is different from data.userID
                  //     then this account is already linked to a different profile (throw an error? ask for overwrite?)
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
            update({displayName: data.name, testing: 'testing 123...', linkedAccounts: linkedAccounts, created: new Date(), lastLogin: new Date()});
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
      $rootScope.DBFBref.unauth();
      auth.$logout();
    },
    loadUserAuth: function(userProfile){
      // loads our custom user authentication token
      var tokenGenerator = new FirebaseTokenGenerator('JAtgnifGwqpLO4vYXScMFe9M9oW9Rj8VOWVLfe3E');
      var token = tokenGenerator.createToken({role: userProfile.roles});
      console.log('token:'+token+':');
      $rootScope.DBFBref.auth(token, function(err){
        if(err){
          console.log('error:'+err+':');
        }
        else{
          console.log('auth success!');
        }
      });

    },
    loadUserData: function(){
      // load up the user data into $rootScope based on currently authenticated user
      if(auth.user && auth.user.id){
        authority.getUserByUID(auth.user.uid).
            then(function(userProfile){
              if(userProfile){
                /**
                 * TODO: we will have a look at notes linking to user profile
                if(userData.uid){
                  userData.notes = $rootScope.DBFB.$child('notes/'+userData.uid);
                }
                 */

                userProfile.$on('loaded', function(){
                  authority.loadUserAuth(userProfile);

                  $rootScope.user = userProfile;

                  // TODO: this level of data probably doesn't need to be exposed
                  $rootScope.linkedAccounts = {};
                  $.each(userProfile.linkedAccounts, function(key, value){
                    if(value){
                      $rootScope.linkedAccounts[key] = $firebase($rootScope.DBFBref.child('linkedAccount/'+key));
                    }
                  });

                  userProfile.lastLogin = new Date();
                  userProfile.$save('lastLogin');

                  console.log('win:'+JSON.stringify(userProfile));
                });


              }
              else{
                var userData = authority.getDefaultUserData();
                console.log('creating new user profile for uid:'+userData.uid);
                authority.createUserProfile({userID: null, uid: userData.uid, name: userData.displayName, lastLogin: new Date()});
                // TODO: now we need to load the userProfile... refactor instead of else, put it first (if !userProfile) -- needs testing
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
      $rootScope.user = null;
    },
    getDefaultUserData: function(){
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
      }

      return userData;
    }
  };

	return authority;
});
