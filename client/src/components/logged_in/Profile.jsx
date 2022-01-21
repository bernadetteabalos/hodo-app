import { useState, useRef } from "react";
// import from other localhost files
import useApplicationData from "../../hooks/forBoards";
import Navigation from "../Navigation";

// import from other libraries
import { useNavigate } from "react-router-dom";
import { Button, Modal, Form } from "react-bootstrap";

// import styling
import "../../stylesheets/css/profile.css";

const Profile = (props) => {
  const { currentUser, setCurrentUser } = props;
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const titleRef = useRef();
  const { createBoard, addCollaborator } = useApplicationData();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log("this is currentUser", currentUser);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const board = await createBoard(titleRef.current.value, currentUser.id);

    // waits for the board info to be grabbed then uses board.id to add user/board to the collaborator table
    const msg = await addCollaborator(currentUser.id, board.id);

    alert(msg);

    navigate(`/board/${board.id}`);
  };

  return (
    <>
      <Navigation currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <div className="profile-page">
        <div className="profile-container">
          <div className="left-profile">
            <div className="profile-photo">
              <img src={currentUser.profile_photo} alt="profile-photo" />
            </div>
            <div className="profile-name">
              <h4>{currentUser.first_name}</h4>
            </div>
            <div>
              <em>
                <h5>Your id is: {currentUser.id}</h5>
              </em>
            </div>
          </div>
          <div className="right-profile">
            <div className="itineraries-container">
              <h1>My Itineraries</h1>
              <ul>
                <li>JAPAN 2020</li>
              </ul>
            </div>
            <Button
              className="mt-2 w-100"
              variant="primary"
              onClick={handleShow}
            >
              Create New Board
            </Button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Create New Board</Modal.Title>
              </Modal.Header>
              <Form onSubmit={handleSubmit}>
                <Modal.Body>
                  <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      ref={titleRef}
                      required
                      placeholder="Enter title"
                    />
                    <Form.Text className="text-muted">
                      Give your board a snazzy title.
                    </Form.Text>
                  </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button variant="primary" type="submit">
                    Create Board
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
