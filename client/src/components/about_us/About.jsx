import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import from other components
import Navigation from "../Navigation";

// import styling
import "../../stylesheets/css/about.css";
import Confetti from "./buttonClick";

const About = (props) => {
  const { currentUser, setCurrentUser, showLogin, setShowLogin, setIdTitle } =
    props;
  const [count, setCount] = useState(1000);

  console.log("this is my current user on line 13 from about--->", currentUser);

  const confetti = () => {
    setCount(count + 1000);
  };

  return (
    <div className="about-page title">
      <h1>About Us</h1>
      <div className="about-people">
        <div className="card-one">
          <div className="person bold pop">
            <div className="flip-card-inner">
              <div className="one-front">
                <h1>Bernadette Abalos</h1>
              </div>
              <div className="one-back">
                <p>Artist, Front and Back-End Dev</p>
              </div>
            </div>
          </div>
        </div>
        <div className="card-two">
          <div className="person emphasize popsec">
            <div className="flip-inner">
              <div className="two-front">
                <h1>Stephanie Li</h1>
              </div>
              <div className="two-back">
                <p>Pharmacist, Front and Back-End Dev</p>
              </div>
            </div>
          </div>
        </div>
        <div className="card-three">
          <div className="person outline popthird">
            <div className="flip-in">
              <div className="three-front">
                <h1>Blesilda Mateo</h1>
              </div>
              <div className="three-back">
                <p>Gamer, Front-End Dev</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br></br>
      <div className="about-stack">
        <h1>Our Tech Stack:</h1>
      </div>
      <div className="thank-you">
        <h1>
          & THANK YOU x {count} &nbsp;
          <button onClick={confetti}>
            <Confetti />
          </button>
          &nbsp; to our instructors and mentors at LHL!
        </h1>
        <span>It wouldn't be a LHL React project without a counter :) </span>
      </div>
    </div>
  );
};

export default About;
