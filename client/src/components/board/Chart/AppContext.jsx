import { createContext, useReducer } from "react";

const AppReducer = (state, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };
    case "DELETE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense.id !== action.payload
        ),
      };
    case "SAVE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense.id !== action.payload
        ),
      };

    default:
      return state;
  }
};

// want the inital state to be JSON.stringify(get expenses['expenses_metadata'])
const initialState = { expenses: [] };
// const initialState = {
//   expenses: [
//     { id: 11, name: "Flight Tickets", cost: 1200, color: "pink" },
//     { id: 12, name: "Hotel Fees", cost: 800, color: "red" },
//     { id: 13, name: "Shopping", cost: 1500, color: "orange" },
//     { id: 14, name: "Amenities", cost: 1000, color: "yellow" },
//     { id: 15, name: "Food", cost: 700, color: "blue" },
//   ],
// };

export const AppContext = createContext();

export const AppProvider = (props) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  return (
    <AppContext.Provider
      value={{
        expenses: state.expenses,
        dispatch,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
