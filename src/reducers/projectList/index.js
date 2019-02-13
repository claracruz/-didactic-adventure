import {
	REQUEST_REPO_PROJECTS,
	RECEIVE_REPO_PROJECTS,
	REPO_PROJECTS_REQUEST_FAILED
} from '../../constants';
import {
	orderArrayOfObjectsByProp
} from '../../utils';


const initialState = {
	error: null,
	fetching: false,
	items: []
};

export const projectListReducer = (state = initialState, action) => {
	switch (action.type) {
		case REQUEST_REPO_PROJECTS:
			return { ...state, fetching: true, error: null };
		case RECEIVE_REPO_PROJECTS:
			return { ...state, fetching: false, items: orderArrayOfObjectsByProp(action.data, 'watchers') };
		case REPO_PROJECTS_REQUEST_FAILED:
			return { ...state, fetching: false, items: [], error: action.error };
		default:
			return state;
	}
};

