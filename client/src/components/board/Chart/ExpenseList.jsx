import React, { useContext, useState, useEffect } from "react";
import ExpenseItem from "./ExpenseItem";
import { AppContext } from "./AppContext";
import { Button } from "react-bootstrap";
import axios from "axios";

const ExpenseList = (props) => {
  const { currentUser, currentBoard } = props;
  const { expenses, dispatch } = useContext(AppContext);

  const [filteredExpenses, setfilteredExpenses] = useState(expenses || []);

  useEffect(() => {
    setfilteredExpenses(expenses);
  }, [expenses]);

  const handleChange = (event) => {
    const searchResults = expenses.filter((filteredExpense) =>
      filteredExpense.name.toLowerCase().includes(event.target.value)
    );
    setfilteredExpenses(searchResults);
  };

  const handleSaveBudget = (event) => {
    event.preventDefault();
    // axios put request to update the expenses in the database.
    axios
      .put("/api/users/expenses", { expenses, currentUser, currentBoard })
      .then((res) => {
        // res.data is {id: 2, expenses_metadata: '{"{\\"id\\":\\"16db732b-00de-4260-bad5-9b4a1535ab4c\\"…ame\\":\\"fds\\",\\"cost\\":2,\\"color\\":\\"#9c27b0\\"}"}', user_board_id: 1}

        // will need to JSON.stringify
        console.log("omg back to client, ", res.data["expenses_metadata"]);
        // the above is the array of expenses

        // console.log(typeof res.data["expenses_metadata"]);
        // const stringExpense = res.data["expenses_metadata"];
        // console.log("stringExpense---->", stringExpense);

        // const jsonStringExpense = JSON.stringify(stringExpense);
        // console.log("jsonStringExpense--->", jsonStringExpense);

        // const objectExpense = JSON.parse(jsonStringExpense);

        // console.log("objectExpense--->", objectExpense);

        // const expenseObj = JSON.parse(res.data["expenses_metadata"]);

        console.log("lkdfjldksjflkdjs");
        // console.log("wowwww", expenseObj);

        // dispatch({
        //   type: "SAVE_EXPENSE",
        //   payload: props.id,
        // });
      });
  };

  return (
    <>
      <input
        type="text"
        class="form-control mb-2 mr-sm-2"
        placeholder="Type to search..."
        onChange={handleChange}
      />
      <ul class="list-group mt-3 mb-3">
        {filteredExpenses.map((expense) => (
          <ExpenseItem
            id={expense.id}
            name={expense.name}
            cost={expense.cost}
            color={expense.color}
          />
        ))}
      </ul>
      <Button onClick={handleSaveBudget}>Save List</Button>
    </>
  );
};

export default ExpenseList;
