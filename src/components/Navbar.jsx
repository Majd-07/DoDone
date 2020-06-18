import React from 'react';
import { NavLink } from 'react-router-dom';
import ColumnsFilter from './ColumnsFilter';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const link = {
	padding: '12px',
	margin: '0 6px 6px',
	textDecoration: 'none',
	color: 'white',
};

const Navbar = (props) => {
	const [state, setState] = React.useState({
		checkedA: true,
		checkedB: true,
	});

	// const handleDisplayLayoutChange = (event) => {
	// 	setState({ ...state, [event.target.name]: event.target.checked });
	// };

	return (
		<div className='Navbar'>
			<NavLink to='/' style={link}>
				Boards
			</NavLink>

			<NavLink to='/about' style={link}>
				About
			</NavLink>
			<ColumnsFilter />
			{/* <Typography component='div'>
				<Grid component='label' container alignItems='center' spacing={1}>
					<Grid item>Off</Grid>
					<Grid item> */}
			{/* {<span style={{ color: 'white' }}>Off</span>}
			<Switch
				checked={state.checkedA}
				onChange={props.handleDisplayLayoutChange}
				name='checkedA'
				inputProps={{ 'aria-label': 'secondary checkbox' }}
			/>
			{<span style={{ color: 'white' }}>On</span>} */}
			{/* </Grid>
					<Grid item>On</Grid>
				</Grid>
			</Typography> */}
		</div>
	);
};

export default Navbar;
