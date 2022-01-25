import { useState, useEffect, useContext } from "react";

// import from other libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import from other Components/providers
import Navigation from "../Navigation";
import { currentUserContext } from "../../providers/UserProvider";
import { navContext } from "../../providers/NavProvider";

// import styling
import "../../stylesheets/css/about.css";

// import for Confetti
import Confetti from "./buttonClick";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

// import images from local files
import bubbles from "../../images/bubbles.jpg";
import blossom from "../../images/blossom.jpeg";
import buttercup from "../../images/buttercup.jpg";

//import Stack Logos
import Bootstrap from "./images/Bootstrap.jpeg";
import Express from "./images/Express.jpeg";
import Konva from "./images/Konva.png";
import KonvaReact from "./images/KonvaReact.png";
import PostgreSQL from "./images/PostgreSQL.png";
import React from "./images/React.png";
import SASS from "./images/SASS.png";
import Socketio from "./images/Socketio.png";

const About = () => {
  const { currentUser } = useContext(currentUserContext);
  const { profileLogoutShow } = useContext(navContext);
  // for the counter state
  const [count, setCount] = useState(1000);

  // upon first render, checks if user is logged in. If so, calls fcn to display 'profile, logout' btn
  useEffect(() => {
    if (currentUser.id) {
      profileLogoutShow();
    }
  }, []);

  const confetti = () => {
    setCount(count + 1000);
  };

  return (
    <>
      <Navigation />
      <div className="about-page title thick">
        <h1> ABOUT US </h1>
        <div className="about-people">
          <div className="card-one">
            <div className="person bold pop">
              <div className="flip-card-inner">
                <div className="one-front">
                  <h1>Bernadette Abalos</h1>
                  <div className="profile-photo-about">
                    <img src={bubbles} />
                  </div>
                </div>
                <div className="one-back">
                  <h2 className="occupation">Full-Stack Web Developer</h2>
                  <br></br>
                  <p className="textAlign">
                    Former life sciences student who enjoys art and programming.
                  </p>
                  <p>
                    Follow me on &nbsp;
                    <a href={"https://github.com/bernadetteabalos"}>
                      <FontAwesomeIcon icon={faGithub} />
                      Github
                    </a>
                  </p>
                  <p>
                    Contact info &nbsp;
                    <a href={"mailto:bern.roseabalos@gmail.com"}>
                      <FontAwesomeIcon icon={faEnvelope} />
                      Gmail
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="card-two">
            <div className="person emphasize popsec">
              <div className="flip-inner">
                <div className="two-front">
                  <h1>Stephanie Li</h1>
                  <div className="profile-photo-about">
                    <img src={blossom} />
                  </div>
                </div>
                <div className="two-back">
                  <h2 className="occupation">Full-Stack Web Developer</h2>
                  <br></br>
                  <p className="textAlign">
                    Former pharmacist who discovered a love for coding.
                  </p>
                  <p>
                    Follow me on &nbsp;
                    <a href={"https://github.com/StephhyL"}>
                      <FontAwesomeIcon icon={faGithub} />
                      Github
                    </a>
                  </p>
                  <p>
                    Contact info &nbsp;
                    <a href={"mailto:stephanieli88947@gmail.com"}>
                      <FontAwesomeIcon icon={faEnvelope} />
                      Gmail
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="card-three">
            <div className="person outline popthird">
              <div className="flip-in">
                <div className="three-front">
                  <h1>Blesilda Mateo</h1>
                  <div className="profile-photo-about">
                    <img src={buttercup} />
                  </div>
                </div>
                <div className="three-back">
                  <h2 className="occupation">Full-Stack Web Developer</h2>
                  <br></br>
                  <p className="textAlign">
                    Former aviation student who meandered their way into the
                    world of web development
                  </p>
                  <p>
                    Follow me on &nbsp;
                    <a href={"https://github.com/BlesMateo"}>
                      <FontAwesomeIcon icon={faGithub} />
                      Github
                    </a>
                  </p>
                  <p>
                    Contact info &nbsp;
                    <a href={"mailto:blesildaangelicamateo@gmail.com"}>
                      <FontAwesomeIcon icon={faEnvelope} />
                      Gmail
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br></br>
        {/* ********* TECH STACK ******************** */}
        <div className="about-stack">
          <h1>Our Tech Stack</h1>
        </div>
        <div className="stack-list">
          <h3>
            <img src={Bootstrap} width="80" alt="bootstrap"></img>
            &nbsp; &nbsp;
            <img src={Express} width="100" alt="express"></img>
            &nbsp; &nbsp;
            <img src={KonvaReact} width="120" alt="konvareact"></img>
            &nbsp; &nbsp;
            <img src={Konva} width="120" alt="konva"></img>
            &nbsp; &nbsp;
            <img src={PostgreSQL} width="80" alt="postgresql"></img>
            &nbsp; &nbsp;
            <img src={React} width="100" alt="react"></img>
            &nbsp; &nbsp;
            <img src={SASS} width="80" alt="sass"></img>
            &nbsp; &nbsp;
            <img src={Socketio} width="80" alt="socketio"></img>
          </h3>
        </div>
        {/* ********* THANK YOU ******************** */}
        <div className="thank-you">
          <h1>
            THANK YOU x {count} & &nbsp;
            <button
              type="button"
              class="btn btn-outline-dark btn-lg"
              onClick={confetti}
            >
              <Confetti />
            </button>
            &nbsp; to our instructors and mentors at LHL!
          </h1>
          <span>It wouldn't be a LHL React project without a counter 😃</span>
        </div>
      </div>
    </>
  );
};

export default About;
