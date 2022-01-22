import { useState } from "react";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";

// import styling
import "../../stylesheets/css/rightbar.css";

const RightBar = (props) => {
  const { clearBoard, undo, deleteShape, saveBoard } = props;

  const [warning, setWarning] = useState("");

  const handleClose = (e) => {
    e.preventDefault();
    setWarning(false);
  };

  const exitClearBoard = (e) => {
    e.preventDefault();
    setWarning(false);
    clearBoard();
  };

  const exitDeleteShape = (e) => {
    e.preventDefault();
    setWarning(false);
    deleteShape();
  };

  return (
    <>
      <div className="rightbar">
        <Button variant="primary" onClick={saveBoard}>
          Save
        </Button>
        <br></br>
        <br></br>
        <Button
          variant="danger"
          onClick={() => {
            setWarning("clear");
          }}
        >
          Clear Board
        </Button>
        <Modal show={warning == "clear"}>
          <Modal.Body>Are you sure you want to clear the board?</Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={exitClearBoard}>
              Yes
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              No, don't clear.
            </Button>
          </Modal.Footer>
        </Modal>
        <br></br>
        <br></br>
        <Button variant="warning" onClick={() => undo("shape_image")}>
          Undo Shape OR Rectangle
        </Button>
        <br></br>
        <br></br>
        <Button variant="warning" onClick={() => undo("Line")}>
          Undo Line
        </Button>
        <br></br>
        <br></br>
        <Button
          variant="warning"
          onClick={() => {
            setWarning("delete-shape");
          }}
        >
          Delete Shape
        </Button>
        <Modal show={warning == "delete-shape"}>
          <Modal.Body>Are you sure you want to delete the shape?</Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={exitDeleteShape}>
              Yes
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              No, don't delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default RightBar;
