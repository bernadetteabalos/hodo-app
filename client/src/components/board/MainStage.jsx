import { useState, useRef, useEffect } from "react";
import useApplicationData from "../../hooks/forBoards";
// import from others libraries
import socketIOClient from "socket.io-client";
import { Stage, Layer, Line } from "react-konva";
import { Rect } from "react-konva";
import { Button } from "react-bootstrap";
import { v4 as uuidV4 } from "uuid";

// import Other Components
import Header from "./Header";
import RightBar from "./RightBar";
import LeftBar from "./LeftBar";
import Element from "./helpers/Element";
import OneChatMessage from "../board/right_bar_components/OneChatMessage";

// import helper functions
import { generateOneElement } from "./helpers/_helperFunctions";

// import styles
import "../../stylesheets/css/mainstage.css";
import "../../stylesheets/css/chatbox.css";
import "bootstrap/dist/css/bootstrap.min.css";

// socket end point for websocket
const END_POINT = "http://localhost:8001";

const MainStage = (props) => {
  const { currentUser } = props;
  // console.log("line 28 mainstage-->currentUser", current)
  const [fillColor, setFillColor] = useState("");
  const [strokeColor, setStrokeColor] = useState("black");
  const [selectedId, selectShape] = useState(null);
  const stageRef = useRef(null);
  const gridRef = useRef();

  const { elements, board_id, setElements, saveBoard } = useApplicationData();

  console.log("main stage line 33, board_id", board_id);
  //CHAT*********************
  const [message, setMessage] = useState("");
  const [chatSpeakers, setChatSpeakers] = useState([]);
  // const [chats, setChats] = useState([]);
  // const [chatSpeaker, setChatSpeaker] = useState(currentUser["first_name"]);

  // IMAGES
  const [url, setURL] = useState("");

  //***STAGE GRID ****//
  const WIDTH = 40;
  const HEIGHT = 40;

  const grid = [
    ["white", "white"],
    ["white", "white"],
  ];

  const [stagePos, setStagePos] = useState({ x: 0, y: 0 });
  const startX = Math.floor((-stagePos.x - window.innerWidth) / WIDTH) * WIDTH;
  const endX =
    Math.floor((-stagePos.x + window.innerWidth * 2) / WIDTH) * WIDTH;

  const startY =
    Math.floor((-stagePos.y - window.innerHeight) / HEIGHT) * HEIGHT;
  const endY =
    Math.floor((-stagePos.y + window.innerHeight * 2) / HEIGHT) * HEIGHT;

  const gridComponents = [];
  var i = 0;
  for (var x = startX; x < endX; x += WIDTH) {
    for (var y = startY; y < endY; y += HEIGHT) {
      if (i === 4) {
        i = 0;
      }

      const indexX = Math.abs(x / WIDTH) % grid.length;
      const indexY = Math.abs(y / HEIGHT) % grid[0].length;

      gridComponents.push(
        <Rect
          x={x}
          y={y}
          width={WIDTH}
          height={HEIGHT}
          fill={grid[indexX][indexY]}
          stroke="black"
          strokeWidth={0.3}
        />
      );
    }
  }

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
    conn.on(`new-stage-${board_id}`, (elements) => {
      console.log("yess, line 99 in MainStage.jsx--->", elements);
      setElements(elements);
    });

    // listening for when a new line is generated on the stage
    conn.on(`new-line-${board_id}`, (lines) => {
      setLines(lines);
    });

    // d. chat box setting the new array
    conn.on(`update-chat-${board_id}`, (newChatArray) => {
      setChatSpeakers(newChatArray);
    });

    // setting connection to be socketIOClient(END_POINT)
    setConnection(conn);
  }, []);

  // deselects the images and updates others' boards
  const checkDeselect = (e) => {
    selectShape(null);
    // 1. sends the updated elements and lines arrays through the socket upon deselect to update others' boards'
    // I also want to pass down my board_id
    connection.emit("stage-change", elements, board_id);
    connection.emit("line-change", lines, board_id);
  };

  /**activated upon clicking of shape or add img. generates a new element and adds it to the array */
  const handleClick = (shape, fillColor, strokeColor) => {
    // generate and add a new property to the array
    let newElement = generateOneElement(shape, fillColor, strokeColor, url);
    setElements((prevState) => [...prevState, newElement]);
    const newState = [...elements, newElement];
    // sends the new state through the socket
    connection.emit("stage-change", elements, board_id);
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
    connection.emit("line-change", lines, board_id);
  };

  //*** IMAGES */
  /**Activated when 'add url' button is clicked */
  const resetUrl = () => {
    // sends img to the main stage
    handleClick("Image", "", "", url);
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

  //saves board
  const save = () => {
    stageRef.current.children.forEach((item) => {
      if (item.attrs.image) {
        item.attrs.url = item.attrs.image.src;
      }
    });
    saveBoard(board_id, stageRef.current.children);
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
      return newElementArray;
    });
  };

  /** HANDLE BOARD SAVE */
  const handleBoardSave = (e) => {
    e.preventDefault();
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    console.log("it is this message--->", message);
    // a. emit a connection to send the message object
    const newChatSpeakerObject = {
      message,
      speaker: currentUser["first_name"],
    };
    const newChatArray = [...chatSpeakers, newChatSpeakerObject];
    setChatSpeakers(newChatArray);

    connection.emit("chat-change", newChatArray, board_id);
    setMessage("");
  };

  // ******** RETURN ********************
  return (
    <>
      {/* ***** Header */}
      <div>
        <Header board_id={board_id} />
      </div>
      {/* ******** LEFT SIDE BAR ******************** */}
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
            // onMouseDown={checkDeselect}
            onMousemove={tool !== "select" ? handleMouseMove : ""}
            onMouseup={tool !== "select" ? handleMouseUp : ""}
            draggable={tool === "select"}
            onDragEnd={(e) => {
              setStagePos(e.currentTarget.position());
            }}
          >
            <Layer
              ref={gridRef}
              onTouchStart={checkDeselect}
              onMouseDown={tool !== "select" ? handleMouseDown : checkDeselect}
            >
              {gridComponents}
            </Layer>
            <Layer ref={stageRef}>
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
              {elements.map((rect, i) => {
                console.log("LKSDFJGKDG", rect);
                return (
                  <Element
                    shapeName={rect.className}
                    key={i}
                    shapeProps={rect.attrs}
                    isSelected={rect.attrs.id === selectedId}
                    onSelect={() => {
                      selectShape(rect.attrs.id);
                    }}
                    onChange={(newAttrs) => {
                      setElements((prev) =>
                        prev.map((el, j) => {
                          if (i === j) {
                            return {
                              ...el,
                              attrs: newAttrs,
                            };
                          } else {
                            return el;
                          }
                        })
                      );
                    }}
                  />
                );
              })}
            </Layer>
          </Stage>
        </div>
        <div>
          {/* ******** RIGHT SIDE BAR ***************/}
          <RightBar
            clearBoard={clearBoard}
            saveBoard={save}
            undo={undo}
            deleteShape={deleteShape}
            handleBoardSave={handleBoardSave}
            connection={connection}
            setConnection={setConnection}
            END_POINT={END_POINT}
            currentUser={currentUser}
          />
          <div>
            <div id="chatbox">
              {chatSpeakers.map((chat) => {
                return (
                  <OneChatMessage
                    key={uuidV4()}
                    chat={chat.message}
                    chatSpeaker={chat.speaker}
                  />
                );
              })}
            </div>
            <textarea
              className="enterText"
              type="text"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            ></textarea>
            <Button onClick={handleSendMessage}>Send Message</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainStage;
