import React from 'react';
import { shallow } from 'enzyme';
import { App } from '../../containers/App';
import { Loading } from '../../components/Loading';
import { ProjectDetails } from '../../containers/ProjectDetails';
import { Sidebar } from '../../components/Sidebar';
import { Route } from 'react-router-dom';

describe('<App />', () => {
	let props;

	beforeEach(() => {
		props = {
			error: false,
			fetching: false,
			projects: [],
			getProjectList: jest.fn()
		};
	});

	it('renders as expected', () => {
		const wrapper = shallow(<App {...props} />);
		expect(wrapper).toMatchSnapshot();
	});

	it('should render header', () => {
		const wrapper = shallow(<App {...props} />);
		expect(wrapper.contains(
			<header className="app-header">
				<h1>Demo app</h1>
			</header>
		)).toEqual(true);
	});

	it('should render as expected when has error', () => {
		props.error = 'has error';
		const wrapper = shallow(<App  {...props} />);

		expect(wrapper.contains(
			<div className="page-error">{props.error}</div>
		)).toEqual(true);
	});

	it('should render as expected when fetching', () => {
		props.fetching = true;
		const wrapper = shallow(<App  {...props} />);

		expect(wrapper.contains(
			<Loading />
		)).toEqual(true);
	});

	it('ComponentDidMount: should get project lists', () => {
		shallow(<App  {...props} />);
		expect(props.getProjectList).toHaveBeenCalledTimes(1);
	});

	it('ProjectDetails: renders routes for matching path', () => {
		const wrapper = shallow(<App  {...props} />);
		const pathMap = wrapper.find(Route).reduce((pathMap, route) => {
			const routeProps = route.props();
			if (routeProps.exact) {
				pathMap[routeProps.path] = routeProps.component;
			}
			return pathMap;
		}, {});

		 expect(pathMap['/'].WrappedComponent).toBe(ProjectDetails);
		 expect(pathMap['/:repo/:projectName/:projectId'].WrappedComponent).toBe(ProjectDetails);
	});

	it('Sidebar: renders route for matching path', () => {
		const wrapper = shallow(<App  {...props} />);
		const pathMap = wrapper.find(Route).reduce((pathMap, route) => {
			const routeProps = route.props();
			if (!routeProps.exact) {
				pathMap[routeProps.path] = routeProps.render();
			}
			return pathMap;
		}, {});

		expect(pathMap['/'].type).toBe(Sidebar);
		expect(pathMap['/'].props).toEqual({error: props.error, items: props.projects });
	});
});
