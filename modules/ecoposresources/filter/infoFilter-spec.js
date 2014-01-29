describe('infoFilter', function() {

	beforeEach(module('ecoposresources'));

	it('should ...', inject(function($filter) {

        var filter = $filter('infoFilter');

		expect(filter('input')).toEqual('output');

	}));

});