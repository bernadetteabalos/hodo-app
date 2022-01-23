import { useState } from "react";

// import from other components
import Navigation from "../Navigation";

// import styling
import "../../stylesheets/css/about.css";
import { useEffect } from "react/cjs/react.development";

const About = (props) => {
  const { currentUser, setCurrentUser, showLogin, setShowLogin, setIdTitle } =
    props;
  const [count, setCount] = useState(1000);

  useEffect(() => {
    if (currentUser.id) {
      setShowLogin("profile-logout");
    }
  }, []);

  console.log("this is my current user on line 13 from about--->", currentUser);
  return (
    <>
      <Navigation
        setCurrentUser={setCurrentUser}
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        setIdTitle={setIdTitle}
      />
      <div className="about-page title">
        <h1>About Us</h1>
        <div className="about-people">
          <div className="person bold pop">
            <h1>Bernadette Abalos</h1>
          </div>
          <div className="person emphasize popsec">
            <h1>Stephanie Li</h1>
          </div>
          <div className="person outline popthird">
            <h1>Blesilda Mateo</h1>
          </div>
        </div>
        <div className="about-stack">
          <h1>Our Tech Stack:</h1>
        </div>
        <div className="thank-you">
          <h1>
            & THANK YOU x{count}
            <button
              onClick={() => {
                setCount(count + 1000);
              }}
            >
              <i className="fas fa-glass-cheers"></i> Cheer!
            </button>
            to our instructors and mentors at LHL!
          </h1>
          <span>It wouldn't be a LHL React project without a counter :) </span>
        </div>
      </div>
    </>
  );
};

export default About;
