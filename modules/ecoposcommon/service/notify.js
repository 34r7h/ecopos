angular.module('ecopos.common').factory('notify',function($rootScope) {

	var notify = {
    addNote: function(uid, note){
      var notes = $rootScope.DBFB.$child('notes');
      notes.$child(uid).$add({'note': note});
    }
  };

	return notify;
});