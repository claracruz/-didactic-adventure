import { projectDetailsReducer }  from './';
import {
	REQUEST_PROJECT_DETAILS,
	RECEIVE_PROJECT_DETAILS,
	PROJECT_DETAILS_REQUEST_FAILED
} from '../../constants/';


describe('Project details reducer', () => {

	let initialState;

	beforeEach(() => {

		initialState = {
			error: null,
			fetching: false,
			contributors: null,
			details: null
		};
	});

	it('should return the initial state', () => {
		expect(projectDetailsReducer(undefined, {})).toEqual(initialState);
	});

	it('should handle REQUEST_PROJECT_DETAILS', () => {
		const startAction = {
			type: REQUEST_PROJECT_DETAILS
		};
		expect(projectDetailsReducer(initialState, startAction)).toEqual({
			error: null,
			fetching: true,
			contributors: null,
			details: null
		});
	});

	it('should handle RECEIVE_PROJECT_DETAILS', () => {
		const startAction = {
			type: RECEIVE_PROJECT_DETAILS,
			data: {
				contributors: [1,2,3,4],
				details: { test: true }
			}
		};
		expect(projectDetailsReducer(initialState, startAction)).toEqual({
			error: null,
			fetching: false,
			contributors: startAction.data.contributors,
			details: startAction.data.details
		});
	});


	it('should handle PROJECT_DETAILS_REQUEST_FAILED', () => {
		const startAction = {
			error: 'failed test',
			type: PROJECT_DETAILS_REQUEST_FAILED
		};
		expect(projectDetailsReducer(initialState, startAction)).toEqual({
			error: 'failed test',
			fetching: false,
			contributors: null,
			details: null
		});
	});
});
