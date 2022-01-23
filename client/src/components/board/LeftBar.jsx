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
  const isPenActivated = tool === 'pen';
  const isEraserActivated = tool === 'eraser';

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
          <i className="bi bi-paint-bucket shapes shapesTwo"></i>
        </div>
        <div className="icons">
          <input
            type="color"
            value={strokeColor}
            onChange={(e) => setStrokeColor(e.target.value)}
          />
          <i class="bi bi-pen-fill shapes shapesTwo"></i>
        </div>

        <Button
          className="button-icons"
          variant="outline-secondary"
          onClick={() => handleClick("Rect", fillColor, strokeColor)}
        >
          <div className="icons">
            <i class="bi bi-phone-landscape shapes"></i>
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
            <i class="bi bi-circle shapes"></i>
          </div>
        </Button>
        <Button
          className="button-icons"
          variant="outline-secondary"
          onClick={() => handleClick("Star", fillColor, strokeColor)}
        >
          <div className="icons">
            <i class="bi bi-star shapes"></i>
          </div>
        </Button>

        <div className="texttools">
          <Button
            className="button-icons"
            variant="outline-secondary"
            onClick={() => handleClick("Text", fillColor, strokeColor)}
          >
            <div className="icons">
              <i class="bi bi-fonts shapes"></i>
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
            setState({ showing : !showing })
            if (showing) {
              resetUrl()
            } else {
              return
            }
          }}
        >
          <div className="icons">
            <i
              style={{ display: showing ? "none" : "flex" }}
              class="bi bi-image shapes"
            ></i>
            <i
              style={{ display: showing ? "flex" : "none" }}
              class="bi bi-plus-square shapes"
            ></i>
          </div>
        </Button>
      {/* *****PEN TOOLS DROP DOWN***** */}
      <Button
            className="button-icons"
            variant="outline-secondary"
            value={tool}
            onClick={() => {
              setTool(isPenActivated ? 'select' : 'pen');
            }}
          >
            <div className="icons">
            <i
            //when visible, we're in drawing mode
              style={{ display: isPenActivated ? "none" : "flex" }}
              className="bi bi-brush shapes"
            ></i>
            </div>
            <div className="icons">
            <i
            //when !visible, we're in select mode
              style={{ display: isPenActivated ? "flex" : "none" }}
              className="bi bi-brush-fill shapes"
            ></i>
            </div>
      </Button>
      <Button
            className="button-icons"
            variant="outline-secondary"
            value={tool}
            onClick={() => {
              setTool(isEraserActivated ? 'select' : 'eraser');
            }}
          >
            <div className="icons">
            <i
              //when erase, we're in eraser mode
              style={{ display: isEraserActivated ? "none" : "flex" }}
              className="bi bi-eraser shapes"
            ></i>
            </div>
            <div className="icons">
            <i
            // when !erase, we're in select mode
              style={{ display: isEraserActivated ? "flex" : "none" }}
              className="bi bi-eraser-fill shapes"
            ></i>
            </div>
      </Button>
        </div>
    </div>
  );
};

export default LeftBar;
