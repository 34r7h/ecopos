angular.module('ecopos.common').factory('authority',function($firebaseSimpleLogin) {
	var authority = {
    createUser: function(email, password, callback){
      console.log('authority kickin it.'+($firebaseSimpleLogin)+':');
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