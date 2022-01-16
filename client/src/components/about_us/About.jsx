import { useState } from "react";
import "../../stylesheets/css/about.css";

const About = () => {
  const [count, setCount] = useState(1000);
  return (
    <div className="about-page">
      <h1>About Us</h1>
      <div className="about-people">
        <div className="person">
          <h1>Bernadette Abalos</h1>
        </div>
        <div className="person">
          <h1>Stephanie Li</h1>
        </div>
        <div className="person">
          <h1>Bleslinda Mateo</h1>
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
            +
          </button>
          to our instructors and mentors at LHL!
        </h1>
        <span>It wouldn't be a LHL React project without a counter :) </span>
      </div>
    </div>
  );
};

export default About;
