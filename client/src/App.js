import "./stylesheets/css/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useApplicationData from "./hooks/useApplicationData";

// import other Components
import Home from "./components/home/Home";
import Profile from "./components/logged_in/Profile";
import Login from "./components/login_register/Login";
import Register from "./components/login_register/Register";
import Navigation from "./components/Navigation";
import About from "./components/about_us/About";

function App() {
  // const { state, dispatch } = useApplicationData();

  // const userList = state.users.map((user) => (
  //   <li key={user.id}>
  //     {user.first_name} {user.last_name} {user.email}
  //   </li>
  // ));

  return (
    <div className="App">
      {/* <h1>Hello there from App</h1> */}
      {/* <ul>{userList}</ul>
      <h1>END</h1> */}

      {/* ******DIFFERNT ROUTES */}
      <Navigation />
      <Router>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user/1" element={<Profile />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
