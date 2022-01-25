import { useState, useRef, useEffect, useContext } from "react";

// import from other libraries
import { useNavigate } from "react-router-dom";
import { Button, Modal, Form } from "react-bootstrap";

// import other Components and from providers
import OneTitle from "./OneTitle";
import Navigation from "../Navigation";
import { currentUserContext } from "../../providers/UserProvider";
import { navContext } from "../../providers/NavProvider";
import { idTitleContext } from "../../providers/TitleProvider";

// import helpers from local files
import useApplicationData from "../../hooks/forBoards";

// import styling
import "../../stylesheets/css/profile.css";

const Profile = () => {
  // show state for the Modal
  const [show, setShow] = useState(false);
  // useRef and useNavigate
  const titleRef = useRef();
  const navigate = useNavigate();
  // deconstructing from providers and helpers
  const { currentUser } = useContext(currentUserContext);
  const { logoutShow } = useContext(navContext);
  const { idTitle, getAllBoardIdTitle, clearIdTitle } =
    useContext(idTitleContext);
  const { createBoard, addCollaborator } = useApplicationData();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    // to display the 'logout' button on the nav bar (pass showLogin down to Navigation Component)
    logoutShow();

    // clear the board first (this is to update new title on board if user A makes change and user B goes back to profile page, the new title will be reflected)
    // setIdTitle([]);
    clearIdTitle();

    // calls the getAllBoardIdTitle from idTitleContext (which does an axios post request to get the board ids and titles associated with the specific user)
    getAllBoardIdTitle(currentUser.id);
  }, []);

  // activated when "create new board" is clicked
  const handleSubmit = async (e) => {
    e.preventDefault();
    // board has the value of the new board created (createBoard is a fcn that makes an axios request)
    const board = await createBoard(titleRef.current.value, currentUser.id);

    // waits for the board info to be grabbed then uses board.id to add user/board to the collaborator table
    const msg = await addCollaborator(currentUser.id, board.id);

    // let's user know that a board has been created
    alert(msg);

    // navigates to the specific board that has just been created
    navigate(`/board/${board.id}`);
  };

  return (
    <>
      {/* ************ NAVIGATION BAR ************/}
      <Navigation />
      {/* ************ PROFILE PAGE************/}
      <div className="profile-page">
        <div className="profile-container">
          {/* ****** LEFT SIDE OF PAGE WITH PROFILE PHOTO, NAME, ID *****/}
          <div className="left-profile">
            <div className="profile-photo">
              <img src={currentUser.profile_photo} alt="profile-photo" />
            </div>
            <div className="profile-name">
              <strong>
                <h3 className="nameEmphasis">{currentUser.first_name}</h3>
              </strong>
            </div>
            <div>
              <h5>Your id is: {currentUser.id}</h5>
            </div>
          </div>
          {/* ****** RIGHT SIDE OF PAGE WITH LIST OF BOARDS AND CREATE BTN ***/}
          <div className="right-profile">
            <div className="itineraries-container">
              <h1>My Boards</h1>
              {/* Displays every board and when the name is clicked, redirect to respective board (calls the OneTitle Component) */}
              <div>
                {idTitle.map((titleObj) => {
                  return <OneTitle key={titleObj.id} titleObj={titleObj} />;
                })}
              </div>
            </div>
            <Button className="create-btn" onClick={handleShow}>
              <h3>Create New Board</h3>
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
                  <Button variant="danger" onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button
                    variant="light"
                    type="submit"
                    class="btn btn-outline-secondary"
                  >
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
