import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
const Container = styled.div`
	border: 1px solid transparent;
	border-radius: 2px;
	padding: 8px;
	margin-bottom: 8px;
	background-color: ${(props) => (props.isDragging ? 'lightgreen' : '#d4016b')};
`;
const Task = (props) => {
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
						<button
							onClick={props.handleDeleteBtn}
							value={props.task.id}
							className='delete-Btn'>
							x
						</button>
					</div>
				</Container>
			)}
		</Draggable>
	);
};

export default Task;
