import { useState, useRef } from "react";
// import from other libraries/styling
import axios from "axios";
import { Button, Modal, Form } from "react-bootstrap";

//import syling
import "../../stylesheets/css/header.css";
import useApplicationData from "../../hooks/forBoards";

const Header = () => {
  const { setTitle, title, board_id } = useApplicationData();
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
    // need to make a seed table first
    const urlUpdateTitle = "/api/users/title";
    // passing in values from the form
    axios
      .put(urlUpdateTitle, {
        id: board_id,
        title: newTitleRef.current.value,
      })
      .then((res) => {
        console.log("hit this on line 34 in Header");
        console.log("this is response", res);
        setTitle(res.data.title);
      })
      .catch((err) => console.log(err.message));
    setShow(false);
  };

  return (
    <div className="header-bar">
      <h2>{title}</h2>
      <div className="title-edit-button">
        <Button variant="primary title-edit-button" onClick={handleShow}>
          Edit
        </Button>
      </div>
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
