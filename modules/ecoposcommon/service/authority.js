angular.module('ecopos.common').factory('authority',function($rootScope, $firebaseSimpleLogin) {
	var authority = {
    createUser: function(email, password, callback){

      var loginObj = $firebaseSimpleLogin($rootScope.DBFBref);

      console.log('authority kickin it.'+($firebaseSimpleLogin)+':'+($rootScope.DBFBref)+':'+(loginObj)+':');


      if(callback){
        callback(null, {id:'test'});
      }
      /**angularFireAuth._authClient.createUser(email, password, function(err, user) {
        if(callback){
          callback(err, user);
        }
      });*/
    }
  };

	return authority;
});