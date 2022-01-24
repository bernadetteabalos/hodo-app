import { useEffect, useContext } from "react";

// import other Component
import Navigation from "../Navigation";
import { currentUserContext } from "../../providers/UserProvider";

// import from other local files
import logo from "../../images/hodo_v3.png";

// import styling
import "../../stylesheets/css/home.css";

const Home = (props) => {
  const { showLogin, setShowLogin, setIdTitle } = props;

  const { currentUser } = useContext(currentUserContext);

  console.log("what is by currentUser in home line 18--->", currentUser);

  // upon render, checks if user is logged in. Loggin in, display 'profile' and 'logout' btns. Else, 'login', and 'register' btns
  useEffect(() => {
    // if (currentUser.id) {
    //   setShowLogin("profile-logout");
    // } else {
    //   setShowLogin("login-register");
    // }
  }, []);
  return (
    <>
      {/* ************ NAVIGATION BAR ************/}
      <Navigation
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        setIdTitle={setIdTitle}
      />
      {/* ************ HOME PAGE WITH LOGO ************/}
      <div className="home-page">
        <img src={logo} alt="hodo-logoo" />
      </div>
    </>
  );
};

export default Home;
