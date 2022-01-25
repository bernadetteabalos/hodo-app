// showLogin and setShowLogin

import axios from "axios";
import { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";

export const navContext = createContext();

const NavProvider = (props) => {
  // const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState("login");

  const loginShow = () => {
    setShowLogin("login");
  };

  const logoutShow = () => {
    setShowLogin("logout");
  };

  const profileLogoutShow = () => {
    setShowLogin("profile-logout");
  };

  const loginRegisterShow = () => {
    setShowLogin("login-register");
  };

  const registerShow = () => {
    setShowLogin("register");
  };

  const providerData = {
    showLogin,
    profileLogoutShow,
    loginShow,
    logoutShow,
    loginRegisterShow,
    registerShow,
  };
  const Provider = navContext.Provider;
  return <Provider value={providerData}>{props.children}</Provider>;
};

export default NavProvider;
