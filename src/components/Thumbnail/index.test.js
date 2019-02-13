import React from 'react';
import { shallow } from 'enzyme';
import { Thumbnail } from '../../components/Thumbnail';

describe('<Thumbnail />', () => {

	it('renders list items', () => {
		const props = {
			list: [
				{ id: 1234,  avatar_url:'avatar url 1', login: 'login 1', html_url: '/test/1' },
				{ id: 333,  avatar_url:'avatar url 2', login: 'login 2', html_url: '/test/2' },
				{ id: 235,  avatar_url:'avatar url 3', login: 'login 3', html_url: '/test/3' }
			]
		};
		const wrapper = shallow(<Thumbnail  {...props} />);

		expect(wrapper.find('.ul.contributors')).toBeDefined();
		expect(wrapper.find('.thumbnail')).toHaveLength(props.list.length);
	});

	it('renders a list item as expected', () => {
		const props = {
			list: [
				{ id: 1234,  avatar_url:'/avatar/url/1', login: 'login 1', html_url: '/test/1' }
			]
		};
		const wrapper = shallow(<Thumbnail  {...props} />);

		expect(wrapper.containsMatchingElement(
			<li className="thumbnail">
				<a href="/test/1" target="_blank" rel="noopener noreferrer">
					<img src="/avatar/url/1" alt="login 1"/>
				</a>
				<span>
					<a href="/test/1" target="_blank" rel="noopener noreferrer">login 1</a>
				</span>
			</li>
		)).toEqual(true);
	});
});
