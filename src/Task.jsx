import React, { Component } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: white;
`;
const Task = (props) => {
  console.log(props);
  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {
            // we have problem here in: innerRef={provided.innerRef}
          }
          {props.task.content}
        </Container>
      )}
    </Draggable>
  );
};

export default Task;
