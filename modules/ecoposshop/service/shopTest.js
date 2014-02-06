angular.module('ecopos.shop').factory('shopTest',function($q, $timeout) {
  var testData = null;

	var shopTest = {
    test: "Shop Module Working Service",
    getTestData: function(){
      return testData;
    },
    refreshTestData: function(){
      var d = $q.defer();
      $timeout(function() {
        d.resolve('a simple resolution');
      }, 2000);
      return d.promise;
    }
  };

	return shopTest;
});