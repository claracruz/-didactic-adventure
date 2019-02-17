import { connect } from 'react-redux';
import { REQUEST_PROJECT_DETAILS } from '../../constants';
import { ProjectDetails } from '../../components/ProjectDetails';

const mapStateToProps = (state) => {
	return {
		...state.projectDetails,
		projects: state.projectList.items
	};
};

const mapDispatchToProps = (dispatch) => ({
	getProjectDetails: (urls) => dispatch({
		type: REQUEST_PROJECT_DETAILS,
		...urls
	})
});

const ProjectDetailsContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(ProjectDetails);

export default ProjectDetailsContainer;
