import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './index.css';

export default function AddTaskForm(props) {
	//console.log(props);
	const [task, setTask] = useState({ taskName: { id: '', content: '' } });
	let x = 10;
	let taskName = `task${x}`;
	const handleTaskInput = (e) => {
		//let taskID = uuidv4();
		let taskID = Date.now();

		setTask({
			[`${taskID}`]: { id: `${taskID}`, content: e.target.value },
		});
	};
	const handleAddNewTask = (e) => {
		console.log(task);
		e.preventDefault();
		props.addNewTask(task);
		setTask({ taskName: { id: '', content: '' } });
		console.log(task[Object.keys(task)].content);
		console.log('btn clicked to submit');
	};
	return (
		<form id='add-new-task-form' onSubmit={handleAddNewTask}>
			<input
				type='text'
				name='stageName'
				placeholder='Add New Task'
				onChange={(e) => handleTaskInput(e)}
				id={props.id}
				value={task[Object.keys(task)].content}
			/>
			<button type='submit'>+</button>
		</form>
	);
}
