import React, { useContext } from "react";
import { TiDelete } from "react-icons/ti";
import { AppContext } from "./AppContext";

import "./style.css";

const ExpenseItem = (props) => {
  const { dispatch } = useContext(AppContext);

  const handleDeleteExpense = () => {
    dispatch({
      type: "DELETE_EXPENSE",
      payload: props.id,
    });
  };

  console.log("props", props);

  return (
    <li
      className="list-group-item d-flex justify-content-between align-items-center"
      style={{ backgroundColor: props.color }}
    >
      {props.name}
      <div>
        <span className="money">${props.cost}</span>
        <TiDelete size="1.5em" onClick={handleDeleteExpense} />
      </div>
    </li>
  );
};

export default ExpenseItem;
