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
        }
      }

      return userData;
    }
  };

	return authority;
});