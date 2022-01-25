import { useState, useContext } from "react";
import { Routes, Route } from "react-router-dom";

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

import { currentUserContext } from "./providers/UserProvider";

function App() {
  // const [currentUser, setCurrentUser] = useState({});

  const { currentUser } = useContext(currentUserContext);

  console.log("what is currentUser App--->", currentUser);

  const [showLogin, setShowLogin] = useState("login");
  const [idTitle, setIdTitle] = useState([]);

  return (
    <div className="App">
      {/* ******DIFFERNT ROUTES */}
      <Routes>
        <Route
          path="/about"
          element={
            <About
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
              <MainStage showLogin={showLogin} setShowLogin={setShowLogin} />
            }
          />
        )}
        <Route
          path="/"
          element={
            <Home
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
              showLogin={showLogin}
              setShowLogin={setShowLogin}
              setIdTitle={setIdTitle}
            />
          }
          replace={"/"}
        />
      </Routes>
    </div>
  );
}

export default App;
