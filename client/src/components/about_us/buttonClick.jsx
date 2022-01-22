import ReactCanvasConfetti from "react-canvas-confetti";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlassCheers } from "@fortawesome/free-solid-svg-icons";

const canvasStyles = {
  position: "fixed",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
};

export default class Confetti extends React.Component {
  constructor(props) {
    super(props);
    this.animationInstance = null;
  }
  makeShot = (particleRatio, opts) => {
    this.animationInstance({
      ...opts,
      origin: { y: 0.7 },
      particleCount: Math.floor(200 * particleRatio),
    });
  };

  fire = () => {
    this.makeShot(0.25, {
      spread: 33,
      startVelocity: 55,
    });

    this.makeShot(0.2, {
      spread: 90,
    });

    this.makeShot(0.35, {
      spread: 150,
      decay: 0.91,
      scalar: 0.8,
    });

    this.makeShot(0.1, {
      spread: 250,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    this.makeShot(0.1, {
      spread: 300,
      startVelocity: 45,
    });
  };

  handlerFire = () => {
    this.fire();
  };

  getInstance = (instance) => {
    this.animationInstance = instance;
  };

  render() {
    return (
      <div style={{ display: "flex", alignSelf: "center" }}>
        <span onClick={this.handlerFire}>
          <FontAwesomeIcon icon={faGlassCheers} />
        </span>
        <ReactCanvasConfetti
          refConfetti={this.getInstance}
          style={canvasStyles}
        />
      </div>
    );
  }
}
