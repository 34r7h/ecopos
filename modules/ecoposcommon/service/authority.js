angular.module('ecopos.common').factory('authority',function($rootScope, $firebaseSimpleLogin) {
	var authority = {
    createUser: function(email, password, callback){
      $rootScope.auth = $firebaseSimpleLogin($rootScope.DBFBref);

      $rootScope.auth.$createUser(email, password, true).then(
          function(user){
            if(callback){
              callback(null, user);
            }
            //console.log('user created:'+(user.id)+':');
          },
          function(error){
            if(callback){
              callback(error, null);
            }
            //console.log('there was an error:'+error+':');
          }
      );



      /**angularFireAuth._authClient.createUser(email, password, function(err, user) {
        if(callback){
          callback(err, user);
        }
      });*/
    }
  };

	return authority;
});