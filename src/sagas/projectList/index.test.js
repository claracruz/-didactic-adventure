import {
	onRequestRepoProjects,
	requestRepoProjects
}   from './';
import { put, call, takeLatest } from 'redux-saga/effects';
import {
	REQUEST_REPO_PROJECTS,
	RECEIVE_REPO_PROJECTS,
	REPO_PROJECTS_REQUEST_FAILED
} from '../../constants/index';
import * as services from '../../utils/requests';


describe('On request project list', () => {

	const testAction = {
		type: REQUEST_REPO_PROJECTS
	};

	it('gets the execution context', () => {
		const generator = onRequestRepoProjects(testAction);
		const result = generator.next().value;
		expect(result).toEqual(takeLatest(testAction.type, requestRepoProjects));
	});

	describe('Fetch data successfully', () => {
		const generator = requestRepoProjects(testAction);

		it('calls the API', () => {
			const result = generator.next(testAction).value;
			expect(result).toEqual(call(services.fetchRepoProjects));
		});

		it('raises success action', () => {
			const testSuccessResponse = {
				data: { success: true }
			};
			const result = generator.next(testSuccessResponse).value;
			expect(result).toEqual(put({
				type: RECEIVE_REPO_PROJECTS,
				...testSuccessResponse
			}));
		});

		it('performs no further work', () => {
			const result = generator.next().done;
			expect(result).toBe(true);
		});
	});

	describe('Throws error on failure', () => {
		const generator = requestRepoProjects(testAction);

		it('calls the API', () => {
			const result = generator.next(testAction).value;
			expect(result).toEqual(call(services.fetchRepoProjects));
		});

		it('raises error action', () => {
			const result = generator.throw('error').value;
			expect(result).toEqual(put({
				type: REPO_PROJECTS_REQUEST_FAILED,
				error: 'A server error occurred! Unable to retrieve repository list'
			}));
		});

		it('performs no further work', () => {
			const result = generator.next().done;
			expect(result).toBe(true);
		});
	});

});

