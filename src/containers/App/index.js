import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Sidebar } from '../../components/Sidebar';
import { Loading } from '../../components/Loading';
import './index.scss';
import { REQUEST_REPO_PROJECTS } from '../../constants';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import ProjectDetails from "../../containers/ProjectDetails";

const mapStateToProps = (state) => {
	const {projectList} = state;
	return {
		error: projectList.error,
		fetching: projectList.fetching,
		projects: projectList.items
	};
};

const mapDispatchToProps = (dispatch) => ({
	getProjectList: () => dispatch({ type: REQUEST_REPO_PROJECTS })
});

export class App extends PureComponent {

	componentDidMount() {
		this.props.getProjectList()
	}

	render() {
		const { error, fetching, projects } = this.props;
		return (
			<>
				<header className="app-header">
					<h1>Demo app</h1>
				</header>
				{
					error &&
					<div className="page-error">{error}</div>
				}
				{
					fetching &&
					<Loading />
				}
				{
					!error && !fetching &&
					<Router>
						<div className="container">
							<Route path="/" render={() => <Sidebar items={projects} error={error} />} />
							<Route exact path="/" component={ProjectDetails} />
							<Route exact path="/:repo/:projectName/:projectId" component={ProjectDetails} />
						</div>
					</Router>
				}
			</>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);

ProjectDetails.propTypes = {
	error: PropTypes.string,
	projects: PropTypes.array
};
