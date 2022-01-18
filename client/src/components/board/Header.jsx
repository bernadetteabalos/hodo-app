import { useState } from "react";
// import from other libraries/styling
import { Button, Modal } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
//import syling
import "../../stylesheets/css/header.css";

const Header = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleSave = (e) => {
    e.preventDefault();
  };

  return (
    <div className="header-bar">
      board.title
      <Button variant="primary" onClick={handleShow}>
        Edit
      </Button>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Edit Title of Board</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <p>this is the body text</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default Header;
