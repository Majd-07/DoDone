import React from 'react';
import styled from 'styled-components';
import './index.css';
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
	return (
		<Container>
			<form
				id='add-stage-form'
				//  onSubmit={props.addNewColumn}
			>
				{/* <Title>Add Stage</Title> */}
				<p>Add Stage</p>
				<div className='form-input-btn-wrapper'>
					<input type='text' name='stageName' placeholder='Enter Stage Name' />
					<button type='submit' onClick={props.addNewColumn}>
						+
					</button>
				</div>
			</form>
		</Container>
	);
};
export default Button;
