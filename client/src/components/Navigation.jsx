import { useState, useContext } from "react";
// import from other libraries
import { Link, useNavigate } from "react-router-dom";

import { Button } from "react-bootstrap";
//styling
import "../stylesheets/css/navigation.css";

import { AppContext } from "./board/Chart/AppContext";

const Navigation = (props) => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser, showLogin, setShowLogin, setIdTitle } =
    props;

  const { expenses, dispatch } = useContext(AppContext);

  const clear = () => {
    dispatch({
      type: "CLEAR",
      payload: [],
    });
  };

  const home = () => {
    clear();
    navigate("/");
  };
  const about = () => {
    clear();
    navigate("/about");
  };
  const profile = () => {
    clear();
    navigate("/profile");
  };

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
    clear();
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
              <Button onClick={home}>Home</Button>
            </Link>
          </div>
          <div className="nav-link">
            <Link to="/about">
              <Button onClick={about}>About</Button>
            </Link>
          </div>
          {!showLogin && (
            <div className="nav-link">
              <Button onClick={profile}>Profile</Button>
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
