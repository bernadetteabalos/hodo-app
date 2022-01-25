// showLogin and setShowLogin. For the purposes of the "dynamic" navigation bar.

import { useState, createContext } from "react";

export const navContext = createContext();

const NavProvider = (props) => {
  const [showLogin, setShowLogin] = useState("");

  // to display both the login and register buttons. Called when the user is not logged in and on "home or about page"
  const loginRegisterShow = () => {
    setShowLogin("login-register");
  };

  // to display the login button only. Called when user is on the "register page."
  const loginShow = () => {
    setShowLogin("login");
  };

  // to display the register button. Called when user is on the "login page."
  const registerShow = () => {
    setShowLogin("register");
  };

  // to display the logout button only. Called when the user is logged in and on the "profile page."
  const logoutShow = () => {
    setShowLogin("logout");
  };

  // to display the profile link and the logout button. Called when the user is logged in and on the "about page"
  const profileLogoutShow = () => {
    setShowLogin("profile-logout");
  };

  // to display back button. Called when user on /boards/:id ("board page")
  const backShow = () => {
    setShowLogin("back");
  };

  const providerData = {
    showLogin,
    loginRegisterShow,
    loginShow,
    registerShow,
    logoutShow,
    profileLogoutShow,
    backShow,
  };
  const Provider = navContext.Provider;
  return <Provider value={providerData}>{props.children}</Provider>;
};

export default NavProvider;
