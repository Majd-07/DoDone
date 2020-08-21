import React from 'react'
// import initialData from '../initial-data';
// import db from '../firebaseConfig';
// import Button from "@material-ui/core/Button";
// import Menu from "@material-ui/core/Menu";
import MenuItem from '@material-ui/core/MenuItem'
// import Fade from "@material-ui/core/Fade";

const Sort = (props) => {
	// const [anchorEl, setAnchorEl] = React.useState(null);
	// const open = Boolean(anchorEl);

	// const handleClick = (event) => {
	//   setAnchorEl(event.currentTarget);
	// };

	// const handleClose = () => {
	//   setAnchorEl(null);
	// };
	return (
		<div className='popup'>
			<h4>Sort By</h4>

			<MenuItem onClick={(e) => props.handleSortAz(props.column)}>
				Sort By Title (A-Z)
			</MenuItem>
			<MenuItem onClick={(e) => props.handleSortZa(props.column)}>
				Sort By Title (Z-A)
			</MenuItem>
		</div>
	)
}

export default Sort

/* <ul>
        
        <li>
          <a onClick={(e) => props.handleSortZa(props.column)} href="#">
            Sort By Title (Z-A)
          </a>
        </li>
      </ul>
<li>
          <a onClick={(e) => props.handleSortAz(props.column)} href="#">
            Sort By Title (A-Z)
          </a>
        </li> */
