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
