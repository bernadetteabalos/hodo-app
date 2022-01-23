import { useState } from "react";
// import from other libraries
import { Link, useNavigate } from "react-router-dom";

import { Button, Modal } from "react-bootstrap";
import logo from "../images/hodoapp (2).png";
//styling
import "../stylesheets/css/navigation.css";

const Navigation = (props) => {
  const navigate = useNavigate();
  const { setCurrentUser, showLogin, setShowLogin, setIdTitle, saveBoard } =
    props;

  const [showBackToProfile, setShowBackToProfile] = useState(false);

  const login = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  const register = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  const back = (e) => {
    e.preventDefault();
    setShowLogin("logout");
    navigate("/profile");
  };

  const logout = (e) => {
    e.preventDefault();
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
                src={logo}
                width="120"
                height="100"
                className="d-inline-block align-top img-logo"
                alt="Hodo logo"
              />
            </Link>
          </div>
          <div className="home-profile-about">
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
        </div>
        <div className="nav-right">
          {showLogin === "login" && (
            <div className="link-btn">
              <Button variant="success" className="login-btn" onClick={login}>
                Login
              </Button>
            </div>
          )}
          {showLogin === "register" && (
            <div className="link-btn">
              <Button variant="success" onClick={register}>
                Register
              </Button>
            </div>
          )}
          {showLogin === "login-register" && (
            <div className="link-btn">
              <Button variant="success" className="login-btn" onClick={login}>
                Login
              </Button>
            </div>
          )}
          {showLogin === "login-register" && (
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
            <Button
              variant="success"
              className="base-btn"
              onClick={() => setShowBackToProfile(true)}
            >
              Back To Profile
            </Button>
          )}
          <Modal show={showBackToProfile}>
            <Modal.Header id="exit-header">
              <i
                class="bi bi-x exit-btn"
                onClick={() => {
                  setShowBackToProfile(false);
                }}
              ></i>
              {/* <Modal.Title>
                Did you want to save before going back to profile?
              </Modal.Title> */}
            </Modal.Header>
            <Modal.Body>
              Did you want to save before going back to profile?
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="primary"
                onClick={() => {
                  saveBoard();
                  navigate("/profile");
                }}
              >
                Yes, save board
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  navigate("/profile");
                }}
              >
                No
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default Navigation;
