import React from 'react';
import styled from 'styled-components';
const Title = styled.h3`
	padding: 8px;
	background-color: skyblue;
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
			//  onSubmit={props.onClickHandle}
			>
				<Title>Add Stage</Title>
				<input type='text' name='stageName' placeholder='Stage Name' />
				<button type='submit' onClick={props.onClickHandle}>
					+
				</button>
			</form>
		</Container>
	);
};
export default Button;
