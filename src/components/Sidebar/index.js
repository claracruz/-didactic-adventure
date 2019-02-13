import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './index.scss';

export const Sidebar = ({ list, items }) => {

	if (!items.length) {
		return <div className="empty-message">No projects found</div>;
	}

	return (
		<>
			<ul className="nav">
				{
					items.map((item) => {
						return(
							<li key={item.id} className="nav-item">
								<NavLink
									activeClassName="selected"
									to={`/${item.full_name}/${item.id}`}>
									<span>{item.name} ({item.watchers})</span>
								</NavLink>
							</li>
						)
					})
				}
			</ul>
		</>

	);
};

Sidebar.propTypes = {
	items: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number,
			name: PropTypes.string,
			full_name: PropTypes.string,
			watchers: PropTypes.number
		})
	)
};


Sidebar.defaultProps = {
	items: [],
};


