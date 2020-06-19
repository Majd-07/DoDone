import React from 'react';

const Sort = (props) => {
	return (
		<div className='popup'>
			<h4>Sort By</h4>
			<ul>
				<li>
					<a onClick={(e) => props.handleSortAz(props.column)} href='#0'>
						Sort By Title (A-Z)
					</a>
				</li>
				<li>
					<a onClick={(e) => props.handleSortZa(props.column)} href='#0'>
						Sort By Title (Z-A)
					</a>
				</li>
				<li>
					<a href='#0'>Sort By Due Data (ACS)</a>
				</li>
				<li>
					<a href='#0'>Sort By Due Date (DCS)</a>
				</li>
			</ul>
		</div>
	);
};

export default Sort;
