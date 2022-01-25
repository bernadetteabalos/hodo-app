// import from other libraries
import Button from "react-bootstrap/Button";
import { useState } from "react";

// styling
// import "../../stylesheets/css/leftbar.css";
import "../../stylesheets/css/mainstage.css";

const LeftBar = (props) => {
  // deconstructing the props
  const {
    fillColor,
    setFillColor,
    borderColor,
    setBorderColor,
    handleClick,
    url,
    setURL,
    resetUrl,
    tool,
    setTool,
    strokeColor,
    setStrokeColor,
    checkDeselect,
  } = props;

  const [state, setState] = useState({ showing: false });
  const [imagePlusButton, setImagePlusButton] = useState("image");
  const { showing } = state;
  const isPenActivated = tool === "pen";
  const isEraserActivated = tool === "eraser";
  const isSelectActivated = tool === "select";

  const handlePen = (e) => {
    setStrokeColor(e.target.value);
    setTool("pen");
    checkDeselect();
  };

  return (
    <div className="leftsidebar">
      <div className="select-a-color">
        <div className="icons">
          <input
            className="colorPicker"
            type="color"
            value={fillColor}
            onChange={(e) => {
              setFillColor(e.target.value)
            }}
          />
          <i className="bi bi-paint-bucket shapes shapesTwo"></i>
        </div>
        <div className="icons">
          <input
            type="color"
            value={borderColor}
            onChange={(e) => setBorderColor(e.target.value)}
          />
          <i className="bi bi-slash-lg shapes shapesTwo"></i>
        </div>
        <Button
          className="button-icons"
          variant="outline-secondary"
          onClick={() => handleClick("Rect", fillColor, borderColor)}
        >
          <div className="icons">
            <i className="bi bi-phone-landscape shapes"></i>
          </div>
        </Button>
        <Button
          className="button-icons"
          variant="outline-secondary"
          onClick={() => handleClick("Square", fillColor, borderColor)}
        >
          <div className="icons">
            <i className="bi bi-square shapes"></i>
          </div>
        </Button>
        <Button
          className="button-icons"
          variant="outline-secondary"
          onClick={() => handleClick("Circle", fillColor, borderColor)}
        >
          <div className="icons">
            <i className="bi bi-circle shapes"></i>
          </div>
        </Button>
        <Button
          className="button-icons"
          variant="outline-secondary"
          onClick={() => handleClick("Star", fillColor, borderColor)}
        >
          <div className="icons">
            <i className="bi bi-star shapes"></i>
          </div>
        </Button>
        <div className="texttools">
          <Button
            className="button-icons"
            variant="outline-secondary"
            onClick={() => handleClick("Text", fillColor, borderColor)}
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
            setImagePlusButton("image");
            if (url) {
              resetUrl();
            }
          }}
        >
          <input
            className="fade-in"
            style={{ display: imagePlusButton === "plus" ? "block" : "none" }}
            name="url"
            type="text"
            placeholder="Enter URL of Image"
            value={url}
            onChange={(e) => setURL(e.target.value)}
          />
        </form>
        {imagePlusButton === "image" && (
          <Button
            display={"none"}
            className="button-icons"
            variant="outline-secondary"
            onClick={() => {
              setImagePlusButton("plus");
              // resetUrl(); don't need this line
            }}
          >
            <div className="icons">
              <i className="bi bi-image shapes"></i>
            </div>
          </Button>
        )}
        {imagePlusButton === "plus" && (
          <Button
            className="button-icons"
            variant="outline-secondary"
            onClick={() => {
              setImagePlusButton("image");
              if (url) {
                resetUrl();
              }
            }}
          >
            <div className="icons">
              <i className="bi bi-plus-square shapes"></i>
            </div>
          </Button>
        )}
        {/* SELECT */}
        <Button
          className="button-icons"
          variant="outline-secondary"
          onClick={() => setTool("select")}
        >
          <div className="icons">
            <i
              style={{ display: isSelectActivated ? "flex" : "none" }}
              className="bi bi-hand-index-thumb-fill shapes"
            ></i>
            <i
              style={{ display: isSelectActivated ? "none" : "flex" }}
              className="bi bi-hand-index-thumb shapes"
            ></i>
          </div>
        </Button>
        {/* PEN */}
        <div
          className="icons"
          onClick={() => setTool(isPenActivated ? "select" : "pen")}
        >
          <input type="color" value={strokeColor} onChange={handlePen} />
          <i
            style={{ display: isPenActivated ? "flex" : "none" }}
            className="bi bi-pen-fill shapes"
          ></i>
          <i
            style={{ display: isPenActivated ? "none" : "flex" }}
            className="bi bi-pen shapes shapesTwo"
          ></i>
        </div>
        {/* Eraser */}
        <Button
          className="button-icons"
          variant="outline-secondary"
          onClick={() => setTool(isEraserActivated ? "select" : "eraser")}
        >
          <div className="icons">
            <i
              style={{ display: isEraserActivated ? "flex" : "none" }}
              className="bi bi-eraser-fill shapes"
            ></i>
            <i
              style={{ display: isEraserActivated ? "none" : "flex" }}
              className="bi bi-eraser shapes"
            ></i>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default LeftBar;
