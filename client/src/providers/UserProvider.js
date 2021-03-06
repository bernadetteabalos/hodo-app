/*********** currentUser and setCurrentUser. For the purposes of passing currentUser state throughout the app. */

import { useState, createContext } from "react";

// import from other libraries
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const currentUserContext = createContext();

const CurrentUserProvider = (props) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});

  // axios request to check if user's credentials matches those in database
  const loginMainProfile = (email, password) => {
    const urlOneUserApi = `/api/users/login`;
    axios
      .post(urlOneUserApi, {
        email,
        password,
      })
      // axios request returns json data with either msg(w/ error msg to client) ex {msg: 'incorrect credentials'}
      .then((res) => {
        if (res.data.msg) {
          // display msg to user if incorrect credentials
          alert(res.data.msg);
        } else {
          // sets current user object to user data found in db {id: 1, first_name: 'mario', last_name: 'test', etc...}
          setCurrentUser(res.data);
          // setShowLogin to logout to display logout in the nav bar
          //  setShowLogin("logout");
          // redirects user to the profile page
          navigate("/profile");
        }
      })
      // prints any error
      .catch((err) => console.log(err.message));
  };

  const logoutMainProfile = () => {
    setCurrentUser({});
  };

  const registerMainProfile = (
    first_name,
    last_name,
    email,
    password,
    profile_photo
  ) => {
    // axios request add user to database
    const urlPostApi = "/api/users/register";
    axios
      .post(urlPostApi, {
        first_name,
        last_name,
        email,
        password,
        profile_photo,
      })
      .then((res) => {
        if (res.data.msg) {
          // alert user if there is an error (eg 'user with email already exists')
          alert(res.data.msg);
        } else {
          // set current user to the one that was just added to the db
          setCurrentUser(res.data);
          // setShowLogin to logout to display logout in the nav bar
          // logoutShow();
          // redirects user to the profile page
          navigate("/profile");
        }
      })
      .catch((err) => console.log(err.message));
  };

  const providerData = {
    currentUser,
    loginMainProfile,
    logoutMainProfile,
    registerMainProfile,
  };
  const Provider = currentUserContext.Provider;
  return <Provider value={providerData}>{props.children}</Provider>;
};

export default CurrentUserProvider;
