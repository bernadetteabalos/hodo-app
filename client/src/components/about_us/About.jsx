import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import from other components
import Navigation from "../Navigation";

// import styling
import "../../stylesheets/css/about.css";
import Confetti from "./buttonClick";
import { useEffect } from "react/cjs/react.development";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const About = (props) => {
  const { currentUser, setCurrentUser, showLogin, setShowLogin, setIdTitle } =
    props;
  const [count, setCount] = useState(1000);

  useEffect(() => {
    if (currentUser.id) {
      setShowLogin("logout");
    }
  }, []);

  console.log("this is my current user on line 13 from about--->", currentUser);

  const confetti = () => {
    setCount(count + 1000);
  };

  return (
    <>
      <Navigation
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        setIdTitle={setIdTitle}
      />
      <div className="about-page title thick">
        <h1 className="aboutTitle">ABOUT US</h1>
        <div className="about-people">
          <div className="card-one">
            <div className="person bold pop">
              <div className="flip-card-inner">
                <div className="one-front">
                  <h1>Bernadette Abalos</h1>
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
                </div>
              </div>
            </div>
          </div>
        </div>
        <br></br>
        <div className="about-stack">
          <h1 className="techStack">Our Tech Stack</h1>
        </div>
        <div className="stack-list">
          <h3>
            React Express PostgreSQL WebSocket Bootstrap Konva Socket.io SASS
            and CSS
          </h3>
        </div>
        <div className="thank-you">
          <h1 className="techStack">
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
