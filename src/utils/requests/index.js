import axios from 'axios';
import { FACEBOOK_GITHUB_API } from '../../constants/api';

export function fetchProjectDetails(url) {
	return axios({ method: 'get', url });
}

export function fetchRepoProjects() {
	return axios({
		method: 'get',
		url: FACEBOOK_GITHUB_API
	});
}
