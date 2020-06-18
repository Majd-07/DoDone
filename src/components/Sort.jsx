import React, { useState } from 'react';
// import initialData from '../initial-data';
// import db from '../firebaseConfig';

const Sort = (props) => {
	return (
		<div className='popup'>
			<h4>Sort By</h4>
			<ul>
				<li>
					<a onClick={(e) => props.handleSortAz(props.column)} href='#'>
						Sort By Title (A-Z)
					</a>
				</li>
				<li>
					<a onClick={(e) => props.handleSortZa(props.column)} href='#'>
						Sort By Title (Z-A)
					</a>
				</li>
				<li>
					<a href='#'>Sort By Due Data (ACS)</a>
				</li>
				<li>
					<a href='#'>Sort By Due Date (DCS)</a>
				</li>
			</ul>
		</div>
	);
};

export default Sort;
