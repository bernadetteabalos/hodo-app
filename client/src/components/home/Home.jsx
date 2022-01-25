import { useEffect, useContext } from "react";

// import other Component and from providers
import Navigation from "../Navigation";
import { currentUserContext } from "../../providers/UserProvider";
import { navContext } from "../../providers/NavProvider";

// import from other local files
import logo from "../../images/hodo_v3.png";
import landing from "../../images/landing1.png";
import landingTwo from "../../images/landing2.png";

// import styling
import "../../stylesheets/css/home.css";

const Home = () => {
  const { profileLogoutShow, loginRegisterShow } = useContext(navContext);
  const { currentUser } = useContext(currentUserContext);

  // upon render, checks if user is logged in. Loggin in, calls fcn to display 'profile' and 'logout' btns. Else, 'login', and 'register' btns
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
      <Navigation />
      {/* ************ HOME PAGE WITH LOGO ************/}
      <div className="home-page">
        <img data-aos="zoom-in-up" src={logo} alt="hodo-logoo" />
      </div>
      <div data-aos="fade" className="landing-image">
        <img data-aos="fade-up" src={landing} alt="hodo-landing-1" />
        <h3 data-aos="fade-up" >HodoApp is a collaborative whiteboarding software.</h3>
        <h4 data-aos="fade-up">Especially with the transition into the remote world,
        <br />
        HodoApp aims to make the creative process easy and interactive.
        <br />
        <br />
        <i className="bi bi-chevron-down"></i>
        </h4>
      </div>
      <div data-aos="fade" className="landing-imageTwo">
        <img data-aos="fade-up" src={landingTwo} alt="hodo-landing-1" />
        <h3 data-aos="fade-up" >Use HodoApp for anything, and everything.</h3>
        <h4 data-aos="fade-up">From planning social activities to team brainstorming,
        <br/>
        HodoApp provides a platform for users to get creative!
        </h4>
      </div>
    </>
  );
};

export default Home;
