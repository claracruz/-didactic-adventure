import {
	onRequestProjectDetails,
	fetchProjectData
}   from './';
import { put, call, takeLatest, all } from 'redux-saga/effects';
import {
	REQUEST_PROJECT_DETAILS,
	RECEIVE_PROJECT_DETAILS,
	PROJECT_DETAILS_REQUEST_FAILED
} from '../../constants';
import * as services from '../../utils/requests';


describe('On request project details', () => {

	const testAction = {
		type: REQUEST_PROJECT_DETAILS,
		url: 'a/url',
		contributorsUrl: '/a/contributors_url'
	};

	it('gets the execution context', () => {
		const generator = onRequestProjectDetails(testAction);
		const result = generator.next().value;
		expect(result).toEqual(takeLatest(testAction.type, fetchProjectData));
	});

	describe('Fetch data successfully', () => {
		const generator = fetchProjectData(testAction);

		it('calls the API', () => {
			const result = generator.next(testAction).value;
			expect(result).toEqual(all({
				contributors: call(services.fetchProjectDetails, testAction.contributorsUrl),
				details: call(services.fetchProjectDetails, testAction.url)
			}));
		});

		it('raises success action', () => {
			const testSuccessResponse = {
				contributors: { data: [1,2,3] },
				details: { data: { foo: 'bar' }}
			};
			const result = generator.next(testSuccessResponse).value;
			const { contributors, details } = testSuccessResponse;
			expect(result).toEqual(put({
				type: RECEIVE_PROJECT_DETAILS,
				data: { contributors: contributors.data, details: details.data }
			}));
		});

		it('performs no further work', () => {
			const result = generator.next().done;
			expect(result).toBe(true);
		});
	});

	describe('Throws error on failure', () => {
		const generator = fetchProjectData(testAction);

		it('calls the API', () => {
			const result = generator.next(testAction).value;
			expect(result).toEqual(all({
				contributors: call(services.fetchProjectDetails, testAction.contributorsUrl),
				details: call(services.fetchProjectDetails, testAction.url)
			}));
		});

		it('raises error action', () => {
			const result = generator.throw('error').value;
			expect(result).toEqual(put({
				type: PROJECT_DETAILS_REQUEST_FAILED,
				error: 'A server error occurred! Unable to retrieve project details'
			}));
		});

		it('performs no further work', () => {
			const result = generator.next().done;
			expect(result).toBe(true);
		});
	});

});
