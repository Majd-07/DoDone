import React from "react";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import Task from "./Task";
import Sort from "./components/Sort";
import AddTaskForm from "./AddTaskForm";
const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 220px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  position: relative;
`;
const Title = styled.h3`
  padding: 8px;
  background-color: lightgrey;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props) =>
    props.isDraggingOver ? "skyblue" : "#9266ff"};
  flex-grow: 1;
  min-height: 100px;
`;

const Column = (props) => {
  const [showPopOver, setShowPopOver] = React.useState(false);
  const onClick = () => !setShowPopOver(!showPopOver);

  const [column, setColumn] = [];
  console.log(props);
  return (
    <Container>
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
      {props.column.title === "To Do" && (
        <AddTaskForm addNewTask={props.addNewTask} id={props.column.id} />
      )}
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
    </Container>
  );
};

export default Column;
