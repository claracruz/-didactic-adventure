import React from 'react';
import { shallow, mount } from 'enzyme';
import { Loading } from '../../components/Loading';
import { ProjectDetails } from '../../containers/ProjectDetails';
import * as utils from '../../utils';
import {Thumbnail} from "../../components/Thumbnail";

describe('<ProjectDetails />', () => {
	let props;

	beforeEach(() => {
		props = {
			error: null,
			fetching: false,
			contributors: null,
			details: null,
			projectList: {
				items: []
			},
			match: {
				params: {
					projectId: 123
				}
			},
			getProjectDetails: jest.fn()
		};
	});

	it('renders as expected', () => {
		const wrapper = shallow(<ProjectDetails {...props} />);
		expect(wrapper).toMatchSnapshot();
	});

	it('should render header prompt', () => {
		const wrapper = shallow(<ProjectDetails {...props} />);
		expect(wrapper.contains(
			<h3>Please select a project.</h3>
		)).toEqual(true);
	});

	it('should render as expected when has error', () => {
		props.error = 'has error';
		const wrapper = shallow(<ProjectDetails  {...props} />);

		expect(wrapper.contains(
			<div className="page-error">{props.error}</div>
		)).toEqual(true);
	});

	it('should render as expected when fetching', () => {
		props.fetching = true;
		const wrapper = shallow(<ProjectDetails  {...props} />);

		expect(wrapper.contains(
			<Loading />
		)).toEqual(true);
	});

	it('should render as expected when has contributors', () => {
		props.contributors = [
			{ id: 1 }, { id: 2 }, { id: 3 }
		];
		const wrapper = shallow(<ProjectDetails  {...props} />);

		expect(wrapper.contains(
			<div className="contributor-list">
				<h3>Contributors({props.contributors.length})</h3>
				<Thumbnail list={props.contributors}/>
			</div>
		)).toEqual(true);
	});

	describe('Lifecycle', () => {

		afterEach(() => {
			utils.getItemFromArrayById.mockRestore();
		});

		it('ComponentDidMount: should get project details', () => {
			const testData = {
				url: '/test/url',
				contributors_url: '/test/contributors/url'
			};
			utils.getItemFromArrayById = jest.fn(x => ({ ...testData, id: x }));
			mount(<ProjectDetails  {...props} />);
			expect(props.getProjectDetails).toHaveBeenCalledTimes(1);
			expect(props.getProjectDetails).toHaveBeenCalledWith({
				url: testData.url,
				contributorsUrl: testData.contributors_url
			});

		});

		it('ComponentDidUpdate: should get project details if projectId has changed', () => {
			props.match.params.projectId = 1234;
			const testData = {
				url: '/test/url',
				contributors_url: '/test/contributors/url'
			};
			const wrapper = mount(<ProjectDetails  {...props} />);
			utils.getItemFromArrayById = jest.fn(x => ({ ...testData, id: x }));
			wrapper.setProps({
				match : {
					params: { projectId: 456 }
				}
			});
			expect(props.getProjectDetails).toHaveBeenCalledTimes(1);
			expect(props.getProjectDetails).toHaveBeenCalledWith({
				url: testData.url,
				contributorsUrl: testData.contributors_url
			});
		});
	});



});
