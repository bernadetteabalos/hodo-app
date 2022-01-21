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
import Navigation from "../Navigation";

// import helper functions
import { generateOneElement } from "./helpers/_helperFunctions";

// import styles
import "../../stylesheets/css/mainstage.css";
import "../../stylesheets/css/chatbox.css";
import "bootstrap/dist/css/bootstrap.min.css";

// socket end point for websocket
const END_POINT = "http://localhost:8001";

const MainStage = (props) => {
  const { currentUser, setCurrentUser, showLogin, setShowLogin, setIdTitle } =
    props;
  // console.log("line 28 mainstage-->currentUser", current)
  const [fillColor, setFillColor] = useState("");
  const [strokeColor, setStrokeColor] = useState("black");
  const [selectedId, selectShape] = useState(null);
  const stageRef = useRef(null);
  const posRef = useRef(null);
  const gridRef = useRef(null);

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
    const stage = e.target.getStage();
    const pos = stage.getRelativePointerPosition(posRef);
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
    const point = stage.getRelativePointerPosition(posRef);
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
    saveBoard(board_id, stageRef.current.children)
  }
console.log("these are the ele", elements);
  /** removes the previous element from the array */
  const undo = () => {
    // removes the previous shape/image from the array
    // console.log("dancing on my OWNNN", stageRef.current.children.at(-1));

    // 
    const copyOfElements = [...elements];



    if (elements[elements.length -1].className === "Line") {
      const filteredLines = copyOfElements.filter((element) => {
        return element.className === "Line"
      })
      console.log("filtered lines", filteredLines);
      // console.log("this is copy of lines", copyOfLines)
      const undoLines = filteredLines.slice(0, filteredLines.length - 1)
      setLines(undoLines)
      console.log('HELLOOOOO dis', undoLines);
      console.log("this is line", lines);
      console.log("elements afterward:", elements)
      connection.emit("line-change", undoLines);
      
    } else if (elements[elements.length -1].className !== "Line") {

      // making a copy of the elements array, and making a copy of that with the last element removed
      const undoElement = copyOfElements.slice(0, elements.length - 1);
      // reset the elements array
      setElements(undoElement);
      console.log('HELLOOOOO', undoElement);
      // send the updated elements array through the socket
      connection.emit("stage-change", undoElement);
    
    }
    
  };

  /**deletes the selected shape */
  console.log("currently selected item:", selectedId)
  const deleteShape = () => {
    // locate the index of the selected shape
    const targetIndex = elements.findIndex((x) => x.attrs.id === selectedId);
    // setting the array again with the target index removed
    setElements((prev) => {
      // make copy of previous state
      // remove the element object from the array
      const copyOfElements = [...prev];
      copyOfElements.splice(targetIndex, 1);
      return copyOfElements;
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
      <Navigation
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        setIdTitle={setIdTitle}
      />
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
          <Stage ref={posRef}
            width={1000 || window.innerWidth}
            height={800 || window.innerHeight}
            // onMouseDown={checkDeselect}
            onMousemove={tool !== "select" ? handleMouseMove : ""}
            onMouseup={tool !== "select" ? handleMouseUp : ""}
            draggable={tool === "select"}
            onDragEnd={(e) => {
              setStagePos(e.currentTarget.position());
              
            }}
            onMousemove={tool !== "select" ? handleMouseMove : ""}
            onMouseup={tool !== "select" ? handleMouseUp : ""}
            
          >
            <Layer
            onTouchStart={checkDeselect}
            onMouseDown={tool !== "select" ? handleMouseDown : checkDeselect}
            >{gridComponents}
            </Layer>
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
                      setLines((prev) => prev.map((el, j) => {
                        if (i === j) {
                          return {
                            ...el,
                            attrs: newAttrs,
                          };
                        } else {
                          return el;
                        }
                      }));
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
                        setElements((prev) => prev.map((el, j) => {
                          if (i === j) {
                            return {
                              ...el,
                              attrs: newAttrs,
                              
                            };
                          } else {
                            return el;
                          }
                        }));
                      }}
                    />
                  )
                  }
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
