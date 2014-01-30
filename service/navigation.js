angular.module('ecopos').factory('navigation',function() {

	var navigation = {
        Home: "/",
        Dashboard: "/#/dashboard/:id",
        Shop: "/#/shop/:id",
        Resources: "/#/resources/:id"
    };

	return navigation;
});