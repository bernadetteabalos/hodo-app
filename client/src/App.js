import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import other Components
import Home from "./components/home/Home";
import Profile from "./components/logged_in/Profile";
import Login from "./components/login_register/Login";
import Register from "./components/login_register/Register";
import Navigation from "./components/Navigation";
import About from "./components/about_us/About";
import MainStage from "./components/board/MainStage";

// import styles
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./stylesheets/css/App.css";

function App() {
  const [currentUser, setCurrentUser] = useState({});

  return (
    <div className="App">
      {/* ******DIFFERNT ROUTES */}
      <Router>
        <Routes>
          <Route
            path="/about"
            element={
              <About
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          <Route
            path="/login"
            element={<Login setCurrentUser={setCurrentUser} />}
          />
          <Route
            path="/register"
            element={
              <Register
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          {currentUser.id && (
            <Route
              path="/profile"
              element={
                <Profile
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            />
          )}
          <Route
            path="/board/:id"
            element={<MainStage currentUser={currentUser} />}
          />
          <Route
            path="/"
            element={
              <Home currentUser={currentUser} setCurrentUser={setCurrentUser} />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
