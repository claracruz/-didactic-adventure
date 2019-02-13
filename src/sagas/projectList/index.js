import { takeLatest, call, put } from 'redux-saga/effects';
import {
	REQUEST_REPO_PROJECTS,
	RECEIVE_REPO_PROJECTS,
	REPO_PROJECTS_REQUEST_FAILED
} from '../../constants/index';
import { fetchRepoProjects } from '../../utils/requests';


export function* requestRepoProjects() {
	try {
		const response = yield call(fetchRepoProjects);
		yield put({ type: RECEIVE_REPO_PROJECTS, data: response.data });
	} catch (e) {
		yield put({
			type: REPO_PROJECTS_REQUEST_FAILED,
			error: 'A server error occurred! Unable to retrieve repository list'
		});
	}
}

export function* onRequestRepoProjects() {
	yield takeLatest(REQUEST_REPO_PROJECTS, requestRepoProjects);
}
