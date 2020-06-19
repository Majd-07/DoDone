import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';

const Container = styled.div`
	border: 1px solid transparent;
	border-radius: 10px;
	padding: 8px;
	margin-bottom: 8px;
	background-color: ${(props) => (props.isDragging ? 'lightgreen' : '#d4016b')};
`;
const useStyles = makeStyles((theme) => ({
	iconButton: {
		padding: 10,
	},
}));
const Task = (props) => {
	const classes = useStyles();
	return (
		<Draggable draggableId={props.task.id} index={props.index}>
			{(provided, snapshot) => (
				<Container
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
					isDragging={snapshot.isDragging}>
					<div className='task-board'>
						<input
							type='text'
							id={props.task.id}
							value={props.task.content}
							onChange={(e) =>
								props.handleTaskInput(e.target.value, props.task.id)
							}
						/>
						{/* <button
							onClick={props.handleDeleteBtn}
							value={props.task.id}
							className='delete-Btn'>
							x
						</button> */}
						<IconButton
							onClick={() => props.handleDeleteBtn(props.task.id)}
							value={props.task.id}
							className={classes.iconButton}
							color='primary'>
							<DeleteIcon style={{ color: '#fce4ec' }} fontSize='small' />
						</IconButton>
					</div>
				</Container>
			)}
		</Draggable>
	);
};

export default Task;
