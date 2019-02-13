import { combineReducers } from 'redux';
import { projectListReducer } from './projectList';
import { projectDetailsReducer } from './projectDetails';

export default combineReducers({
	projectList: projectListReducer,
	projectDetails: projectDetailsReducer
});
