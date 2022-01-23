// import from other libraries
import Button from "react-bootstrap/Button";
import { useState } from "react";

// styling
import "../../stylesheets/css/leftbar.css";
import "../../stylesheets/css/mainstage.css";

const LeftBar = (props) => {
  // deconstructing the props
  const {
    fillColor,
    setFillColor,
    strokeColor,
    setStrokeColor,
    handleClick,
    url,
    setURL,
    resetUrl,
    tool,
    setTool,
  } = props;

  const [state, setState] = useState({ showing: false });
  const { showing } = state;

  return (
    <div className="leftsidebar">
      <div className="select-a-color">
        <div className="icons">
          <input
            className="colorPicker"
            type="color"
            value={fillColor}
            onChange={(e) => setFillColor(e.target.value)}
          />
          <i className="bi bi-paint-bucket"></i>
        </div>
        <div className="icons">
          <input
            type="color"
            value={strokeColor}
            onChange={(e) => setStrokeColor(e.target.value)}
          />
          <i className="bi bi-pen-fill"></i>
        </div>

        <Button
          className="button-icons"
          variant="outline-secondary"
          onClick={() => handleClick("Rect", fillColor, strokeColor)}
        >
          <div className="icons">
            <i className="bi bi-phone-landscape shapes"></i>
          </div>
        </Button>

        <Button
          className="button-icons"
          variant="outline-secondary"
          onClick={() => handleClick("Square", fillColor, strokeColor)}
        >
          <div className="icons">
            <i className="bi bi-square shapes"></i>
          </div>
        </Button>
        <Button
          className="button-icons"
          variant="outline-secondary"
          onClick={() => handleClick("Circle", fillColor, strokeColor)}
        >
          <div className="icons">
            <i className="bi bi-circle shapes"></i>
          </div>
        </Button>
        <Button
          className="button-icons"
          variant="outline-secondary"
          onClick={() => handleClick("Star", fillColor, strokeColor)}
        >
          <div className="icons">
            <i className="bi bi-star shapes"></i>
          </div>
        </Button>

        <div className="texttools">
          <Button
            className="button-icons"
            variant="outline-secondary"
            onClick={() => handleClick("Text", fillColor, strokeColor)}
          >
            <div className="icons">
              <i className="bi bi-fonts shapes"></i>
            </div>
          </Button>
        </div>
        <form
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            className="fade-in"
            style={{ display: showing ? "block" : "none" }}
            name="url"
            type="text"
            placeholder="Enter URL of Image"
            value={url}
            onChange={(e) => setURL(e.target.value)}
          />
        </form>
        <Button
          className="button-icons"
          variant="outline-secondary"
          onClick={() => {
            setState({ showing: !showing });
            resetUrl();
          }}
        >
          <div className="icons">
            <i
              style={{ display: showing ? "none" : "flex" }}
              className="bi bi-image shapes"
            ></i>
            <i
              style={{ display: showing ? "flex" : "none" }}
              className="bi bi-plus-square shapes"
            ></i>
          </div>
        </Button>
      </div>
      {/* *****PEN TOOLS DROP DOWN***** */}
      <select
        value={tool}
        onChange={(e) => {
          setTool(e.target.value);
        }}
      >
        <option value="select">Select</option>
        <option value="pen">Pen</option>
        <option value="eraser">Eraser</option>
      </select>
    </div>
  );
};

export default LeftBar;
