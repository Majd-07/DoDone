import React, { useRef } from "react";
import ReactDOM from "react-dom";
import "@atlaskit/css-reset"; // import css library
import { DragDropContext } from "react-beautiful-dnd";
import initialData from "./initial-data";
import Column from "./Column.jsx";

//import App from './App';

const App = () => {
  const onDragEnd = (initialData) => {};

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {initialData.columnOrder.map((columnId) => {
        const column = initialData.columns[columnId];
        const tasks = column.taskIds.map((taskId) => initialData.tasks[taskId]);
        return <Column key={column.id} column={column} tasks={tasks} />;
      })}
    </DragDropContext>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
