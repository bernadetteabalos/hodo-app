import { useEffect } from "react";

//import other Component
import Navigation from "../Navigation";

// import styling
import "../../stylesheets/css/home.css";

const Home = (props) => {
  const { currentUser, setCurrentUser, showLogin, setShowLogin, setIdTitle } =
    props;

  useEffect(() => {
    if (currentUser.id) {
      setShowLogin("profile-logout");
    } else {
      setShowLogin("login-register");
    }
  }, []);
  return (
    <>
      <Navigation
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        setIdTitle={setIdTitle}
      />
      <div className="home-page">
        <img src="https://i.imgur.com/A8H3iYm.png" alt="hodo-logoo" />
      </div>
      <div className="bottom-page"></div>
    </>
  );
};

export default Home;
