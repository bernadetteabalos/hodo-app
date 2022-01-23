import { useEffect } from "react";

//import other Component
import Navigation from "../Navigation";

// import styling
import "../../stylesheets/css/home.css";

const Home = (props) => {
  const { currentUser, setCurrentUser, showLogin, setShowLogin, setIdTitle } =
    props;

  // upon render, checks if user is logged in. Loggin in, display 'profile' and 'logout' btns. Else, 'login', and 'register' btns
  useEffect(() => {
    if (currentUser.id) {
      setShowLogin("profile-logout");
    } else {
      setShowLogin("login-register");
    }
  }, []);
  return (
    <>
      {/* ************ NAVIGATION BAR ************/}
      <Navigation
        setCurrentUser={setCurrentUser}
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        setIdTitle={setIdTitle}
      />
      {/* ************ HOME PAGE WITH LOGO ************/}
      <div className="home-page">
        <img src="https://i.imgur.com/A8H3iYm.png" alt="hodo-logoo" />
        {/* <img src="https://i.imgur.com/293NPiy.png" alt="hodo-logoo" /> */}
      </div>
      <div className="bottom-page"></div>
    </>
  );
};

export default Home;
