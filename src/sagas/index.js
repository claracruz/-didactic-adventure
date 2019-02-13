import { all, fork } from 'redux-saga/effects';
import { onRequestRepoProjects } from './projectList';
import { onRequestProjectDetails } from './projectDetails';

export default function* rootSaga () {
	yield all([
		fork(onRequestRepoProjects),
		fork(onRequestProjectDetails)
	]);
}
