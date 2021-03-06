import { useState, useRef, useContext } from "react";

// import from other libraries
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Form } from "react-bootstrap";

// import from providers
import { currentUserContext } from "../../providers/UserProvider";

// import other from local files
import useApplicationData from "../../hooks/forBoards";
import logo from "../../images/hodo_v3.png";

//import syling
import "../../stylesheets/css/header.css";

const Header = (props) => {
  const { saveBoard } = props;
  // show state for displaying the Modal for editing title or adding collaborator
  const [show, setShow] = useState("");
  // deconstructing from currentUserContext and helpers
  const { currentUser } = useContext(currentUserContext);
  const { setTitle, title, board_id } = useApplicationData();
  // useRef and useNavigate
  const newTitleRef = useRef();
  const newCollaboratorRef = useRef();
  const navigate = useNavigate();

  // functions to handle the title/collaborator modal opens and close
  const handleShowTitle = () => setShow("title");
  const handleShowCollab = () => setShow("collab");
  const handleClose = (e) => {
    e.preventDefault();
    setShow("");
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

    // axios request to pull all the boards of the COLLABORATOR user

    // currentUser.id is a number, newCollaboratorRef.current.value is a string
    // convert to the same type and then compare
    if (currentUser.id === Number(newCollaboratorRef.current.value)) {
      alert("That's your id. Please enter the other person's id! :)");
    } else {
      axios
        .post("/api/collaborators/userboards", {
          user_id: newCollaboratorRef.current.value,
        })
        .then((response) => {
          // response.data looks like this: [1,3] <-- this is the list of the board id associated with the user
          console.log("do I even hit this point?");
          console.log("this is my response", response.data);

          console.log("what is my board_id??", board_id);
          console.log("typeof board_id", typeof board_id);
          console.log("what is my response.data??", response.data);
          console.log("is this true??", response.data.includes(board_id));

          if (response.data.includes(Number(board_id))) {
            alert("Collaborator already previously added!");
            setShow(false);
          } else {
            // axios request t)o url to add user_id and board_id to collaborators table
            // const urlAddCollaborator = "/api/collaborators";
            axios
              .post("/api/collaborators", {
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
          }
        })
        .catch((err) => {
          console.log("errrrr", err);
        });
    }
  };

  return (
    <div className="header-bar">
      {/* ***** LEFT SIDE : CONTAINS LOGO ******* */}
      <div className="space">
        <img
          src={logo}
          width="120"
          height="100"
          className="d-inline-block align-top img-logo"
          alt="Hodo logo"
        />
      </div>
      {/* ***** MIDDLE : CONTAINS TITLE & EDIT BTN ******* */}
      <div className="title-name">
        <h2 id="boardTitle">{title}</h2>
        {/* EDIT TITLE BTN */}
        <Button className="headerButton" onClick={handleShowTitle}>
          <i className="bi bi-pencil-square"></i>
        </Button>
        {/* MODAL APPEARS WHEN EDIT BTN CLICKED */}
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
          <Form onSubmit={handleEditSave}>
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
      </div>
      {/* ***** RIGHT SIDE : CONTAINS ADD COLLABORATOR & BACK TO PROFILE BTNS ******* */}
      {/* ADD COLLAB. BTN */}
      <div className="collab-profile">
        <div className="add-collaborators">
          <Button className="headerButtonTwo" onClick={handleShowCollab}>
            Add a Collaborator
          </Button>
        </div>
        {/* MODAL APPEARS WHEN 'ADD COLLABORATOR' BTN CLICKED */}
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
          <Form onSubmit={handleCollaboratorSave}>
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
        {/* PROFILE BTN */}
        <Button className="back-to-profile" onClick={() => setShow("profile")}>
          Back
        </Button>
        {/* MODAL APPEARS WHEN 'BACK TO PROFILE' BTN CLICKED */}
        <Modal show={show === "profile"}>
          <Modal.Header id="exit-header">
            <i
              className="bi bi-x exit-btn"
              onClick={() => {
                setShow("");
              }}
            ></i>
          </Modal.Header>
          <Modal.Body>
            <h4>Save before going back to profile?</h4>
          </Modal.Body>
          <Modal.Footer>
            <Button
              size="lg"
              variant="primary"
              onClick={() => {
                saveBoard();
                navigate("/profile");
              }}
            >
              Yes, save board
            </Button>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => {
                navigate("/profile");
              }}
            >
              No
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Header;
