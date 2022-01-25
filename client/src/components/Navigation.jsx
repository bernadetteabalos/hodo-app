import { useContext } from "react";
// import from other libraries
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

// import from providers
import { currentUserContext } from "../providers/UserProvider";
import { navContext } from "../providers/NavProvider";
import { idTitleContext } from "../providers/TitleProvider";

// import from local files
import logo from "../images/hodo_v3.png";
//styling
import "../stylesheets/css/navigation.css";

const Navigation = (props) => {
  const navigate = useNavigate();
  const { logoutMainProfile } = useContext(currentUserContext);
  const { showLogin, loginShow, logoutShow } = useContext(navContext);
  const { clearIdTitle } = useContext(idTitleContext);

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
    logoutShow();
    navigate("/profile");
  };

  const logout = (e) => {
    e.preventDefault();
    navigate("/");
    logoutMainProfile();
    loginShow();
    clearIdTitle();
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
          {/* {showLogin === "back" && (
            <Button
              variant="success"
              className="base-btn"
              onClick={() => setShowBackToProfile(true)}
            >
              Back To Profile
            </Button>
          )} */}
          {/* <Modal show={showBackToProfile}>
            <Modal.Header id="exit-header">
              <i
                class="bi bi-x exit-btn"
                onClick={() => {
                  setShowBackToProfile(false);
                }}
              ></i>
            </Modal.Header>
            <Modal.Body>
              <h4>Save before going back to profile?</h4>
            </Modal.Body>
            <Modal.Footer>
              <Button
                size="lg"
                variant="primary"
                onClick={() => {
                  saveBoard();
                  navigate("/profile");
                }}
              >
                Yes, save board
              </Button>
              <Button
                size="lg"
                variant="secondary"
                onClick={() => {
                  navigate("/profile");
                }}
              >
                No
              </Button>
            </Modal.Footer>
          </Modal> */}
        </div>
      </div>
    </>
  );
};

export default Navigation;
