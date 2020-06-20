// import React, { useState, useEffect } from 'react';
// import initialData from '../initial-data';
// import db from '../firebaseConfig';
// import { data, setData } from '../App';
// //export const [data, setData] = useState(initialData);
// export const fetchData = async () => {
// 	const res = await db.collection('ToDo').get();
// 	const DB = res.docs.map((data) => data.data());
// 	setData(DB[0]);
// };

// export const handlePostFirebase = (e) => {
// 	db.collection('ToDo').add(e);
// };
// export const handleUpdateFirebase = (e) => {
// 	db.collection('ToDo').doc('OYOcvEIrXuxkKLo5Ndb9').update(e);
// };
// export const handleUpdateColumnsFirebase = (e) => {
// 	db.collection('columns').doc('LQdCpnOyXZib1pObRUlM').update(e);
// };
// export const handleUpdateTasksFirebase = (e) => {
// 	db.collection('tasks').doc('v1rprG5YWMpnZxcvObuL').update(e);
// 	console.log(db.collection('tasks'));
// };

// export const onDragEnd = (result) => {
// 	const { destination, source, draggableId } = result;
// 	if (!destination) {
// 		return;
// 	}

// 	if (
// 		destination.droppableId === source.droppableId &&
// 		destination.index === source.index
// 	) {
// 		return;
// 	}

// 	const startColumn = data.columns[source.droppableId];
// 	const finishColumn = data.columns[destination.droppableId];
// 	if (startColumn === finishColumn) {
// 		const newTaskIds = Array.from(startColumn.taskIds);
// 		newTaskIds.splice(source.index, 1);
// 		newTaskIds.splice(destination.index, 0, draggableId);

// 		const newColumn = {
// 			...startColumn,
// 			taskIds: newTaskIds,
// 		};

// 		const newState = {
// 			...data,
// 			columns: {
// 				...data.columns,
// 				[newColumn.id]: newColumn,
// 			},
// 		};
// 		console.log('same column');
// 		setData(newState);
// 		handleUpdateFirebase(newState);
// 		// handleUpdateColumnsFirebase(newState.columns);
// 		// handleUpdateTasksFirebase(newState.tasks);
// 		return;
// 	}
// 	// Moving tasks form column to another
// 	const startTaskIds = Array.from(startColumn.taskIds);
// 	startTaskIds.splice(source.index, 1);
// 	const newStartColumn = {
// 		...startColumn,
// 		taskIds: startTaskIds,
// 	};
// 	const finishTaskIds = Array.from(finishColumn.taskIds);
// 	finishTaskIds.splice(destination.index, 0, draggableId);
// 	const newFinishColumn = {
// 		...finishColumn,
// 		taskIds: finishTaskIds,
// 	};
// 	const newState = {
// 		...data,
// 		columns: {
// 			...data.columns,
// 			[newStartColumn.id]: newStartColumn,
// 			[newFinishColumn.id]: newFinishColumn,
// 		},
// 	};
// 	setData(newState);
// 	handleUpdateFirebase(newState);
// 	// handleUpdateColumnsFirebase(newState.columns);
// 	// handleUpdateTasksFirebase(newState.tasks);
// 	return;
// };
// export const addNewTask = (newTask) => {
// 	const addTask = {
// 		...data,
// 		tasks: {
// 			...data.tasks,
// 			...newTask,
// 		},
// 		columns: {
// 			...data.columns,
// 			'column-1': {
// 				...data.columns['column-1'],
// 				taskIds: [
// 					...data.columns['column-1'].taskIds,
// 					newTask[Object.keys(newTask)].id,
// 				],
// 			},
// 		},
// 	};
// 	setData(addTask);
// };
// export const addNewColumn = (e) => {
// 	console.log(e.target.value);
// 	e.preventDefault();
// 	const addColumn = {
// 		...data,
// 		tasks: {
// 			...data.tasks,
// 			//	'task-1': { id: 'task-1', content: 'Take out the garbage' },
// 		},
// 		columns: {
// 			...data.columns,
// 			[e.target.previousSibling.value]: {
// 				id: e.target.previousSibling.value,
// 				title: e.target.previousSibling.value,
// 				taskIds: [],
// 			},
// 		},
// 		columnOrder: [...data.columnOrder, e.target.previousSibling.value],
// 	};
// 	setData(addColumn);
// };
// export const handleDeleteBtn = (e) => {
// 	delete data.tasks[`${e.target.value}`];
// 	let columnsWithOutDeletedTask = {
// 		'': {
// 			id: '',
// 			title: '',
// 			taskIds: [],
// 		},
// 	};
// 	for (let [key] of Object.entries(data.columns)) {
// 		columnsWithOutDeletedTask = {
// 			[`${data.columns[key].id}`]: {
// 				...data.columns[key],
// 				taskIds: [
// 					...data.columns[key].taskIds.filter(
// 						(taskId) => taskId !== e.target.value
// 					),
// 				],
// 			},
// 		};
// 		Object.assign(data.columns, columnsWithOutDeletedTask);
// 	}
// 	const deletedTask = {
// 		...data,
// 		tasks: {
// 			...data.tasks,
// 		},
// 	};

// 	setData(deletedTask);
// 	handleUpdateFirebase(deletedTask);
// };

// export const handleTaskInput = (text, id) => {
// 	for (let [key] of Object.entries(data.tasks)) {
// 		if (key === id) {
// 			data.tasks[key].content = text;
// 			setData({
// 				...data,
// 				tasks: {
// 					...data.tasks,
// 					[data.tasks[key]]: {
// 						...data.tasks[key],
// 						content: data.tasks[key].content,
// 					},
// 				},
// 			});
// 			handleUpdateFirebase(data);
// 		}
// 	}
// };

// export const sortByTitleAz = (column) => {
// 	const sortedTasks = column.taskIds.sort((a, b) => {
// 		if (
// 			data.tasks[a].content.toUpperCase() > data.tasks[b].content.toUpperCase()
// 		) {
// 			return 1;
// 		} else if (
// 			data.tasks[a].content.toUpperCase() < data.tasks[b].content.toUpperCase()
// 		) {
// 			return -1;
// 		} else {
// 			return 0;
// 		}
// 	});
// };
// export const sortByTitleZa = (column) => {
// 	const sortedTasks = column.taskIds.sort((a, b) => {
// 		if (
// 			data.tasks[a].content.toUpperCase() > data.tasks[b].content.toUpperCase()
// 		) {
// 			return -1;
// 		} else if (
// 			data.tasks[a].content.toUpperCase() < data.tasks[b].content.toUpperCase()
// 		) {
// 			return 1;
// 		} else {
// 			return 0;
// 		}
// 	});
// };
