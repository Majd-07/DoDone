import React, { useState, useEffect } from 'react';
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
const App = () => {
	const [data, setData] = useState(emptyData);

	const fetchData = async () => {
		const res = await db.collection('ToDo').get();
		const DB = res.docs.map((data) => data.data());
		setData(DB[0]);
	};

	const handlePostFirebase = (e) => {
		db.collection('ToDo').add(e);
	};
	const handleUpdateFirebase = (e) => {
		db.collection('ToDo').doc('OYOcvEIrXuxkKLo5Ndb9').update(e);
	};
	const handleUpdateColumnsFirebase = (e) => {
		db.collection('columns').doc('LQdCpnOyXZib1pObRUlM').update(e);
	};
	const handleUpdateTasksFirebase = (e) => {
		db.collection('tasks').doc('v1rprG5YWMpnZxcvObuL').update(e);
		console.log(db.collection('tasks'));
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
			handleUpdateFirebase(newState);
			// handleUpdateColumnsFirebase(newState.columns);
			// handleUpdateTasksFirebase(newState.tasks);
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
		// handleUpdateColumnsFirebase(newState.columns);
		// handleUpdateTasksFirebase(newState.tasks);
		return;
	};
	const addNewTask = (newTask) => {
		console.log(newTask);
		console.log(newTask[Object.keys(newTask)].id);
		console.log(Object.keys(newTask));
		const addTask = {
			...data,
			tasks: {
				...data.tasks,
				...newTask,
			},
			columns: {
				...data.columns,
				'column-1': {
					...data.columns['column-1'],
					taskIds: [
						...data.columns['column-1'].taskIds,
						newTask[Object.keys(newTask)].id,
					],
				},
			},
		};

		console.log(addTask);
		setData(addTask);
	};
	const addNewColumn = (e) => {
		e.preventDefault();
		console.log('btn clicked');
		//console.log(data);
		const addColumn = {
			...data,
			tasks: {
				...data.tasks,
				//	'task-1': { id: 'task-1', content: 'Take out the garbage' },
			},
			columns: {
				...data.columns,
				[e.target.previousSibling.value]: {
					id: e.target.previousSibling.value,
					title: e.target.previousSibling.value,
					taskIds: [],
				},
			},
			columnOrder: [...data.columnOrder, e.target.previousSibling.value],
		};
		console.log(addColumn);
		setData(addColumn);
	};
	const handleDeleteBtn = (e) => {
		console.log('dlete btn clicked');
		console.log(e.target.value);
		console.log(data.tasks[`${e.target.value}`]);
		console.log(data.tasks);
		delete data.tasks[`${e.target.value}`];
		let columnsWithOutDeletedTask = {
			'': {
				id: '',
				title: '',
				taskIds: [],
			},
		};
		for (let [key] of Object.entries(data.columns)) {
			console.log(key);
			// console.log(
			// 	data.columns[key].taskIds.filter((taskId) => taskId !== e.target.value)
			// );

			// data.columns[key].taskIds = data.columns[key].taskIds.filter(
			// 	(taskId) => taskId !== e.target.value
			// );

			// Object.assign(
			// 	columnsWithOutDeletedTask,
			// 	(data.columns[key].taskIds = data.columns[key].taskIds.filter(
			// 		(taskId) => taskId !== e.target.value
			// 	))
			// );
			console.log(`${data.columns[key].id}`);
			columnsWithOutDeletedTask = {
				[`${data.columns[key].id}`]: {
					...data.columns[key],
					taskIds: [
						...data.columns[key].taskIds.filter(
							(taskId) => taskId !== e.target.value
						),
					],
				},
			};
			Object.assign(data.columns, columnsWithOutDeletedTask);
			//	console.log(data.columns[key].taskIds);
			//	console.log(columnsWithOutDeletedTask);
			// setData({
			// 	...data,
			// 	columns: {
			// 		[data.columns[key]]: {
			// 			...[data.columns[key]],
			// 			taskIds: data.columns[key].taskIds.filter(
			// 				(taskId) => taskId !== e.target.value
			// 			),
			// 		},
			// 	},
			// });
		}
		const deletedTask = {
			...data,
			tasks: {
				...data.tasks,
			},
		};

		setData(deletedTask);
		handleUpdateFirebase(deletedTask);
		console.log(columnsWithOutDeletedTask);
		console.log(data);
	};

	const handleTaskInput = (text, id) => {
		console.log('contenet' + ' ' + text, id);
		for (let [key] of Object.entries(data.tasks)) {
			console.log(data.tasks[key]);
			if (key === id) {
				data.tasks[key].content = text;
				setData({
					...data,
					tasks: {
						...data.tasks,
						[data.tasks[key]]: {
							...data.tasks[key],
							content: data.tasks[key].content,
						},
					},
				});
				handleUpdateFirebase(data);
			}

			console.log(data.tasks[key].content);
		}
	};
	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<header>
				<h2>To Do</h2>
				<br />
			</header>
			<Container className='App'>
				{data.columnOrder.map((columnId) => {
					const column = data.columns[columnId];
					const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);
					console.log(tasks);
					return (
						<Column
							key={column.id}
							column={column}
							tasks={tasks}
							addNewTask={addNewTask}
							handleDeleteBtn={handleDeleteBtn}
							handleTaskInput={handleTaskInput}
							// handleTaskInput={handleTaskInput}
							// handleAddNewTask={handleAddNewTask}
						/>
					);
				})}
				<Button addNewColumn={addNewColumn} />
			</Container>
		</DragDropContext>
	);
};
export default App;
