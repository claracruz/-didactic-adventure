import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

export const Thumbnail = ({list}) => {
	return (
		<ul className="contributors">
			{
				list.map((item) => {
					return(
						<li key={item.id} className="thumbnail">
							<a href={item.html_url} target="_blank" rel="noopener noreferrer">
							 <img src={item.avatar_url} alt={item.login}/>
							</a>
							<span>
								<a href={item.html_url} target="_blank" rel="noopener noreferrer">{item.login}</a>
							</span>
						</li>
					)
				})
			}
		</ul>

	);
};

Thumbnail.propTypes = {
	list: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number,
			login: PropTypes.string,
			avatar_url: PropTypes.string,
			html_url: PropTypes.string
		})
	)
};

Thumbnail.defaultProps = {
	list: [],
};



