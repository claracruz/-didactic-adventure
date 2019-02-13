import React from 'react';
import { NavLink } from 'react-router-dom';
import { mount } from 'enzyme';
import { Sidebar } from './';
import {MemoryRouter} from 'react-router-dom';

describe('<Sidebar />', () => {

	it('renders list items', () => {
		const props = {
			items: [
				{ id: 1234,  full_name:'full name 1', name: 'name 1', watchers: 12 },
				{ id: 333,  full_name:'full name 2', name: 'name 2', watchers: 33 },
				{ id: 235,  full_name:'full name 3', name: 'name 3', watchers: 66 }
			]
		};
		const wrapper = mount(
			<MemoryRouter>
				<Sidebar {...props} />
			</MemoryRouter>
		);

		expect(wrapper.find('.empty-message')).toHaveLength(0);
		expect(wrapper.find('.ul.nav')).toBeDefined();
		expect(wrapper.find('.nav-item')).toHaveLength(props.items.length);
	});

	it('renders a list item as expected', () => {
		const props = {
			items: [
				{ id: 1234,  full_name:'full name 1', name: 'name 1', watchers: 12 }
			]
		};
		const wrapper = mount(
			<MemoryRouter>
				<Sidebar {...props} />
			</MemoryRouter>
		);

		expect(wrapper.containsMatchingElement(
			[<li key="1234" className="nav-item">
				<NavLink
					activeClassName="selected"
					to="/full name 1/name 1">
					<span>name 1 (12)</span>
				</NavLink>
			</li>]
		)).toEqual(true);
	});

	it('renders as expected when has no items', () => {
		const wrapper = mount(
			<MemoryRouter>
				<Sidebar />
			</MemoryRouter>
		);
		expect(wrapper.find('.ul.nav')).toHaveLength(0);
		expect(wrapper.find('.empty-message')).toBeDefined();
	});

	it('renders expected text no items', () => {
		const wrapper = mount(
			<MemoryRouter>
				<Sidebar />
			</MemoryRouter>
		);
		expect(wrapper.find('.empty-message').text()).toEqual('No projects found');
	});

});
