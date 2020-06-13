import React, { useState } from "react";
import initialData from "../initial-data";
import db from "../firebaseConfig";

const Sort = () => {
  const [data, setData] = useState(initialData);
  const fetchData = async () => {
    const res = await db.collection("ToDo").get();
    const DB = res.docs.map((data) => data.data());
    setData(DB[0]);
  };

  const arrOfTasks = Object.values(data.tasks);
  const contentOfTasks = arrOfTasks.map((obj) => obj.content);

  const sortByTitleAz = () => {
    const sortedAz = contentOfTasks.sort();
    //return sortedAz;
    console.log("sorted", sortedAz);
  };

  const sortByTitleZa = () => {
    const sortedZa = contentOfTasks.sort().reverse();
    //return sortedAz;
    console.log("sorted", sortedZa);
  };

  return (
    <div className="popup">
      <h4>Sort By</h4>
      <ul>
        <li>
          <a onClick={sortByTitleAz} href="#">
            Sort By Title (A-Z)
          </a>
        </li>
        <li>
          <a onClick={sortByTitleZa} href="#">
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
