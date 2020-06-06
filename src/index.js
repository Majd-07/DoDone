import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset'; // import css library
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import db from './firebaseConfig';
//import initialData from './initial-data';
import emptyData from './emptyData';
import Column from './Column.jsx';
import Button from './Button';
import './index.css';
const Container = styled.div`
	display: flex;
`;
//import App from './App';

const App = () => {
	const [data, setData] = useState(emptyData);
	const fetchData = async () => {
		const res = await db.collection('ToDo').get();
		const posts = res.docs.map((post) => post.data());
		console.log(posts[0]);
		setData(posts[0]);
		console.log(emptyData);
	};
	// useEffect(() => {
	//
	// });
	const handlePostFirebase = (e) => {
		db.collection('ToDo').add(e);
	};
	const handleUpdateFirebase = (e) => {
		db.collection('ToDo').doc('OYOcvEIrXuxkKLo5Ndb9').update(e);
	};

	useEffect(() => {
		fetchData();
		console.log('data fetching');
	}, []);

	const onDragEnd = (result) => {
		console.log('onDragDrop');
		const { destination, source, draggableId } = result;
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
			console.log('same column');
			setData(newState);
			// handlePostFirebase(newState);
			handleUpdateFirebase(newState);
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
		console.log('dif');
		setData(newState);
		handleUpdateFirebase(newState);
		return;
	};

	const onClickHandle = (e) => {
		e.preventDefault();
		console.log('btn clicked');
		console.log(data);
		const addColumn = {
			...data,
			tasks: {
				...data.tasks,
				'task-1': { id: 'task-1', content: 'Take out the garbage' },
			},
			columns: {
				...data.columns,
				[e.target.previousSibling.value]: {
					id: 'column-4',
					title: e.target.previousSibling.value,
					taskIds: [],
				},
			},
			columnOrder: [...data.columnOrder, e.target.previousSibling.value],
		};
		console.log(addColumn);
		setData(addColumn);
	};
	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Container>
				{data.columnOrder.map((columnId) => {
					const column = data.columns[columnId];
					const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);
					return <Column key={column.id} column={column} tasks={tasks} />;
				})}
				<Button onClickHandle={onClickHandle} />
			</Container>
		</DragDropContext>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));
