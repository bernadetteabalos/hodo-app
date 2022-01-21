import React, { useContext, useState } from "react";
import { AppContext } from "./AppContext";
import { v4 as uuidv4 } from "uuid";
import { CirclePicker } from "react-color";
import axios from "axios";

const AddExpense = (props) => {
  const { expenses, dispatch } = useContext(AppContext);

  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [color, setColor] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    const expense = {
      id: uuidv4(),
      name,
      cost: parseInt(cost),
      color,
    };

    console.log("this is the expense on addExpense--->", expense);
    dispatch({
      type: "ADD_EXPENSE",
      payload: expense,
    });

    setName("");
    setCost("");
    setColor("");
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="row">
        <div className="col-sm col-lg-4">
          <label for="name">Name</label>
          <input
            required="required"
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="col-sm col-lg-4">
          <label for="cost">Cost($)</label>
          <input
            required="required"
            type="number"
            className="form-control"
            id="cost"
            value={cost}
            onChange={(event) => setCost(event.target.value)}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-sm col-lg-4">
          <label for="cost">Colour</label>
          <CirclePicker
            color={color}
            onChange={(color) => setColor(color.hex)}
          />
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-sm">
          <button type="submit" class="btn btn-primary">
            Add
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddExpense;
