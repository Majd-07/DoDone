import React, { useState } from "react";
import initialData from "../initial-data";
import db from "../firebaseConfig";

const ColumnsFilter = () => {
  const [data, setData] = useState(initialData);
  const fetchData = async () => {
    const res = await db.collection("ToDo").get();
    const DB = res.docs.map((data) => data.data());
    setData(DB[0]);
  };

  const loadOptions = () => {
    const arrOfColumns = Object.values(data.columns);
    const titlesOfColumns = arrOfColumns.map((obj) => obj.title);
    //return titlesOfColumns;
    //console.log(titlesOfColumns);

    const optionsTitles = titlesOfColumns.map((title, key) => {
      console.log(title);
      return (
        <option key={key} value={title.value}>
          {title}
        </option>
      );
    });
    return optionsTitles;
  };

  return (
    <select onClick={loadOptions} className="react-select-container">
      <option value="Select">Select</option>
      {loadOptions}
    </select>
  );
};
export default ColumnsFilter;
