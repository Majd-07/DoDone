import React, { useState } from "react";
import initialData from "../initial-data";
import db from "../firebaseConfig";

const Sort = (props) => {
  const [data, setData] = useState(initialData);
  const fetchData = async () => {
    const res = await db.collection("ToDo").get();
    const DB = res.docs.map((data) => data.data());
    setData(DB[0]);
    console.log(DB);
  };

  //const arrOfColumns = Object.entries(data.columns);
  //console.log(arrOfColumns);

  //const arrOfTasks = arrOfColumns.map((task) => task.taskIds);
  //const arrOfTasksContent = arrOfTasks.map((arr) => arr);
  //console.log(arrOfTasksContent);

  for (let [key] of Object.entries(data.columns)) {
    console.log([key]);
    //console.log(`${data.columns[key].id}`);

    //data.columns[key].taskIds = data.columns[key].taskIds.sort();
  }

  /*   const sortByTitleAz = () => {
    //const sortedAz = arrOfTasksContent.sort();
    //return sortedAz;
    console.log("sorted");
  };

  const sortByTitleZa = () => {
    //const sortedZa = arrOfTasksContent.sort().reverse();
    //return sortedAz;
    console.log("sorted");
  }; */
  console.log(props);
  return (
    <div className="popup">
      <h4>Sort By</h4>
      <ul>
        <li>
          <a onClick={(e) => props.handleSortAz(props.taskIds)} href="#">
            Sort By Title (A-Z)
          </a>
        </li>
        <li>
          <a onClick={props.handleSortZa} href="#">
            Sort By Title (Z-A)
          </a>
        </li>
        <li>
          <a href="#">Sort By Due Data (ACS)</a>
        </li>
        <li>
          <a href="#">Sort By Due Date (DCS)</a>
        </li>
      </ul>
    </div>
  );
};

export default Sort;

//export { sortByTitleAz };
//export { sortByTitleZa };

/* const arrOfTasks = Object.values(data.tasks);
  const contentOfTasks = arrOfTasks.map((obj) => obj.content);
  const sortByTitleAz = () => {
    const sortedAz = contentOfTasks.sort();
    console.log("sorted", sortedAz);
  }; */
