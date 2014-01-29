describe('productsFilter', function() {

	beforeEach(module('ecoposShop'));

	it('should ...', inject(function($filter) {

        var filter = $filter('productsFilter');

		expect(filter('input')).toEqual('output');

	}));

});