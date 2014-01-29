describe('infoFilter', function() {

	beforeEach(module('ecoposResources'));

	it('should ...', inject(function($filter) {

        var filter = $filter('infoFilter');

		expect(filter('input')).toEqual('output');

	}));

});