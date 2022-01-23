import { useState, useRef } from "react";
// import from other libraries
import axios from "axios";
import { Button, Modal, Form } from "react-bootstrap";

// import helpers from local files
import useApplicationData from "../../hooks/forBoards";

//import syling
import "../../stylesheets/css/header.css";

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

  // Activated when user clicks the edit title button
  const handleEditSave = (e) => {
    // prevent the refresh of the page
    e.preventDefault();
    //axios request to server to update the title of the specific board (id) on the boards table
    const urlUpdateTitle = "/api/users/title";
    axios
      .put(urlUpdateTitle, {
        id: board_id,
        title: newTitleRef.current.value,
      })
      .then((res) => {
        // res.data.title is the updated title
        // setting the new title to be the updated one
        setTitle(res.data.title);
        // closes the Modal with the edit title prompt
        setShow(false);
      })
      // prints error in console if axios request failed
      .catch((err) => console.log(err.message));
  };

  /** Activated when user confirms save board */
  const handleCollaboratorSave = (e) => {
    e.preventDefault();

    // axios request to url to add user_id and board_id to collaborators table
    const urlAddCollaborator = "/api/collaborators";
    axios
      .post(urlAddCollaborator, {
        user_id: newCollaboratorRef.current.value,
        board_id: board_id,
      })
      .then((res) => {
        // res.data.msg is the "msg that was sent from collaborators.js in server "Added collaborators to board". Msg is alerted to user
        alert(res.data.msg);
        // close the Modal with the save prompt
        setShow(false);
      })
      // prints error in console if axios request failed
      .catch((err) => console.log(err.message));
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
