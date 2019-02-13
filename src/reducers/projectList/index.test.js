import { projectListReducer }  from './';
import {
	REQUEST_REPO_PROJECTS,
	RECEIVE_REPO_PROJECTS,
	REPO_PROJECTS_REQUEST_FAILED
} from '../../constants';
import * as utils from "../../utils";


describe('Project list reducer', () => {

	let initialState;

	beforeEach(() => {

		initialState = {
			error: null,
			fetching: false,
			items: []
		};
	});

	it('should return the initial state', () => {
		expect(projectListReducer(undefined, {})).toEqual(initialState);
	});

	it('should handle REQUEST_REPO_PROJECTS', () => {
		const startAction = {
			type: REQUEST_REPO_PROJECTS
		};
		expect(projectListReducer(initialState, startAction)).toEqual({
			error: null,
			fetching: true,
			items: []
		});
	});

	it('should handle RECEIVE_REPO_PROJECTS', () => {
		const startAction = {
			type: RECEIVE_REPO_PROJECTS,
			data: {
				items: [1,2,3,4]
			}
		};
		utils.orderArrayOfObjectsByProp = jest.fn(() => ([...startAction.data.items]));
		expect(projectListReducer(initialState, startAction)).toEqual({
			error: null,
			fetching: false,
			items: startAction.data.items
		});
	});


	it('should handle REPO_PROJECTS_REQUEST_FAILED', () => {
		const startAction = {
			error: 'failed test',
			type: REPO_PROJECTS_REQUEST_FAILED
		};
		expect(projectListReducer(initialState, startAction)).toEqual({
			error: startAction.error,
			fetching: false,
			items: []
		});
	});
});
