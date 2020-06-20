import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import './index.css';

const useStyles = makeStyles((theme) => ({
	root: {
		padding: '2px 4px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		margin: '0',
		position: 'absolute',
		left: '0',
		bottom: '0',
	},
	input: {
		marginLeft: theme.spacing(1),
		flex: 1,
		fontSize: 14,
		justifyContent: 'center',
	},
	iconButton: {
		padding: 10,
	},
	divider: {
		height: 28,
		margin: 4,
	},
	form: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		padding: '0 10px',
	},
}));

export default function AddTaskForm(props) {
	const classes = useStyles();
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
		props.addNewTask(task, props.id);
		setTask({ taskName: { id: '', content: '' } });
		//console.log(task[Object.keys(task)].content);
		//console.log("btn clicked to submit");
	};
	return (
		<Paper component='form' className={classes.root}>
			<form onSubmit={handleAddNewTask} className={classes.form}>
				<InputBase
					size='small'
					className={classes.input}
					placeholder='Add new task'
					onChange={(e) => handleTaskInput(e)}
					id={props.id}
					value={task[Object.keys(task)].content}
				/>
				<Divider className={classes.divider} orientation='vertical' />
				<IconButton
					type='submit'
					color='primary'
					className={classes.iconButton}
					aria-label='add-task'>
					<AddCircleIcon style={{ color: 'green' }} />
				</IconButton>
			</form>
		</Paper>
	);
}

/* 		<form id="add-new-task-form" onSubmit={handleAddNewTask}>
      <input
        type="text"
        name="stageName"
        placeholder="Add New Task"
        onChange={(e) => handleTaskInput(e)}
        id={props.id}
        value={task[Object.keys(task)].content}
      />
      <button type="submit">+</button>
    </form>; */
