angular.module('ecopos.common').factory('authority',function(angularFireAuth) {
	var authority = {
    createUser: function(email, password, callback){
      console.log('authority kickin it.');
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