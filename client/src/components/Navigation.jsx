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

const Navigation = () => {
  const navigate = useNavigate();
  // deconstructing from useContext
  const { logoutMainProfile } = useContext(currentUserContext);
  const { showLogin, loginShow, logoutShow } = useContext(navContext);
  const { clearIdTitle } = useContext(idTitleContext);

  // activated when user clicks "login" button, redirects to "login page"
  const login = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  // activated when user clicks "register" button, redirects to "register page"
  const register = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  // activated when 'logout' button clicked: navigates to "home page", reset user to {}, show login btn, and clear idTitle array
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
        {/* displays only 'login' btn if user on 'register page' */}
        <div className="nav-right">
          {showLogin === "login" && (
            <div className="link-btn">
              <Button variant="success" className="login-btn" onClick={login}>
                Login
              </Button>
            </div>
          )}
          {/* displays only 'register' btn if user on 'login page' */}
          {showLogin === "register" && (
            <div className="link-btn">
              <Button variant="success" onClick={register}>
                Register
              </Button>
            </div>
          )}
          {/* displays both 'register' and 'login' btn if user not logged in and on 'home/about page' */}
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
          {/* display only 'logout' btn if user loggin in and on 'profile pg' */}
          {showLogin === "logout" && <Button onClick={logout}>Logout</Button>}
          {/* display both 'logout' btn and 'profile' link if user loggin in and on 'home/about pg' */}
          {showLogin === "profile-logout" && (
            <Button variant="success" onClick={logout}>
              Logout
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navigation;
