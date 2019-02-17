import { connect } from 'react-redux';
import { App } from '../../components/App';
import { REQUEST_REPO_PROJECTS } from '../../constants';

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

const AppContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(App);

export default AppContainer;
