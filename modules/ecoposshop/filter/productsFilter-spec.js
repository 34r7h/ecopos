describe('productsFilter', function() {

	beforeEach(module('ecopos.shop'));

	it('should ...', inject(function($filter) {

        var filter = $filter('productsFilter');

		expect(filter('input')).toEqual('output');

	}));

});