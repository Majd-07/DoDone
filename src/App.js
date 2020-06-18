import React, { useState, useEffect } from 'react';
import '@atlaskit/css-reset'; // import css library
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import db from './firebaseConfig';
import initialData from './initial-data';
import emptyData from './emptyData';
import Column from './Column.jsx';
import Button from './Button';
import './index.css';
import NestedList from './components/List';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
const Container = styled.div`
	display: flex;
`;
const App = () => {
	const [data, setData] = useState(initialData);
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
		//fetchData();
		console.log('data fetching');
	}, []);

	const onDragEnd = (result) => {
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
		setData(newState);
		handleUpdateFirebase(newState);
		// handleUpdateColumnsFirebase(newState.columns);
		// handleUpdateTasksFirebase(newState.tasks);
		return;
	};
	const addNewTask = (newTask) => {
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
		setData(addTask);
	};
	const addNewColumn = (e) => {
		console.log(e.target.value);
		e.preventDefault();
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
		setData(addColumn);
	};
	const handleDeleteBtn = (e) => {
		delete data.tasks[`${e.target.value}`];
		let columnsWithOutDeletedTask = {
			'': {
				id: '',
				title: '',
				taskIds: [],
			},
		};
		for (let [key] of Object.entries(data.columns)) {
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
		}
		const deletedTask = {
			...data,
			tasks: {
				...data.tasks,
			},
		};

		setData(deletedTask);
		handleUpdateFirebase(deletedTask);
	};

	const handleTaskInput = (text, id) => {
		for (let [key] of Object.entries(data.tasks)) {
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
		}
	};
	// const compare = (a, b) => {
	// 	// Use toUpperCase() to ignore character casing

	// 	const bandA = a.band.toUpperCase();
	// 	const bandB = b.band.toUpperCase();

	// 	let comparison = 0;
	// 	if (bandA > bandB) {
	// 		comparison = 1;
	// 	} else if (bandA < bandB) {
	// 		comparison = -1;
	// 	}
	// 	return comparison;
	// };

	//singers.sort(compare);
	const sortByTitleAz = (column) => {
		const sortedTasks = column.taskIds.sort((a, b) => {
			if (
				data.tasks[a].content.toUpperCase() >
				data.tasks[b].content.toUpperCase()
			) {
				return 1;
			} else if (
				data.tasks[a].content.toUpperCase() <
				data.tasks[b].content.toUpperCase()
			) {
				return -1;
			} else {
				return 0;
			}
		});
	};
	const sortByTitleZa = (column) => {
		const sortedTasks = column.taskIds.sort((a, b) => {
			if (
				data.tasks[a].content.toUpperCase() >
				data.tasks[b].content.toUpperCase()
			) {
				return -1;
			} else if (
				data.tasks[a].content.toUpperCase() <
				data.tasks[b].content.toUpperCase()
			) {
				return 1;
			} else {
				return 0;
			}
		});
	};

	//Handle Changing display layout
	const [state, setState] = React.useState({
		checkedA: false,
		checkedB: true,
	});

	const handleDisplayLayoutChange = (event) => {
		setState({ ...state, [event.target.name]: event.target.checked });

		console.log('display change layout');
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<header>
				<h2>To Do</h2>
				<br />
				{/* <Typography component='div'>
				<Grid component='label' container alignItems='center' spacing={1}>
					<Grid item>Off</Grid>
					<Grid item> */}
				{<span style={{ color: 'white' }}>Grid</span>}
				<Switch
					checked={state.checkedA}
					onChange={handleDisplayLayoutChange}
					name='checkedA'
					inputProps={{ 'aria-label': 'secondary checkbox' }}
				/>
				{<span style={{ color: 'white' }}>List</span>}
				{/* </Grid>
					<Grid item>On</Grid>
				</Grid>
			</Typography> */}
			</header>

			<Container className='App'>
				{data.columnOrder.map((columnId) => {
					const column = data.columns[columnId];
					const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);
					return (
						<React.Fragment>
							{state.checkedA ? (
								<NestedList column={column} tasks={tasks} />
							) : (
								<Column
									key={column.id}
									column={column}
									tasks={tasks}
									addNewTask={addNewTask}
									handleDeleteBtn={handleDeleteBtn}
									handleTaskInput={handleTaskInput}
									handleSortAz={sortByTitleAz}
									handleSortZa={sortByTitleZa}
									handleDisplayLayoutChange={handleDisplayLayoutChange}
									// handleTaskInput={handleTaskInput}
									// handleAddNewTask={handleAddNewTask}
								/>
							)}
						</React.Fragment>
					);
				})}
				<Button addNewColumn={addNewColumn} />
			</Container>
		</DragDropContext>
	);
};
export default App;
