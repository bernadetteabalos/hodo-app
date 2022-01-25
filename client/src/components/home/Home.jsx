import { useEffect } from "react";

// import other Component
import Navigation from "../Navigation";

// import from other local files
import logo from "../../images/hodo_v3.png";
import landing from "../../images/landing1.png";
import landingTwo from "../../images/landing2.png";

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
        <i class="bi bi-chevron-down"></i>
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
