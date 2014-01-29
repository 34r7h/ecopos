describe('mapFilter', function() {

	beforeEach(module('ecopos.resources'));

	it('should ...', inject(function($filter) {

        var filter = $filter('mapFilter');

		expect(filter('input')).toEqual('output');

	}));

});