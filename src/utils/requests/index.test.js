import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as services from '../../utils/requests';
import {FACEBOOK_GITHUB_API} from '../../constants/api';

describe('Services', () => {

	describe('fetchRepoList', () => {
		it('returns expected response data', done => {
			const mock = new MockAdapter(axios);
			const data = {
				response: { data: [1,2,3,4,5,6,7]}
			};
			mock.onGet(FACEBOOK_GITHUB_API).reply(200, data);

			services.fetchRepoProjects().then(response => {
				expect(response.data).toEqual(data);
				done();
			});
		});
	});


	describe('fetchProjectDetails', () => {
		it('returns expected response data', done => {
			const mock = new MockAdapter(axios);
			const data = {
				response: { data: [1,2,3,4,5,6,7]}
			};
			const url = '/test/url';
			mock.onGet(url).reply(200, data);

			services.fetchProjectDetails(url).then(response => {
				expect(response.data).toEqual(data);
				done();
			});
		});
	});
});

