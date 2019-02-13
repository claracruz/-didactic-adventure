import React from 'react';
import { shallow } from 'enzyme';
import { Loading } from '../../components/Loading';

describe('<Loading />', () => {

	it('renders correctly', () => {
		const wrapper = shallow(<Loading />);
		expect(wrapper.find('div').html()).toEqual('<div class="loading">loading...</div>');
	});
});
