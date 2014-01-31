angular.module('ecopos').factory('navigation',function() {

	var navigation = {
        Home: "/",

        Dashboard: "/#/dashboard/:id",
            Settings: "/#/dashboard/:id/settings",
            Inventory: "/#/dashboard/:id/inventory",
            Store: "/#/dashboard/:id/store",

        Resources: "/#/resources/:id",
            Agenda: "/#/resources/:id/agenda",
            Delivery: "/#/resources/:id/delivery",
            Info: "/#/resources/:id/info",

        Shop: "/#/shop/:id",
            Sunshine_Organics: "/#/shop/:id/sunshine",
            Point_of_Sale: "/#/shop/:id/pos",
            Cafe: "/#/shop/:id/cafe",
            Cart: "/#/shop/:id/cart",
            Checkout: "/#/shop/:id/checkout"
    };

	return navigation;
});