import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset'; // import css library
import { DragDropContext } from 'react-beautiful-dnd';
import initialData from './initial-data';
import Column from './Column.jsx';

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

		const column = data.columns[source.droppableId];
		const newTaskIds = Array.from(column.taskIds);
		newTaskIds.splice(source.index, 1);
		newTaskIds.splice(destination.index, 0, draggableId);

		const newColumn = {
			...column,
			taskIds: newTaskIds,
		};

		const newData = {
			...data,
			columns: {
				...data.columns,
				[newColumn.id]: newColumn,
			},
		};
		setData(newData);
	};
	return (
		<DragDropContext onDragEnd={onDragEnd}>
			{data.columnOrder.map((columnId) => {
				const column = data.columns[columnId];
				const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);
				return <Column key={column.id} column={column} tasks={tasks} />;
			})}
		</DragDropContext>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));
