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

  const logout = () => {
    navigate("/");
    setCurrentUser({});
    setShowLogin(true);
    setIdTitle([]);
  };

  return (
    <>
      <div className="navbar">
        <div className="logo">
          <div>
            <Link to="/">
              <img
                src="https://media.istockphoto.com/photos/paper-plane-on-red-background-picture-id1358970693?b=1&k=20&m=1358970693&s=170667a&w=0&h=AgDbacTXHFKtBYvnkzpbL5k38J-o08iUx-6j7zPDo6Q="
                width="40"
                height="40"
                className="d-inline-block align-top"
                alt="Hodo logo"
              />
            </Link>
          </div>
          <div className="nav-link">
            <Link to="/">
              <h3>Home</h3>
            </Link>
          </div>
          <div className="nav-link">
            <Link to="/about">
              <h3>About</h3>
            </Link>
          </div>
          {!showLogin && (
            <div className="nav-link">
              <Link to="/profile">
                <h3>Profile</h3>
              </Link>
            </div>
          )}
        </div>
        <div className="nav-right">
          {showLogin && (
            <div className="nav-link">
              <Button onClick={login}>Login</Button>
            </div>
          )}
          {showLogin && (
            <div className="nav-link">
              <Button onClick={register}>Register</Button>
            </div>
          )}
          {!showLogin && <Button onClick={logout}>Logout</Button>}
        </div>
      </div>
    </>
  );
};

export default Navigation;
