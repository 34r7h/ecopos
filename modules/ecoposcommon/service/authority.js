angular.module('ecopos.common').factory('authority',function($rootScope, $q, $firebase, $firebaseSimpleLogin) {
  var fbLogin = $firebaseSimpleLogin($rootScope.DBFBref);

  $rootScope.$on('$firebaseSimpleLogin:login', function(event){
    //console.log('fbemail:'+JSON.stringify(fbLogin.user)+':');
    authority.loadUserData();
  });
  $rootScope.$on('$firebaseSimpleLogin:logout', function(event){
    authority.unloadUserData();
  });

	var authority = {
    getUserByUID: function(uid){
      var d = $q.defer();
      $rootScope.DBFBref.child('linkedAccount/'+uid).
          once('value',function(linkedSnap){
            var linkedAccount = linkedSnap.val();
            if(linkedAccount){
              // we found the linkedAccount record for uid, load the user profile
              var user = $firebase($rootScope.DBFBref.child('user/'+linkedAccount.username));
              d.resolve(user);
            }
            else{
              // could not load the linkedAccount
              var userData = authority.getDefaultUserData();
              console.log('creating new user profile for uid:'+userData.uid);
              userData.created = new Date();
              var newUser = authority.saveUserProfile(userData);
              d.resolve($firebase(newUser));
            }
          },
          function(err){
            d.reject('error loading linked:'+err);
          }
      );

      return d.promise;
    },
    assignUserRole: function(username, role){
      var cRole = $rootScope.DBFBref.child('roles/'+role+'/'+username);
      cRole.once('value',
          function(snap){
            var cRoleData = snap.val();
            if(!cRoleData){
              // not assigned yet, let's assign it
              cRole.set(true, function(err){
                if(!err){
                  $rootScope.DBFBref.child('user/'+username+'/roles/'+role).set(true);
                }
              });
            }
            else{
              // user is already in that role.  good, do nothing.
            }
          },
          function(err){
            console.log('error assigning role:'+err);
          }
      );
    },
    unassignUserRole: function(username, role){
      var cRole = $rootScope.DBFBref.child('roles/'+role+'/'+username);
      cRole.remove(function(err){
        if(!err){
          $rootScope.DBFBref.child('user/'+username+'/roles/'+role).set(false);
        }
        else{
          console.log('error unassigning role:'+err);
        }
      });
    },
    linkUserAccount: function(username, uid){
      // username is our unique id
      // uid is from simpleLogin as <provider>:<id>

      // break apart the uid to discover its provider and id
      // TODO: we don't need this if we don't care to store the provider and id as elements
      var uidParts = uid.split(':', 2);
      var cProv = 'unknown';
      var cId = 0;
      if(uidParts.length === 2){
        cProv = uidParts[0];
        cId = uidParts[1];
      }

      var cLinkAccount = $rootScope.DBFBref.child('linkedAccount/'+uid);
      cLinkAccount.once('value',
          function(snap){
            var cLinkAccountData = snap.val();
            if(!cLinkAccountData){ // linkedAccount is not setup yet
              // link the account
              cLinkAccount.set({username: username, provider: cProv, id: cId}, function(err){
                if(!err){
                  $rootScope.DBFBref.child('user/'+username+'/linkedAccount/'+uid).set(true);
                }
              });

            }
            else{
              // linkedAccount is already there...
              // TODO: check the username
              //   if it is different from snap.username
              //     then this account is already linked to a different profile (throw an error? confirm an overwrite?)
              console.log('what is linkedAccount:'+JSON.stringify(cLinkAccountData));
            }
          },
          function(err){
            console.log('error with linkedAccount:'+err);
          }
      );


    },
    saveUserData: function(){
      $rootScope.user.$save();
    },
    saveUserProfile: function(data){
      // TODO: move to users service

      if(!data.username){ return null; } // no username, who the hell are ya then?

      var dbUserRef = $rootScope.DBFBref.child('user/'+data.username);

      // TODO: blah blah, we are making our own name now.
      // create a new user profile if no userID given
      //if(data.userID === null){ data.userID = dbUserRef.push().name(); }

      // massage any provided data before building the userData object that will be written
      if(data.uid && !(data.uid instanceof Array)){ data.uid = [data.uid]; } // data.uid are the linkedAccounts
      if(data.phone && !(data.phone instanceof Array)){ data.phone = [data.phone]; }
      if(data.email && !(data.email instanceof Array)){ data.email = [data.email]; }

      // TODO: conscious of who is injecting what where into user tree
      /** CORE userProfile:
       name: "",
       roles: [],
       phones: [],
       emails: [],
       mailingAddress: {type and value}, (this will be used for default transaction.billingAddress and order.shippingAddress)
       preferences: {type and value},
       linkedAccounts: {type and details},
       */

      /** messaging/notification system:
       messages: {content and time},
       notifications: {content and time},
       */

      /** customer shopping system:
       billingAddress: {type and value}, (this should be part of payment method?)
       transactions: {date and details},
       payment methods: {type and details},
       */

      /** calendar system:
       calendar: {type and time},
       */

      var userData = {
        displayName: data.displayName?data.displayName:data.username,
        roles: data.roles?data.roles:{},
        phones: data.phone?data.phone:[],
        emails: data.email?data.email:[],
        preferences: data.preferences?data.preferences:{},
        linkedAccount: data.linkedAccount?data.linkedAccount:{},
        mailingAddress: data.mailingAddress?data.mailingAddress:{}
      };

      if(data.created){
        userData.created = data.created;
      }

      // handle linking with accounts (uid are from simpleLogin as <provider>:<id>)
      if(data.uid){
        // TODO: can we create a user if there is not at least 1 simpleLogin?
        //    - seems maybe if we ever need to store "dummy" users that don't have a login
        //    - or we ever want to disable all login for a user

        console.log('update:'+JSON.stringify(userData)+':'+JSON.stringify(data.uid)+':');

        // update the user profile
        dbUserRef.update(userData, function(err){
          if(!err){
            // TODO: it seems like it would be bandwidth cheaper to pack them into one call
            //    - maybe a version of linkUserAccount that returns the array to pack into userData before update
            // handle every uid we've been told to link with
            $.each(data.uid, function(key, uid){
              authority.linkUserAccount(data.username, uid);
            });

            $.each(data.roles, function(key, assigned){
              if(assigned){
                authority.assignUserRole(data.username, key);
              }
            });
          }
        });
      }
      return dbUserRef;
    },
    createUser: function(email, password, callback){
      // TODO: remove optional third argument (true) if we want to auto-login after creation
      fbLogin.$createUser(email, password, true).then(
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
      //, {scope:'email,user_likes'}
      fbLogin.$login('facebook').then(
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
      $rootScope.DBFBref.unauth();
      fbLogin.$logout();
    },
    loadUserAuth: function(user){
      // loads our custom user authentication token
      var tokenGenerator = new FirebaseTokenGenerator('JAtgnifGwqpLO4vYXScMFe9M9oW9Rj8VOWVLfe3E');
      var tokenData = {uid: fbLogin.user.uid, username: user.$id, role: user.roles};
      console.log('creating token for:'+JSON.stringify(tokenData)+':');
      var token = tokenGenerator.createToken(tokenData);
      console.log('token:'+token+':');
      $rootScope.DBFBref.auth(token, function(err, result){
        if(err){
          console.log('error:'+err+':');
        }
        else{
          console.log('auth success!'+JSON.stringify(result.auth)+':');
        }
      });

    },
    loadUserData: function(){
      // load up the user data into $rootScope based on currently authenticated user
      if(fbLogin.user && fbLogin.user.id){
        authority.getUserByUID(fbLogin.user.uid).
            then(function(user){
              if(user){
                user.$on('loaded', function(){
                    authority.loadUserAuth(user);

                  $rootScope.user = user;

                  user.lastLogin = new Date();
                  user.$save('lastLogin');
                  console.log('win:'+JSON.stringify(user));
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
      $rootScope.user = null;
    },
    getDefaultUserData: function(){
      // generates a new user profile, pulling default values based on auth provider
      // TODO: move to users service
      var userData = {};

      if(fbLogin.user && fbLogin.user.id){
        userData = {
          provider: fbLogin.user.provider,
          id: fbLogin.user.id,
          uid: fbLogin.user.uid,
          authToken: fbLogin.user.firebaseAuthToken,
          roles: {admin: false, manager: false, employee: false, supplier: false, customer: true},
          linkedAccount: {}
        };
        userData.linkedAccount[fbLogin.user.uid] = true;

        if(fbLogin.user.provider === 'password'){
          userData.loginService = 'User Account';
          userData.username = fbLogin.user.email;
          userData.email = fbLogin.user.email;
          userData.displayName = fbLogin.user.email;
        }
        else if(fbLogin.user.provider === 'facebook'){
          userData.loginService = 'Facebook';
          userData.username = fbLogin.user.username;
          userData.email = fbLogin.user.email;
          userData.displayName = fbLogin.user.displayName;
        }
        else if(fbLogin.user.provider === 'twitter'){
          userData.loginService = 'Twitter';
          userData.username = fbLogin.user.username;
          userData.email = fbLogin.user.email;
          userData.displayName = fbLogin.user.displayName;
        }
        else if(fbLogin.user.provider === 'github'){
          userData.loginService = 'GitHub';
          userData.username = fbLogin.user.username;
          userData.email = fbLogin.user.email;
          userData.displayName = (fbLogin.user.displayName?fbLogin.user.displayName:fbLogin.user.username);
        }
      }

      return userData;
    }
  };

	return authority;
});
