import { CirclePicker } from "react-color";
import Button from "react-bootstrap/Button";

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
  return (
    <div className="leftsidebar">
      <div className="select-a-color">
        <h5>Select Shape Fill Color</h5>
        <CirclePicker
          color={fillColor}
          onChange={(fillColor) => setFillColor(fillColor.hex)}
        />
        <h5>Select Shape Border & Pen Color </h5>
        <CirclePicker
          color={strokeColor}
          onChange={(strokeColor) => setStrokeColor(strokeColor.hex)}
        />
      </div>
      <div className="shapes">
        <h3>Select a Shape</h3>
        <Button
          variant="outline-secondary"
          onClick={() => handleClick("rectangle", fillColor, strokeColor)}
        >
          Rectangle
        </Button>
        <Button
          variant="outline-secondary"
          onClick={() => handleClick("square", fillColor, strokeColor)}
        >
          Square
        </Button>
        <Button
          variant="outline-secondary"
          onClick={() => handleClick("star", fillColor, strokeColor)}
        >
          Star
        </Button>
      </div>
      <div className="add-url">
        <form
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            name="url"
            type="text"
            placeholder="Enter URL of Image"
            value={url}
            onChange={(e) => setURL(e.target.value)}
          />
        </form>
        <Button variant="outline-secondary" onClick={() => resetUrl()}>
          Add!!
        </Button>
      </div>
      {/* *****PEN TOOLS DROP DOWN***** */}
      <h5>Select Tool to Draw or Erase</h5>
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
