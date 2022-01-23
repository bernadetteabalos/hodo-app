import { useState } from "react";
// import from other libraries
import { Link, useNavigate } from "react-router-dom";

import { Button } from "react-bootstrap";
//styling
import "../stylesheets/css/navigation.css";

const Navigation = (props) => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser, showLogin, setShowLogin, setIdTitle } =
    props;

  const login = () => {
    navigate("/login");
  };

  const register = () => {
    navigate("/register");
  };

  const back = () => {
    setShowLogin("logout");
    navigate("/profile");
  };

  const logout = () => {
    navigate("/");
    setCurrentUser({});
    setShowLogin("login");
    setIdTitle([]);
  };

  return (
    <>
      <div className="navbar">
        <div className="logo">
          <div>
            <Link to="/">
              <img
                src="https://i.imgur.com/293NPiy.png"
                width="185"
                height="100"
                className="d-inline-block align-top"
                alt="Hodo logo"
              />
            </Link>
          </div>
          <div>
            <Link className="nav-link" to="/">
              <h3>Home</h3>
            </Link>
          </div>
          <div>
            <Link className="nav-link" to="/about">
              <h3>About</h3>
            </Link>
          </div>
          {showLogin === "profile-logout" && (
            <div>
              <Link className="nav-link" to="/profile">
                <h3>Profile</h3>
              </Link>
            </div>
          )}
        </div>
        <div className="nav-right">
          {showLogin === "login" && (
            <div className="link-btn">
              <Button variant="success" className="login-btn" onClick={login}>
                Login
              </Button>
            </div>
          )}
          {showLogin === "login" && (
            <div className="link-btn">
              <Button variant="success" onClick={register}>
                Register
              </Button>
            </div>
          )}
          {showLogin === "logout" && <Button onClick={logout}>Logout</Button>}
          {showLogin === "profile-logout" && (
            <Button variant="success" onClick={logout}>
              Logout
            </Button>
          )}
          {showLogin === "back" && (
            <Button variant="success" className="base-btn" onClick={back}>
              Back To Profile
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navigation;
