angular.module('ecopos.shop').directive('cart', function() {
	return {
		restrict: 'E',
		replace: true,
        scope:{},
		templateUrl: 'directive/cart/cart.html',
		link: function(scope, element, attrs, fn) {
            scope.modal = {tits:"tits", freeks: "fracks"};
            scope.cart = {
                buy: {
                    "Ukranian Cigar": {
                        img: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRNM-AHnM9EwisQDquKko8bL_VWxXCPKqmO-T0wpxbuuRhUEhXX3g",
                        price:32,
                        qty: {
                            num: 2,
                            unitCt: "piece"
                        }
                    },
                    "Used Kale": {
                        img: "",
                        price:42,
                        qty: {
                            num: 1.45,
                            unitCt: "lbs"
                        }
                    }
                }
            };

		}
	};
});
