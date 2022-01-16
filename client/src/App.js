import "./App.css";
import useApplicationData from "./hooks/useApplicationData";

function App() {
  const { state, dispatch } = useApplicationData();

  const userList = state.users.map((user) => (
    <li key={user.id}>
      {user.first_name} {user.last_name} {user.email}
    </li>
  ));

  return (
    <div className="App">
      <h1>Hello there from App</h1>
      <ul>{userList}</ul>
      <h1>END</h1>
    </div>
  );
}

export default App;
