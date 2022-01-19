import { useState, useRef } from "react";
// import from other libraries/styling
import axios from "axios";
import { Button, Modal, Form } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
//import syling
import "../../stylesheets/css/header.css";

const Header = (props) => {
  const { currentUser, currentBoard, setCurrentBoard } = props;
  const [show, setShow] = useState(false);
  const newTitleRef = useRef();

  console.log("this is currentBoard--->", currentBoard);

  const handleShow = () => setShow(true);
  const handleClose = (e) => {
    e.preventDefault();
    setShow(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    // axios put request here
    // need to make a seed table first
    const urlUpdateTitle = "/api/users/title";
    // passing in values from the form
    axios
      .put(urlUpdateTitle, {
        id: currentBoard.id,
        title: newTitleRef.current.value,
      })
      .then((res) => {
        console.log("hit this on line 34 in Header");
        setCurrentBoard((prevState) => {
          return { ...prevState, title: res.data.title };
        });
      })
      .catch((err) => console.log(err.message));
    setShow(false);
  };

  return (
    <div className="header-bar">
      <h2>{currentBoard.title}</h2>
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
