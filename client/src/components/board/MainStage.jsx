import { useState, useRef, useEffect, useContext } from "react";
import useApplicationData from "../../hooks/forBoards";
import useKeyPress from "../../hooks/keyboardShortcuts";

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
import { currentUserContext } from "../../providers/UserProvider";

// import helper functions
import { generateOneElement } from "./helpers/_helperFunctions";

// import styles
import "../../stylesheets/css/mainstage.css";
import "../../stylesheets/css/chatbox.css";
import "bootstrap/dist/css/bootstrap.min.css";

// socket end point for websocket
const END_POINT = "http://localhost:8001";

const MainStage = (props) => {
  const { showLogin, setShowLogin, setIdTitle } = props;
  const { currentUser } = useContext(currentUserContext);
  // for the socket connection
  const [connection, setConnection] = useState(undefined);
  // colours
  const [fillColor, setFillColor] = useState("");
  const [borderColor, setBorderColor] = useState("black");
  // for if SHAPE is selected
  const [selectedId, selectShape] = useState(null);
  // for IMAGES
  const [url, setURL] = useState("");
  // for CHAT
  const [message, setMessage] = useState("");
  const [chatSpeakers, setChatSpeakers] = useState([]);
  // for PENS
  const [strokeColor, setStrokeColor] = useState("black");
  const [tool, setTool] = useState("select");
  const [lines, setLines] = useState([]);
  // references
  const isDrawing = useRef(false);
  const stageRef = useRef(null);
  const posRef = useRef(null);

  const { elements, board_id, setElements, saveBoard } = useApplicationData();

  const onKeyPress = (event) => {
    undo();
  };
  useKeyPress(["z"], onKeyPress);

  //***STAGE GRID ****//
  const WIDTH = 40;
  const HEIGHT = 40;

  const grid = [
    ["white", "white"],
    ["white", "white"],
  ];

  const [stagePos, setStagePos] = useState({ x: 0, y: 0 });
  // const startX = Math.floor((-stagePos.x - window.innerWidth) / WIDTH) * WIDTH;
  // const endX =
  //   Math.floor((-stagePos.x + window.innerWidth * 2) / WIDTH) * WIDTH;

  // const startY =
  //   Math.floor((-stagePos.y - window.innerHeight) / HEIGHT) * HEIGHT;
  // const endY =
  //   Math.floor((-stagePos.y + window.innerHeight * 2) / HEIGHT) * HEIGHT;

  // const gridComponents = [];
  // var i = 0;
  // for (var x = startX; x < endX; x += WIDTH) {
  //   for (var y = startY; y < endY; y += HEIGHT) {
  //     if (i === 4) {
  //       i = 0;
  //     }

  //     const indexX = Math.abs(x / WIDTH) % grid.length;
  //     const indexY = Math.abs(y / HEIGHT) % grid[0].length;

  //     gridComponents.push(
  //       <Rect
  //         x={x}
  //         y={y}
  //         width={WIDTH}
  //         height={HEIGHT}
  //         fill={grid[indexX][indexY]}
  //         stroke="black"
  //         strokeWidth={0.3}
  //       />
  //     );
  //   }
  // }

  // upon render, setShowLogin to back to display "back to profile" button on nav bar (showLogin is passed down as prop)
  useEffect(() => {
    setShowLogin("back");
  }, []);

  // ************** SOCKET ************************
  useEffect(() => {
    const conn = socketIOClient(END_POINT);
    // what is being received from SERVER
    conn.on("inital", (msg) => {
      console.log("something came back");
      console.log(msg.string);
    });

    /*
    board-shapes-images: 1, 2, 3, 4
    board-lines: i, ii, iii, iv
    chat-messages: a, b, c, d
    */

    // 4. listening for when new element is generated on the stage
    conn.on(`new-stage-${board_id}`, (elements) => {
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
    // 1. sends the updated elements arrays through the socket upon deselect to update others' boards'
    connection.emit("stage-change", elements, board_id);
    // i. sends the updated lines array to the server via socket
    connection.emit("line-change", lines, board_id);
  };

  /**activated upon clicking of shape or add img. generates a new element and adds it to the array */
  const handleClick = (shape, fillColor, strokeColor) => {
    // generate and add a new property to the array
    let newElement = generateOneElement(
      -posRef.current.x() + posRef.current.width() / 2,
      -posRef.current.y() + posRef.current.height() / 2,
      shape,
      fillColor,
      strokeColor,
      url
    );
    setElements((prevState) => [...prevState, newElement]);
    const newElementsArray = [...elements, newElement];
    // 1. sends the new state through the socket
    connection.emit("stage-change", newElementsArray, board_id);
    // reset tool to 'select' to prevent 'pen' mode when transforming the shapes
    setTool("select");
  };

  // ****************** PEN TOOLS FUNCTIONS ****************
  /**activated when the mouse is being pressed down when use is using the pen */
  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const stage = e.target.getStage();
    const pos = stage.getRelativePointerPosition(posRef);
    setLines([
      ...lines,
      { tool, points: [pos.x, pos.y], strokeColor: strokeColor },
    ]);
  };

  // grabs the stage, sets lines to the new point and strokecolor (to make it look like a continous line)
  const handleMouseMove = (e) => {
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getRelativePointerPosition(posRef);
    let lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  // activated when the mouse is up
  const handleMouseUp = () => {
    // set isDrawing to false
    isDrawing.current = false;
    // i. send line through the socket to appear on other users' board
    connection.emit("line-change", lines, board_id);
  };

  //***************************** IMAGES ***********************/
  /**Activated when 'add url' button is clicked */
  const resetUrl = () => {
    // sends img to the main stage
    handleClick("Image", "", "", url + "?not-from-cache-please");
    // empties the URL text box
    setURL("");
  };

  // removes all elements from the board
  const clearBoard = () => {
    // set all elements back to none
    setElements([]);
    setLines([]);
    setTool("select");
    // 1. sends empty array through socket to reset board
    connection.emit("stage-change", []);
    // i. sends empty array through socket to reset board
    connection.emit("line-change", []);
  };

  /** Activated when the user confirms "yes" to save the board */
  const save = () => {
    stageRef.current.children.forEach((item) => {
      if (item.attrs.image) {
        item.attrs.url = item.attrs.image.src;
      }
    });
    saveBoard(board_id, stageRef.current.children);
    console.log("stageref", stageRef.current.children);
    // let the user know that the board is saved
    // alert("Board saved! :)");
  };

  /** removes the previous element from the array */
  const undo = (type) => {
    // removes the previous shape/image from the array
    // console.log("dancing on my OWNNN", stageRef.current.children.at(-1));

    //
    const copyOfElements = [...elements];

    if (type === "Line") {
      // if (elements[elements.length -1].className === "Line") {
      // const filteredLines = copyOfElements.filter((element) => {
      //   return element.className === "Line"
      // })
      const filteredLines = [...lines];
      console.log("filtered lines", filteredLines);
      // console.log("this is copy of lines", copyOfLines)
      const undoLines = filteredLines.slice(0, filteredLines.length - 1);
      setLines(undoLines);

      connection.emit("line-change", undoLines);
    } else {
      // } else if (elements[elements.length -1].className !== "Line") {

      // making a copy of the elements array, and making a copy of that with the last element removed
      const undoElement = copyOfElements.slice(0, elements.length - 1);
      // reset the elements array
      setElements(undoElement);
      console.log("HELLOOOOO", undoElement);
      // send the updated elements array through the socket
      connection.emit("stage-change", undoElement);
    }
  };

  /**deletes the selected shape */
  // console.log("currently selected item:", selectedId);
  const deleteShape = () => {
    // locate the index of the selected shape
    const targetIndex = elements.findIndex((x) => x.attrs.id === selectedId);
    // setting the array again with the target index removed
    setElements((prev) => {
      // make copy of previous state
      // remove the element object from the array
      const copyOfElements = [...prev];
      copyOfElements.splice(targetIndex, 1);
      selectShape(null);
      return copyOfElements;
    });
  };

  useKeyPress(["x"], () => {
    deleteShape();
  });

  /** HANDLE BOARD SAVE */
  const handleBoardSave = (e) => {
    e.preventDefault();
  };

  const bottomChatRef = useRef();

  /** Activated when user submits a message by clicking "enter" or clicking "send message" btn */
  const handleSendMessage = (e) => {
    e.preventDefault();

    // creates new object with message and the current user
    const newChatSpeakerObject = {
      message,
      speaker: currentUser["first_name"],
    };
    // sets the chatSpeaker array as the one with the newChatSpeakerObject
    const newChatArray = [newChatSpeakerObject, ...chatSpeakers];
    setChatSpeakers(newChatArray);

    // a. emit a connection to send the message object
    connection.emit("chat-change", newChatArray, board_id);
    // clears the message input box
    setMessage("");
  };

  // ******** RETURN ********************
  return (
    <>
      {/* ***** Header with the title ******/}
      <div>
        <Header currentUser={currentUser} saveBoard={save} />
      </div>
      {/* ******** LEFT SIDE BAR ******************** */}
      <div className="creativity">
        <LeftBar
          fillColor={fillColor}
          setFillColor={setFillColor}
          borderColor={borderColor}
          setBorderColor={setBorderColor}
          handleClick={handleClick}
          url={url}
          setURL={setURL}
          resetUrl={resetUrl}
          tool={tool}
          setTool={setTool}
          strokeColor={strokeColor}
          setStrokeColor={setStrokeColor}
          checkDeselect={checkDeselect}
        />
        {/* ******** STAGE ******************** */}
        <div className="stage" style={{ position: "relative" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            style={{ position: "absolute", top: "0", left: "0" }}
          >
            <defs>
              <pattern
                id="grid-pattern"
                width={WIDTH}
                height={HEIGHT}
                patternUnits="userSpaceOnUse"
                x={stagePos.x}
                y={stagePos.y}
              >
                <rect
                  width="100%"
                  height="100%"
                  fill="none"
                  strokeWidth="2"
                  stroke={"#ccd5e3"}
                />
              </pattern>
            </defs>

            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
          </svg>

          <Stage
            ref={posRef}
            width={window.innerWidth - 300}
            height={window.innerHeight - 50}
            // onMouseDown={tool === "select" && checkDeselect}
            // onTouchStart={tool === "select" && checkDeselect}
            onMousemove={tool !== "select" ? handleMouseMove : ""}
            onMouseup={tool !== "select" ? handleMouseUp : ""}
            draggable={tool === "select"}
            onDragMove={(e) => {
              setStagePos(e.currentTarget.position());
            }}
          >
            {posRef.current && (
              <Layer
                onTouchStart={checkDeselect}
                onMouseDown={
                  tool !== "select" ? handleMouseDown : checkDeselect
                }
              >
                {posRef.current && (
                  <Rect
                    x={posRef.current.x || 0}
                    y={posRef.current.y || 0}
                    width={window.innerWidth - 300}
                    height={window.innerHeight - 50}
                  />
                )}
              </Layer>
            )}

            <Layer ref={stageRef}>
              {elements.map((rect, i) => {
                // console.log('this is what i need', elements)

                // console.log('LKSDFJGKDG', rect);
                return (
                  <>
                    {rect.className === "Line" ? (
                      <Line
                        key={i}
                        points={rect.attrs.points}
                        stroke={rect.attrs.stroke}
                        strokeWidth={5}
                        tension={0.5}
                        lineCap="round"
                        onChange={(newAttrs) => {
                          setLines((prev) =>
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
                        // globalCompositeOperation={
                        //   line.tool === "eraser" ? "destination-out" : "source-over"
                        // }
                      />
                    ) : (
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
                    )}
                  </>
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
        {/* ******** RIGHT SIDE BAR ***************/}

        <RightBar
          clearBoard={clearBoard}
          saveBoard={save}
          undo={undo}
          deleteShape={deleteShape}
          handleBoardSave={handleBoardSave}
          currentUser={currentUser}
        />

        <div className="rightsection">
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
            <div
              style={{ float: "left", clear: "both" }}
              ref={bottomChatRef}
            ></div>
          </div>
          <form onSubmit={handleSendMessage}>
            <input
              className="enterText"
              type="text"
              placeholder="enter message here"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            ></input>
            {/* <textarea
                  className="enterText"
                  type="text"
                  placeholder="enter message here"
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                ></textarea> */}
            <Button
              className="send-btn"
              type="submit"
              onClick={handleSendMessage}
            >
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default MainStage;
