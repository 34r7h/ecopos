describe('infoFilter', function() {

	beforeEach(module('ecopos.resources'));

	it('should ...', inject(function($filter) {

        var filter = $filter('infoFilter');

		expect(filter('input')).toEqual('output');

	}));

});