import * as utils from '../utils';

describe('Utilities', () => {


	it('should order array of objects by provided prop', () => {
		expect(utils.orderArrayOfObjectsByProp([
			{ id: 10, foo: 'bar', bar: 'foo' },
			{ id: 1, foo: 'foobar', bar: 'barfoo' },
			{ id: 23, foo: 'xxx', bar: 'yyy' }
		], 'id')).toEqual([
			{ id: 23, foo: 'xxx', bar: 'yyy' },
			{ id: 10, foo: 'bar', bar: 'foo' },
			{ id: 1, foo: 'foobar', bar: 'barfoo' }
		]);
	});

	it('should get item from array by id', () => {
		expect(utils.getItemFromArrayById([
			{ id: 234, foo: 'bar' },
			{ id: 456, foo: 'foobar' },
			{ id: 789, foo: 'xxx' },
			{ id: 1098, foo: 'tyy' }
		], 1098)).toEqual({ id: 1098, foo: 'tyy' });
	});
});
