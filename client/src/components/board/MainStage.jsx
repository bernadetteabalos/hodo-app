import { useState, useRef, useEffect } from "react";
// import from others libraries
import socketIOClient from "socket.io-client";
import { Stage, Layer, Line } from "react-konva";

// import Other Components
import RightBar from "./RightBar";
import LeftBar from "./LeftBar";

// import helper functions
import { generateOneElement } from "./helpers/Element";

// import styles
import "../../stylesheets/css/mainstage.css";
import "bootstrap/dist/css/bootstrap.min.css";

// socket end point for websocket
const END_POINT = "http://localhost:8080";

const MainStage = () => {
  const [elements, setElements] = useState([]);
  const [fillColor, setFillColor] = useState("");
  const [strokeColor, setStrokeColor] = useState("black");
  const [selectedId, selectShape] = useState(null);
  // IMAGES
  const [url, setURL] = useState("");

  // PEN TOOLS
  const [tool, setTool] = useState("select");
  const [lines, setLines] = useState([]);
  const isDrawing = useRef(false);

  // ************** SOCKET ************************
  const [connection, setConnection] = useState(undefined);
  useEffect(() => {
    const conn = socketIOClient(END_POINT);
    // what is being received from SERVER
    conn.on("inital", (msg) => {
      console.log("something came back");
      console.log(msg.string);
    });

    // 4. listening for when new element is generated on the stage
    conn.on("new-stage", (elements) => {
      setElements(elements);
    });

    // listening for when a new line is generated on the stage
    conn.on("new-line", (lines) => {
      setLines(lines);
    });

    // setting connection to be socketIOClient(END_POINT)
    setConnection(conn);
  }, []);

  // deselects the images and updates others' boards
  const checkDeselect = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
    // 1. sends the updated elements and lines arrays through the socket upon deselect to update others' boards'
    connection.emit("stage-change", elements);
    connection.emit("line-change", lines);
  };

  /**activated upon clicking of shape or add img. generates a new element and adds it to the array */
  const handleClick = (shape, fillColor, strokeColor) => {
    // generate and add a new property to the array
    let newElement = generateOneElement(shape, fillColor, strokeColor, url);
    setElements((prevState) => [...prevState, newElement]);
    const newState = [...elements, newElement];
    // sends the new state through the socket
    connection.emit("stage-change", newState);
    // reset tool to 'select' to prevent 'pen' mode when transforming the shapes
    setTool("select");
  };

  // ****************** PEN TOOLS FUNCTIONS ****************
  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([
      ...lines,
      { tool, points: [pos.x, pos.y], strokeColor: strokeColor },
    ]);
  };

  // activated when the user is drawing the line
  const handleMouseMove = (e) => {
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  // when the moust is up, set drawing to false and send line through the socket to appear on other users' board
  const handleMouseUp = () => {
    isDrawing.current = false;
    connection.emit("line-change", lines);
  };

  //*** IMAGES */
  /**Activated when 'add url' button is clicked */
  const resetUrl = () => {
    // sends img to the main stage
    handleClick("", "", "", url);
    // empties the URL text box
    setURL("");
  };

  // removes all elements from the board
  const clearBoard = () => {
    setElements([]);
    setLines([]);
    setTool("select");
    // sends empty arrays through socket to reset all boards in the room
    connection.emit("stage-change", []);
    connection.emit("line-change", []);
  };

  /** removes the previous element from the array */
  const undo = (type) => {
    // removes the previous shape/image from the array
    if (type === "shape_image") {
      // making a copy of the elements array, and making a copy of that with the last element removed
      const copyOfElements = [...elements];
      const undoElement = copyOfElements.slice(0, elements.length - 1);
      // reset the elements array
      setElements(undoElement);
      // send the updated elements array through the socket
      connection.emit("stage-change", undoElement);
    } else if (type === "pen") {
      // sets lines array to one without the last element and send it through the socket
      const copyOfLines = [...lines];
      const undoLines = copyOfLines.slice(0, lines.length - 1);
      setLines(undoLines);
      connection.emit("line-change", undoLines);
    }
  };

  /**deletes the selected shape */
  const deleteShape = () => {
    // locate the index of the selected shape
    const targetIndex = elements.findIndex((x) => x.id === selectedId);

    // setting the array again with the target index removed
    setElements((prev) => {
      // make copy of previous state
      const newElementArray = [...prev];
      // remove the element object from the array
      newElementArray.splice(targetIndex, 1);
      return newRectangleArray;
    });
  };

  // ******** RETURN ********************
  return (
    // ******** LEFT SIDE BAR ********************
    <>
      <div className="creativity">
        <LeftBar
          fillColor={fillColor}
          setFillColor={setFillColor}
          strokeColor={strokeColor}
          setStrokeColor={setStrokeColor}
          handleClick={handleClick}
          url={url}
          setURL={setURL}
          resetUrl={resetUrl}
          tool={tool}
          setTool={setTool}
        />
        {/* ******** STAGE ******************** */}
        <div className="stage">
          <Stage
            width={1000 || window.innerWidth}
            height={800 || window.innerHeight}
            onMouseDown={checkDeselect}
            onTouchStart={checkDeselect}
            onMouseDown={tool !== "select" ? handleMouseDown : checkDeselect}
            onMousemove={tool !== "select" ? handleMouseMove : ""}
            onMouseup={tool !== "select" ? handleMouseUp : ""}
          >
            <Layer>
              {elements.map((rect, i) => {
                return (
                  <Element
                    shapeName={rect.shape}
                    url={rect.url}
                    key={i}
                    shapeProps={rect}
                    isSelected={rect.id === selectedId}
                    onSelect={() => {
                      selectShape(rect.id);
                    }}
                    onChange={(newAttrs) => {
                      const rects = elements.slice();
                      rects[i] = newAttrs;
                      setElements(rects);
                    }}
                  />
                );
              })}
              {lines.map((line, i) => (
                <Line
                  key={i}
                  points={line.points}
                  stroke={line.strokeColor}
                  strokeWidth={5}
                  tension={0.5}
                  lineCap="round"
                  globalCompositeOperation={
                    line.tool === "eraser" ? "destination-out" : "source-over"
                  }
                />
              ))}
            </Layer>
          </Stage>
        </div>
        <div>
          {/* ******** RIGHT SIDE BAR ***************/}
          <RightBar
            clearBoard={clearBoard}
            undo={undo}
            deleteShape={deleteShape}
          />
        </div>
      </div>
    </>
  );
};

export default MainStage;
