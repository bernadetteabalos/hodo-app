import { useState } from "react";
// import from other libraries
import { Modal, Button } from "react-bootstrap";

// import styling
import "../../stylesheets/css/mainstage.css";

const RightBar = (props) => {
  const { clearBoard, undo, deleteShape, saveBoard } = props;

  const [warning, setWarning] = useState("");
  const [state, setState] = useState({ showing: false });
  const { showing } = state;

  const handleSave = (e) => {
    e.preventDefault();
    setWarning("save");
    saveBoard();
  };

  // activated when clear board or delete button are pressed; displays the modal
  const handleClose = (e) => {
    e.preventDefault();
    setWarning(false);
  };

  // activated when user confirms "yes" to clearing the board. Closes the modal and calls clearBoard function
  const exitClearBoard = (e) => {
    e.preventDefault();
    setWarning(false);
    clearBoard();
  };

  // activated when user confirms "yes" to deleting a shape/img. Closes the modal and calls deleteShape function
  const exitDeleteShape = (e) => {
    e.preventDefault();
    setWarning(false);
    deleteShape();
  };

  return (
    <>
      <div className="rightbar">
        <Button
          className="funcButton"
          variant="primary"
          onClick={() => {
            setState({ showing: !showing });
          }}
        >
          <i class="bi bi-gear"></i>
        </Button>
        <br></br>
        <div
          className="hideThis fade-in"
          style={{ display: showing ? "block" : "none" }}
        >
          <Button className="funcButton" variant="primary" onClick={handleSave}>
            Save
          </Button>
          <Modal show={warning === "save"}>
            <Modal.Body>
              <h4>Board Saved :)</h4>
            </Modal.Body>
            <Modal.Footer>
              <Button size="lg" variant="primary" onClick={handleClose}>
                Ok!
              </Button>
            </Modal.Footer>
          </Modal>
          <br></br>
          <br></br>
          <Button
            className="clear"
            size="lg"
            variant="danger"
            onClick={() => {
              setWarning("clear");
            }}
          >
            Clear
          </Button>
        </div>
        <Modal show={warning === "clear"}>
          <Modal.Body>
            <h4>Are you sure you want to clear the board?</h4>
          </Modal.Body>
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
        <Button
          className="undoButton"
          variant="warning"
          onClick={() => undo("shape_image")}
        >
          Undo Shape
        </Button>
        <br></br>
        <Button
          className="undoButton"
          variant="warning"
          onClick={() => undo("Line")}
        >
          Undo Line
        </Button>
        <br></br>
        <Button
          className="undoButton"
          variant="warning"
          onClick={() => {
            setWarning("delete-shape");
          }}
        >
          <i class="bi bi-trash"></i>
        </Button>
        <Modal show={warning === "delete-shape"}>
          <Modal.Body>
            <h4>Are you sure you want to delete the shape?</h4>
          </Modal.Body>
          <Modal.Footer>
            <Button size="lg" variant="danger" onClick={exitDeleteShape}>
              Yes
            </Button>
            <Button size="lg" variant="secondary" onClick={handleClose}>
              No, don't delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default RightBar;
