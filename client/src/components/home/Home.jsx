import { useEffect, useContext } from "react";

// import other Component
import Navigation from "../Navigation";
import { currentUserContext } from "../../providers/UserProvider";
import { navContext } from "../../providers/NavProvider";

// import from other local files
import logo from "../../images/hodo_v3.png";

// import styling
import "../../stylesheets/css/home.css";

const Home = (props) => {
  const { setIdTitle } = props;
  const { profileLogoutShow, loginRegisterShow } = useContext(navContext);
  const { currentUser } = useContext(currentUserContext);

  // upon render, checks if user is logged in. Loggin in, display 'profile' and 'logout' btns. Else, 'login', and 'register' btns
  useEffect(() => {
    if (currentUser.id) {
      profileLogoutShow();
    } else {
      loginRegisterShow();
    }
  }, []);
  return (
    <>
      {/* ************ NAVIGATION BAR ************/}
      <Navigation setIdTitle={setIdTitle} />
      {/* ************ HOME PAGE WITH LOGO ************/}
      <div className="home-page">
        <img src={logo} alt="hodo-logoo" />
      </div>
    </>
  );
};

export default Home;
