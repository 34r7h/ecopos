angular.module('ecopos.common').factory('notify',function($rootScope, DB) {

	var notify = {
    addNote: function(uid, note){
      var notes = DB.FB.$child('notes');
      notes.$child(uid).$add({'note': note});
    }
  };

	return notify;
});