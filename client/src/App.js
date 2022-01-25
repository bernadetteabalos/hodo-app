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
  const { currentUser } = useContext(currentUserContext);

  return (
    <div className="App">
      {/* ******DIFFERNT ROUTES */}
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {currentUser.id && <Route path="/profile" element={<Profile />} />}
        {currentUser.id && <Route path="/board/:id" element={<MainStage />} />}
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Home />} replace={"/"} />
      </Routes>
    </div>
  );
}

export default App;
