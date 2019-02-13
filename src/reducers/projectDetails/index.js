import {
	REQUEST_PROJECT_DETAILS,
	RECEIVE_PROJECT_DETAILS,
	PROJECT_DETAILS_REQUEST_FAILED
} from '../../constants';


const initialState = {
	error: null,
	fetching: false,
	contributors: null,
	details: null
};

export const projectDetailsReducer = (state = initialState, action) => {
	switch (action.type) {
		case REQUEST_PROJECT_DETAILS:
			return { ...state, fetching: true, error: null };
		case RECEIVE_PROJECT_DETAILS:
			return { ...state, fetching: false,  ...action.data};
		case PROJECT_DETAILS_REQUEST_FAILED:
			return { ...state, fetching: false, ...initialState, error: action.error };
		default:
			return state;
	}
};
