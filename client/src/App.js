import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

// import other Components
import Home from "./components/home/Home";
import Profile from "./components/logged_in/Profile";
import Login from "./components/login_register/Login";
import Register from "./components/login_register/Register";
import About from "./components/about_us/About";
import MainStage from "./components/board/MainStage";

// import styling
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./stylesheets/css/App.css";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [showLogin, setShowLogin] = useState("login");
  const [idTitle, setIdTitle] = useState([]);

  AOS.init();

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
                showLogin={showLogin}
                setShowLogin={setShowLogin}
                setIdTitle={setIdTitle}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                setCurrentUser={setCurrentUser}
                showLogin={showLogin}
                setShowLogin={setShowLogin}
                setIdTitle={setIdTitle}
              />
            }
          />
          <Route
            path="/register"
            element={
              <Register
                setCurrentUser={setCurrentUser}
                showLogin={showLogin}
                setShowLogin={setShowLogin}
                setIdTitle={setIdTitle}
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
                  showLogin={showLogin}
                  setShowLogin={setShowLogin}
                  idTitle={idTitle}
                  setIdTitle={setIdTitle}
                />
              }
            />
          )}
          {currentUser.id && (
            <Route
              path="/board/:id"
              element={
                <MainStage
                  currentUser={currentUser}
                  showLogin={showLogin}
                  setShowLogin={setShowLogin}
                />
              }
            />
          )}
          <Route
            path="/"
            element={
              <Home
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                showLogin={showLogin}
                setShowLogin={setShowLogin}
                setIdTitle={setIdTitle}
              />
            }
          />
          <Route
            path="*"
            element={
              <Home
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                showLogin={showLogin}
                setShowLogin={setShowLogin}
                setIdTitle={setIdTitle}
              />
            }
            replace={"/"}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
