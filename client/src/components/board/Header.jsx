import { useState, useRef } from "react";
// import from other libraries/styling
import { Button, Modal, Form } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
//import syling
import "../../stylesheets/css/header.css";

const Header = () => {
  const [show, setShow] = useState(false);
  const newTitleRef = useRef();

  const handleShow = () => setShow(true);
  const handleClose = (e) => {
    e.preventDefault();
    setShow(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    // axios put request here
    setShow(false);
  };

  return (
    <div className="header-bar">
      board.title
      <Button variant="primary" onClick={handleShow}>
        Edit
      </Button>
      <Modal
        show={show}
        onHide={() => {
          setShow(false);
        }}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Title</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <Form.Control
              size="lg"
              ref={newTitleRef}
              type="text"
              placeholder="Enter new title"
            />
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
