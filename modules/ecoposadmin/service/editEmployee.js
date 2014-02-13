angular.module('ecopos.admin').factory('ecoUser',function($rootScope) {
  var activeUser = null; // at the bottom we set it after we teach ecoUser how

	var ecoUser = {
    setActiveUser: function(user){
      //if(!user){
      //  user = ecoUser.getAnonymousUserData();
      //}
      activeUser = user;
      $rootScope.$broadcast('newActiveUser', activeUser);
    },
    getActiveUser: function(){
      // any time we need activeUser in a scope, we should be able to load it with ecoUser.getActiveUser()
      return activeUser;
    },

    getAnonymousUserData: function(){
      var userData = {
        username: "anonymous",
        displayName: "Anonymous"
      };
      return userData;
    },
    getAuthenticatedUserData: function(simpleAuth){
      // loads authenticated user data, loaded up by the various simpleLogin providers
      // note this is not the user/<username> record - leave that to authority to load and set with ecoUser.setActiveUser()
      var userData = {};

      if(simpleAuth.user && simpleAuth.user.id){
        userData = {
          provider: simpleAuth.user.provider,
          id: simpleAuth.user.id,
          uid: simpleAuth.user.uid,
          authToken: simpleAuth.user.firebaseAuthToken,
          roles: {admin: false, manager: false, employee: false, supplier: false, customer: true},
          linkedAccount: {}
        };
        userData.linkedAccount[simpleAuth.user.uid] = true;

        if(simpleAuth.user.provider === 'password'){
          userData.loginService = 'User Account';
          userData.username = simpleAuth.user.email.split('@', 2)[0];
          userData.email = simpleAuth.user.email;
          userData.displayName = simpleAuth.user.email;
        }
        else if(simpleAuth.user.provider === 'facebook'){
          userData.loginService = 'Facebook';
          userData.username = simpleAuth.user.username;
          userData.email = simpleAuth.user.emails[0].value?simpleAuth.user.emails[0].value:null;
          userData.displayName = simpleAuth.user.displayName;
        }
        else if(simpleAuth.user.provider === 'twitter'){
          userData.loginService = 'Twitter';
          userData.username = simpleAuth.user.username;
          userData.email = simpleAuth.user.email;
          userData.displayName = simpleAuth.user.displayName;
        }
        else if(simpleAuth.user.provider === 'github'){
          userData.loginService = 'GitHub';
          userData.username = simpleAuth.user.username;
          userData.email = simpleAuth.user.email;
          userData.displayName = (simpleAuth.user.displayName?simpleAuth.user.displayName:simpleAuth.user.username);
        }
      }
      return userData;
    },
    saveUserProfile: function(data){
      if(!data.username){ return null; } // no username, who does that?

      var dbUserRef = $rootScope.DBFBref.child('user/'+data.username);

      // massage any provided data before building the userData object that will be written
      if(data.uid && !(data.uid instanceof Array)){ data.uid = [data.uid]; } // data.uid are the linkedAccounts
      if(data.phone && !(data.phone instanceof Array)){ data.phone = [data.phone]; }
      if(data.email && !(data.email instanceof Array)){ data.email = [data.email]; }

      // TODO: be conscious of who is injecting what where into whose user tree
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

        console.log('update:'+JSON.stringify(userData)+':');

        // update the user profile
        dbUserRef.update(userData, function(err){
          if(!err){
            // TODO: it seems like it would be bandwidth cheaper to pack them into one call
            //    - maybe a version of linkUserAccount that returns the array to pack into userData before update
            // handle every uid we've been told to link with
            $.each(data.uid, function(key, uid){
              activeUser.linkUserAccount(data.username, uid);
            });

            $.each(data.roles, function(key, assigned){
              if(assigned){
                activeUser.assignUserRole(data.username, key);
              }
            });
          }
        });
      }
      return dbUserRef;
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
    }
  };

  activeUser = ecoUser.setActiveUser(null);

	return ecoUser;
});