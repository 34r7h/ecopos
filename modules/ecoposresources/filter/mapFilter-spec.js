describe('mapFilter', function() {

	beforeEach(module('ecoposresources'));

	it('should ...', inject(function($filter) {

        var filter = $filter('mapFilter');

		expect(filter('input')).toEqual('output');

	}));

});