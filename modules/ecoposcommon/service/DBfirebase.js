angular.module('ecopos.common').factory('DB',function(Firebase, FB_URL, $firebase) {
	var DB = {
    FB: new Firebase(FB_URL),

    firebind: function(fbRef){
      // fbRef should be a Firebase reference
      return $firebase(fbRef);
    },

    goOffline: function(){
    },
    goOnline: function(){
    }
  };

	return DB;
});