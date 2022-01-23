import { useState, useRef } from "react";

// import from other libraries
import { useNavigate } from "react-router-dom";
import { Button, Modal, Form } from "react-bootstrap";
import axios from "axios";

// import other components
import OneTitle from "./OneTitle";
import Navigation from "../Navigation";

// import helpers from local files
import useApplicationData from "../../hooks/forBoards";

// import styling
import "../../stylesheets/css/profile.css";
import { useEffect } from "react";

const Profile = (props) => {
  const {
    currentUser,
    setCurrentUser,
    showLogin,
    setShowLogin,
    idTitle,
    setIdTitle,
  } = props;
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const titleRef = useRef();
  const { createBoard, addCollaborator } = useApplicationData();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    // to display the 'logout' button on the nav bar (pass showLogin down to Navigation Component)
    setShowLogin("logout");

    // axios request to get the board id and titles associated with the specific user
    // 1. axios request to collaborators table to get the board ids associated with the user
    axios
      .post("api/collaborators/userboards", { user_id: currentUser.id })
      .then((response) => {
        // response.data looks like this: [1,3] <-- this is the list of the board id associated with the user

        // Only do individual axios request for the boards that are not already in the idTitle array (for inital login as well as when a user is added as a collaborator to another board)
        // For example:
        // response.data = [1,3, 4]
        // idTitle = [{id: 1, title: 'hello'},{id: 3, title: 'world'}]
        // dbArray = [4]
        const dbArray = response.data.slice(idTitle.length);

        if (dbArray.length > 0) {
          dbArray.map((id) => {
            // id is the board id
            axios
              .post("api/collaborators/boardTitle", { board_id: id })
              .then((res) => {
                // res.data looks like this: {id: 3, title: 'Greek Itinerary'}
                setIdTitle((prevState) => [...prevState, res.data]);
              });
          });
        }
      });
  }, []);

  // activated when "create new board" is clicked
  const handleSubmit = async (e) => {
    e.preventDefault();
    const board = await createBoard(titleRef.current.value, currentUser.id);

    // waits for the board info to be grabbed then uses board.id to add user/board to the collaborator table
    const msg = await addCollaborator(currentUser.id, board.id);

    // let's user know that a board has been created
    alert(msg);

    navigate(`/board/${board.id}`);
  };

  return (
    <>
      {/* ************ NAVIGATION BAR ************/}
      <Navigation
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        setIdTitle={setIdTitle}
      />
      {/* ************ PROFILE ************/}
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
              {/* Displays every board and when the name is clicked, redirect to respective board (calls the OneTitle Component) */}
              {idTitle.map((titleObj) => {
                return <OneTitle key={titleObj.id} titleObj={titleObj} />;
              })}
            </div>
            <Button
              className="mt-2 w-100"
              variant="primary"
              onClick={handleShow}
            >
              Create New Board
            </Button>
            {/* ****** Modal that appears when user creates a new board, user enters title for new board */}
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
