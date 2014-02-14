angular.module('ecopos.common').factory('messaging',function($rootScope, DB, $q) {
	var messaging = {

    addNote: function(username, text){
      var userMessages = DB.FB.child('user/'+username+'/messages');
      var msgID = userMessages.push().name();
      userMessages.child(msgID).set({text: text}, function(err){
        if(!err){
          console.log('added message!');
        }
        else{
          console.log('could not add msg:'+err+':');
        }
      });
    },
    getUserMessages: function(username){
      return DB.firebind(DB.FB.child('user/'+username+'/messages'));
    }

  };

	return messaging;
});