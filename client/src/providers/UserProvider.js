import axios from "axios";
import { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";

export const currentUserContext = createContext();

const CurrentUserProvider = (props) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  const login = (email, password) => {
    // axios request to check if user's credentials matches those in database
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

  const providerData = { currentUser, login };
  const Provider = currentUserContext.Provider;
  return <Provider value={providerData}>{props.children}</Provider>;
};

export default CurrentUserProvider;
