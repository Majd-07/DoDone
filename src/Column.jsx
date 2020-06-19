import React from "react";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import Task from "./Task";
import Sort from "./components/Sort";
import AddTaskForm from "./AddTaskForm";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import "./index.css";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "15px",
    backgroundColor: "#EBECF0",
  },
}));

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 220px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  position: relative;
  overflow: scroll;
`;
const Title = styled.h4`
  padding: 8px;
  background-color: #ebecf0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 0;
`;

const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props) => (props.isDraggingOver ? "f2f3f7" : "#EBECF0")};
  flex-grow: 1;
  min-height: 100px;
`;

const Column = (props) => {
  const classes = useStyles();

  const [showPopOver, setShowPopOver] = React.useState(false);
  const onClick = () => !setShowPopOver(!showPopOver);

  const [column, setColumn] = [];
  console.log(props);
  return (
    <Paper elevation={3} className={classes.root}>
      <span className="mySpan" onClick={onClick}>
        ...
      </span>
      {showPopOver ? (
        <Sort
          handleSortAz={props.handleSortAz}
          handleSortZa={props.handleSortZa}
          taskIds={props.column.taskIds}
        />
      ) : null}
      <Title>{props.column.title}</Title>

      <Droppable
        droppableId={props.column.id}
        // type={props.column.id === 'column-3' ? 'active' : 'done'}
      >
        {(provided, snapshot) => (
          <TaskList
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {props.tasks.map((task, index) => (
              <Task
                key={task.id}
                task={task}
                index={index}
                handleDeleteBtn={props.handleDeleteBtn}
                handleTaskInput={props.handleTaskInput}
              />
            ))}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
      {props.column.title === "To Do" && (
        <AddTaskForm addNewTask={props.addNewTask} id={props.column.id} />
      )}
    </Paper>
  );
};

export default Column;
