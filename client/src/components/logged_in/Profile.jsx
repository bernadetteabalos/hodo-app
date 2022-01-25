import { useState, useRef, useEffect, useContext } from "react";

// import from other libraries
import { useNavigate } from "react-router-dom";
import { Button, Modal, Form } from "react-bootstrap";
import axios from "axios";

// import other components/providers
import OneTitle from "./OneTitle";
import Navigation from "../Navigation";
import { currentUserContext } from "../../providers/UserProvider";
import { navContext } from "../../providers/NavProvider";
import { idTitleContext } from "../../providers/TitleProvider";

// import helpers from local files
import useApplicationData from "../../hooks/forBoards";

// import styling
import "../../stylesheets/css/profile.css";

const Profile = (props) => {
  const { currentUser } = useContext(currentUserContext);
  const { logoutShow } = useContext(navContext);
  const { idTitle, getAllBoardIdTitle, clearIdTitle } =
    useContext(idTitleContext);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const titleRef = useRef();
  const { createBoard, addCollaborator } = useApplicationData();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    console.log("who is my user on line 32 of profile--->", currentUser);
    // to display the 'logout' button on the nav bar (pass showLogin down to Navigation Component)
    logoutShow();

    // clear the board first (this is to update new title on board if user A makes change and user B goes back to profile page, the new title will be reflected)
    // setIdTitle([]);
    clearIdTitle();

    getAllBoardIdTitle(currentUser.id);

    // // axios request to get the board id and titles associated with the specific user
    // // 1. axios request to collaborators table to get the board ids associated with the user
    // axios
    //   .post("/api/collaborators/userboards", { user_id: currentUser.id })
    //   .then((response) => {
    //     // response.data looks like this: [1,3] <-- this is the list of the board id associated with the user

    //     // will only send axios request for title if user has boards
    //     if (response.data.length > 0) {
    //       response.data.map((id) => {
    //         // id is the board id
    //         axios
    //           .post("/api/collaborators/boardTitle", { board_id: id })
    //           .then((res) => {
    //             // res.data looks like this: {id: 3, title: 'Greek Itinerary'}
    //             setIdTitle((prevState) => [...prevState, res.data]);
    //           });
    //       });
    //     }
    //   });
  }, []);

  // activated when "create new board" is clicked
  const handleSubmit = async (e) => {
    e.preventDefault();
    const board = await createBoard(titleRef.current.value, currentUser.id);

    // waits for the board info to be grabbed then uses board.id to add user/board to the collaborator table
    const msg = await addCollaborator(currentUser.id, board.id);

    // let's user know that a board has been created
    alert(msg);

    // displayIdTitle(board.id, board.title);

    // setIdTitle((prevState) => [
    //   ...prevState,
    //   { id: board.id, title: board.title },
    // ]);

    navigate(`/board/${board.id}`);
  };

  return (
    <>
      {/* ************ NAVIGATION BAR ************/}
      <Navigation />
      {/* ************ PROFILE ************/}
      <div className="profile-page">
        <div className="profile-container">
          <div className="left-profile">
            <div
              className="profile-photo"
              // style={{
              //   backgroundImage: `url(${currentUser.profile_photo})`,
              // }}
            >
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
