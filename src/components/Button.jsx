import React, { useState } from 'react';
import styled from 'styled-components';
import '../index.css';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
		},
		iconButton: {
			padding: 10,
		},
		divider: {
			height: 28,
			margin: 4,
			color: 'black',
		},
	},
}));
const Title = styled.h3`
	padding: 8px;
	background-color: #9266ff;
`;
const Container = styled.div`
	margin: 8px;
	//border: 1px solid lightgrey;
	border-radius: 2px;
	//width: 220px;
	display: flex;
	flex-direction: column;
`;
const Button = (props) => {
	const classes = useStyles();
	const [inputValue, setInputValue] = useState('');
	const handleOnChange = (e) => {
		console.log(e);
		setInputValue(e.target.value);
	};
	return (
		<Container>
			<Paper>
				<form
					id='add-stage-form'
					//  onSubmit={props.addNewColumn}
				>
					{/* <Title>Add Stage</Title> */}

					<InputBase
						type='text'
						name='stageName'
						placeholder='Add another list'
						onChange={handleOnChange}
					/>
					<IconButton
						type='submit'
						onClick={(e) => props.addNewColumn(e, inputValue)}>
						<AddCircleIcon style={{ color: 'green' }} />
					</IconButton>
				</form>
			</Paper>
		</Container>
	);
};
export default Button;
