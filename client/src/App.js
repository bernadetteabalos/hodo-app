import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useApplicationData from "./hooks/forBoards";

// import other Components
import Home from "./components/home/Home";
import Profile from "./components/logged_in/Profile";
import Login from "./components/login_register/Login";
import Register from "./components/login_register/Register";
import Navigation from "./components/Navigation";
import About from "./components/about_us/About";
import MainStage from "./components/board/MainStage";

// import styles
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import "./stylesheets/css/App.css";

function App() {
  const [currentUser, setCurrentUser] = useState({});
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
      <Navigation currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Router>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route
            path="/login"
            element={<Login setCurrentUser={setCurrentUser} />}
          />
          <Route
            path="/register"
            element={<Register setCurrentUser={setCurrentUser} />}
          />
          <Route
            path="/profile"
            element={<Profile currentUser={currentUser} />}
          />
          <Route
            path="/board/:id"
            element={<MainStage currentUser={currentUser} />}
          />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
