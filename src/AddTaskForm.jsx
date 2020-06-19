import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import AddCircleIcon from "@material-ui/icons/AddCircle";
//import "./index.css";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(0),
  },
  width: 200,
}));

export default function AddTaskForm(props) {
  const classes = useStyles();
  //console.log(props);
  const [task, setTask] = useState({ taskName: { id: "", content: "" } });
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
    setTask({ taskName: { id: "", content: "" } });
    console.log(task[Object.keys(task)].content);
    console.log("btn clicked to submit");
  };
  return (
    <div className={classes.margin}>
      <Grid container spacing={1} alignItems="flex-end">
        <Grid item>
          <form id="add-new-task-form" onSubmit={handleAddNewTask}>
            <TextField
              type="text"
              name="stageName"
              placeholder="Add New Task"
              onChange={(e) => handleTaskInput(e)}
              id={props.id}
              value={task[Object.keys(task)].content}
              label="Add new task"
              size="small"
            />
            <button type="submit">
              <AddCircleIcon fontSize="small" />
            </button>
          </form>
        </Grid>
      </Grid>
    </div>
  );
}
