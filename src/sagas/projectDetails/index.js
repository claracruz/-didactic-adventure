import { takeLatest, call, put, all } from 'redux-saga/effects';
import {
	REQUEST_PROJECT_DETAILS,
	RECEIVE_PROJECT_DETAILS,
	PROJECT_DETAILS_REQUEST_FAILED
} from '../../constants/index';
import { fetchProjectDetails } from '../../utils/requests';

export function* fetchProjectData({ url, contributorsUrl }) {
	try {
		const { contributors, details } = yield all({
			contributors: call(fetchProjectDetails, contributorsUrl),
			details: call(fetchProjectDetails, url)
		});
		yield put({
			type: RECEIVE_PROJECT_DETAILS,
			data: {
				contributors: contributors.data,
				details: details.data
			}
		});
	} catch (e) {
		yield put({
			type: PROJECT_DETAILS_REQUEST_FAILED,
			error: 'A server error occurred! Unable to retrieve project details'
		});
	}
}

export function* onRequestProjectDetails() {
	yield takeLatest(REQUEST_PROJECT_DETAILS, fetchProjectData);
}

