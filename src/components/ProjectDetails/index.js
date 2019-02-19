import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Thumbnail } from '../Thumbnail';
import { Loading } from '../Loading';
import { getItemFromArrayById } from '../../utils';
import './index.scss';

export class ProjectDetails extends PureComponent {

	fetchProjectDetails() {
		const { getProjectDetails, match } = this.props;
		const { projectId } = match.params;
		const project = getItemFromArrayById(this.props.projects, parseInt(projectId));

		if (project) {
			getProjectDetails({
				url: project.url,
				contributorsUrl: project.contributors_url
			});
		}
	}

	componentDidMount() {
		this.fetchProjectDetails();
	}

	componentDidUpdate(prevProps) {
		const { projectId } = this.props.match.params;

		if (projectId && projectId !== prevProps.match.params.projectId) {
			this.fetchProjectDetails();
		}
	}

	render() {
		const { contributors, details, error, fetching } = this.props;
		const hasDetails = details || contributors;

		return (
			<div className="main">
				{
					!hasDetails &&
					<h3>Please select a project.</h3>
				}
				{
					error &&
					<div className="page-error">{error}</div>
				}
				{
					fetching &&
					<Loading />
				}
				<>
					{
						details &&
						<div className="details">
							<h2>{details.full_name}</h2>
							<p>{details.description}</p>
							<ul className="meta-data">
								<li>Subscribers ({details.subscribers_count})</li>
								<li>Watchers ({details.watchers})</li>
								<li>Open issues ({details.open_issues})</li>
								<li>Forks ({details.forks})</li>
								<li>License ({details.license.name})</li>
							</ul>
						</div>
					}
					{
						contributors && contributors.length > 0 &&
						<div className="contributor-list">
							<h3>Contributors({contributors.length})</h3>
							<Thumbnail list={contributors}/>
						</div>
					}
				</>
			</div>
		);
	}
}

ProjectDetails.propTypes = {
	details: PropTypes.shape({
		id: PropTypes.number,
		description: PropTypes.string,
		full_name: PropTypes.string,
		open_issues: PropTypes.number,
		forks: PropTypes.number,
		license: PropTypes.shape({
			name:PropTypes.string
		}),
		subscribers_count: PropTypes.number,
		watchers: PropTypes.number
	}),
	contributors: PropTypes.array
};

ProjectDetails.defaultProps = {
	projects: [],
};
