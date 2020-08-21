import React from 'react'
import styled from 'styled-components'
import { Droppable } from 'react-beautiful-dnd'
import Task from './Task'
import Sort from './Sort'
import AddTaskForm from './AddTaskForm'
import Paper from '@material-ui/core/Paper'
//import Grid from "@material-ui/core/Grid";
//import { makeStyles } from '@material-ui/core/styles'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import IconButton from '@material-ui/core/IconButton'
const Container = styled.div`
	margin: 8px;
	border: 1px solid lightgrey;
	border-radius: 10px;
	width: 220px;
	display: flex;
	flex-direction: column;
	border-radius: 10px;
	position: relative;
	background-color: #ebecf0;
	position: relatieve;
`
const Title = styled.h4`
	padding: 8px;
	background-color: lightgrey;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	border-top-right-radius: 10px;
	border-top-left-radius: 10px;
`

const TaskList = styled.div`
	padding: 8px;
	transition: background-color 0.2s ease;
	background-color: ${(props) =>
		props.isDraggingOver ? 'skyblue' : '#9266ff'};
	flex-grow: 1;
	min-height: 100px;
	border-radius: 10px;
`

// const useStyles = makeStyles({
// 	root: {
// 		maxWidth: 345,
// 		backgroundColor: 'white',
// 	},
// 	grid: {
// 		flexGrow: 1,
// 	},
// })

const Column = (props) => {
	// const classes = useStyles();
	const [showPopOver, setShowPopOver] = React.useState(false)
	const onClick = () => !setShowPopOver(!showPopOver)

	//const [column, setColumn] = [];
	//console.log(props);
	return (
		<Container>
			<Title>
				{props.column.title}
				<IconButton
					onClick={onClick}
					size='small'
					style={{ backgroundColor: '#eee' }}>
					<MoreVertIcon fontSize='small' />
				</IconButton>
				{showPopOver ? (
					<Sort
						handleSortAz={props.handleSortAz}
						handleSortZa={props.handleSortZa}
						column={props.column}
					/>
				) : null}
			</Title>

			<Droppable
				droppableId={props.column.id}
				// type={props.column.id === 'column-3' ? 'active' : 'done'}
			>
				{(provided, snapshot) => (
					<TaskList
						ref={provided.innerRef}
						{...provided.droppableProps}
						isDraggingOver={snapshot.isDraggingOver}>
						{props.tasks.map((task, index) => (
							<Paper elevation={3}>
								<Task
									key={task.id}
									task={task}
									index={index}
									handleDeleteBtn={props.handleDeleteBtn}
									handleTaskInput={props.handleTaskInput}
								/>
							</Paper>
						))}
						{provided.placeholder}
					</TaskList>
				)}
			</Droppable>

			{props.column.title === 'To Do' && (
				<AddTaskForm addNewTask={props.addNewTask} id={props.column.id} />
			)}
		</Container>
	)
}

export default Column
