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
  const newCollaboratorRef = useRef();

  const handleShowTitle = () => setShow("title");
  const handleShowCollab = () => setShow("collab");
  const handleClose = (e) => {
    e.preventDefault();
    setShow(false);
  };

  const handleEditSave = (e) => {
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

  const handleCollaboratorSave = (e) => {
    e.preventDefault();

    const urlAddCollaborator = "/api/collaborators";

    axios
      .post(urlAddCollaborator, {
        user_id: newCollaboratorRef.current.value,
        board_id: board_id,
      })
      .then((res) => {
        // res.data.msg is the "msg that was sent from collaborators.js in server "Added collaborators to board"
        alert(res.data.msg);
        setShow(false);
      });
  };

  return (
    <div className="header-bar">
      <div>
        <Button variant="warning" onClick={handleShowTitle}>
          Edit Title
        </Button>
      </div>
      <div className="title-name">
        <h2>{title}</h2>
      </div>
      <Modal
        show={show === "title"}
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
            <Button variant="primary" onClick={handleEditSave}>
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <div className="add-collaborators">
        <Button onClick={handleShowCollab}>Add a Collaborator</Button>
      </div>
      <Modal
        show={show === "collab"}
        onHide={() => {
          setShow(false);
        }}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Collaborator By Id</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <Form.Control
              size="lg"
              ref={newCollaboratorRef}
              type="number"
              placeholder="Enter Collaborator Id"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleCollaboratorSave}>
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default Header;
