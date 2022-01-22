import "bootstrap/dist/css/bootstrap.min.css";
import AddExpense from "./AddExpense";
import ExpenseList from "./ExpenseList";
// import { AppProvider } from "./AppContext";
// import { useState } from "react";
import PieChart from "./PieChart";
// import PieChart from "./Components/PieGraph";

const MainExample = (props) => {
  const { currentUser, currentBoard } = props;
  // const [expense, setExpense] = useState({
  //   name: "Flight Tickets",
  //   cost: 2000,
  // });

  return (
    <>
      <PieChart />
      {/* <div>
        <PieChart name={expense.name} cost={expense.cost} />
      </div> */}
      <div className="container">
        <h3 className="mt-3">Expenses</h3>
        <div className="row ">
          <div className="col-sm">
            <ExpenseList
              currentUser={currentUser}
              currentBoard={currentBoard}
            />
          </div>
        </div>
        <h3 className="mt-3">Add Expense</h3>
        <div className="mt-3">
          <div className="col-sm">
            <AddExpense />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainExample;
