import React, { useState, useEffect } from "react";
import "@atlaskit/css-reset"; // import css library
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import db from "./firebaseConfig";
import initialData from "./initial-data";
import emptyData from "./emptyData";
import Column from "./components/Column.jsx";
import Button from "./components/Button";
import "./index.css";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import NestedList from "./components/List";
import Switch from "@material-ui/core/Switch";
const Container = styled.div`
  display: flex;
`;
const App = () => {
  const [data, setData] = useState(initialData);
  const fetchData = async () => {
    const res = await db.collection("ToDo").get();
    const DB = res.docs.map((data) => data.data());
    setData(DB[0]);
  };

  const handlePostFirebase = (e) => {
    db.collection("ToDo").add(e);
  };
  const handleUpdateFirebase = (e) => {
    db.collection("ToDo").doc("OYOcvEIrXuxkKLo5Ndb9").update(e);
  };
  const handleUpdateColumnsFirebase = (e) => {
    db.collection("columns").doc("LQdCpnOyXZib1pObRUlM").update(e);
  };
  const handleUpdateTasksFirebase = (e) => {
    db.collection("tasks").doc("v1rprG5YWMpnZxcvObuL").update(e);
    console.log(db.collection("tasks"));
  };
  useEffect(() => {
    fetchData();
    console.log("data fetching");
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
      console.log("same column");
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
  const addNewTask = (newTask, id) => {
    if (newTask[Object.keys(newTask)].content) {
      const addTask = {
        ...data,
        tasks: {
          ...data.tasks,
          ...newTask,
        },
        columns: {
          ...data.columns,
          [`${id}`]: {
            ...data.columns[`${id}`],
            taskIds: [
              ...data.columns[`${id}`].taskIds,
              newTask[Object.keys(newTask)].id,
            ],
          },
        },
      };
      setData(addTask);
    } else {
      console.log("An empty task added");
      alert("You cant Add An empty task");
      return;
    }
  };
  const addNewColumn = (e, value) => {
    e.preventDefault();
    if (value) {
      let NewColumnID = Date.now();
      const addColumn = {
        ...data,
        tasks: {
          ...data.tasks,
          //	'task-1': { id: 'task-1', content: 'Take out the garbage' },
        },
        columns: {
          ...data.columns,
          [`${NewColumnID}`]: {
            id: `${NewColumnID}`,
            title: value,
            taskIds: [],
          },
        },
        columnOrder: [...data.columnOrder, `${NewColumnID}`],
      };

      setData(addColumn);
      handleUpdateFirebase(addColumn);
    } else {
      console.log("An empty column added");
      alert("You cant Add An empty Column Name");
      return;
    }
  };
  const handleDeleteBtn = (id) => {
    delete data.tasks[`${id}`];
    let columnsWithOutDeletedTask = {
      "": {
        id: "",
        title: "",
        taskIds: [],
      },
    };
    for (let [key] of Object.entries(data.columns)) {
      columnsWithOutDeletedTask = {
        [`${data.columns[key].id}`]: {
          ...data.columns[key],
          taskIds: [
            ...data.columns[key].taskIds.filter((taskId) => taskId !== id),
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
    console.log(column);
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
    console.log(sortedTasks);
    setData({
      ...data,
      columns: {
        ...data.columns,
        [column]: {
          ...data.columns[column],
          taskIds: sortedTasks,
        },
      },
    });
  };
  const sortByTitleZa = (column) => {
    console.log(column);
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
    console.log(sortedTasks);
    setData({
      ...data,
      columns: {
        ...data.columns,
        [column]: {
          ...data.columns[column],
          taskIds: sortedTasks,
        },
      },
    });
  };

  //Handle Changing display layout
  const [state, setState] = React.useState({
    checkedA: false,
    checkedB: true,
  });

  const handleDisplayLayoutChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });

    console.log("display change layout");
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }));
  const classes = useStyles();
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <header className="app-header">
        <h2>To Do</h2>
        <br />

        {<span style={{ color: "white" }}>Grid</span>}
        <Switch
          checked={state.checkedA}
          onChange={handleDisplayLayoutChange}
          name="checkedA"
          inputProps={{ "aria-label": "secondary checkbox" }}
        />
        {<span style={{ color: "white" }}>List</span>}
      </header>
      {state.checkedA ? (
        <Container className="App">
          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                To Do App
              </ListSubheader>
            }
            className={classes.root}
          >
            {data.columnOrder.map((columnId) => {
              const column = data.columns[columnId];
              const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);
              return <NestedList column={column} tasks={tasks} />;
            })}
          </List>
        </Container>
      ) : (
        <Container className="App">
          {data.columnOrder.map((columnId) => {
            const column = data.columns[columnId];
            const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);
            return (
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
            );
          })}
          <Button addNewColumn={addNewColumn} />
        </Container>
      )}
    </DragDropContext>
  );
};
export default App;
