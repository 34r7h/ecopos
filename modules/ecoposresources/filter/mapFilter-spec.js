describe('mapFilter', function() {

	beforeEach(module('ecoposResources'));

	it('should ...', inject(function($filter) {

        var filter = $filter('mapFilter');

		expect(filter('input')).toEqual('output');

	}));

});