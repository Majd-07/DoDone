import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset'; // import css library
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import initialData from './initial-data';
import Column from './Column.jsx';
const Container = styled.div`
	display: flex;
`;
//import App from './App';

const App = () => {
	const [data, setData] = useState(initialData);
	const onDragEnd = (result) => {
		console.log('onDragDrop');
		const { destination, source, draggableId } = result;
		// console.log(destination);
		// console.log(source);
		//	console.log(draggableId);
		if (!destination) {
			return;
		}

		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return;
		}

		const startColumn = data.columns[source.droppableId];
		const finishColumn = data.columns[destination.droppableId];
		if (startColumn === finishColumn) {
			const newTaskIds = Array.from(startColumn.taskIds);
			newTaskIds.splice(source.index, 1);
			newTaskIds.splice(destination.index, 0, draggableId);

			const newColumn = {
				...startColumn,
				taskIds: newTaskIds,
			};

			const newState = {
				...data,
				columns: {
					...data.columns,
					[newColumn.id]: newColumn,
				},
			};
			setData(newState);
			return;
		}
		// Moving tasks form column to another
		const startTaskIds = Array.from(startColumn.taskIds);
		startTaskIds.splice(source.index, 1);
		const newStartColumn = {
			...startColumn,
			taskIds: startTaskIds,
		};
		const finishTaskIds = Array.from(finishColumn.taskIds);
		finishTaskIds.splice(destination.index, 0, draggableId);
		const newFinishColumn = {
			...finishColumn,
			taskIds: finishTaskIds,
		};
		const newState = {
			...data,
			columns: {
				...data.columns,
				[newStartColumn.id]: newStartColumn,
				[newFinishColumn.id]: newFinishColumn,
			},
		};
		setData(newState);
		return;
	};
	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Container>
				{data.columnOrder.map((columnId) => {
					const column = data.columns[columnId];
					const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);
					return <Column key={column.id} column={column} tasks={tasks} />;
				})}
			</Container>
		</DragDropContext>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));
