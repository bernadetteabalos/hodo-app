import { useState, useRef } from "react";
// import from other localhost files
import useApplicationData from "../../hooks/forBoards";
import Navigation from "../Navigation";
import axios from "axios";

// import from other libraries
import { useNavigate, Link } from "react-router-dom";
import { Button, Modal, Form } from "react-bootstrap";

// import other components
import OneTitle from "./OneTitle";

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
  // console.log("this is currentUser", currentUser);
  console.log("this is my idTitle", idTitle);
  console.log("this is my showLogin", showLogin);

  useEffect(() => {
    setShowLogin("logout");

    axios
      .post("api/collaborators/userboards", { user_id: currentUser.id })
      .then((response) => {
        // response.data looks like this: [1,3]

        // compare if the length of the board array is the same as the idTitle array.

        // Checks if the user has any exisiting boards. If so, do individual axios request to get board titles. If user does not, navigate to profile

        console.log(
          "line 47 on profile, what is my response.data---->",
          response.data
        );

        // response.data : [1,3, 4]
        // idTitle : [{},{}]
        console.log("what is response.data???-->", response.data);
        console.log("what is idTitle???--->", idTitle);
        const dbArray = response.data.slice(idTitle.length);
        console.log("dbSArrary---->", dbArray);

        if (dbArray.length > 0) {
          console.log("do I hit line 61 in the map???");
          dbArray.map((id) => {
            // id is the board id
            axios
              .post("api/collaborators/boardTitle", { board_id: id })
              .then((res) => {
                // res.data looks like this: {id: 3, title: 'Greek Itinerary'}
                setIdTitle((prevState) => [...prevState, res.data]);
                // navigate("/profile");
              });
          });
        }
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const board = await createBoard(titleRef.current.value, currentUser.id);

    // waits for the board info to be grabbed then uses board.id to add user/board to the collaborator table
    const msg = await addCollaborator(currentUser.id, board.id);

    alert(msg);

    setIdTitle((prevState) => [
      ...prevState,
      { id: board.id, title: board.title },
    ]);

    navigate(`/board/${board.id}`);
  };

  console.log("this is my user in profile line 36 --->", currentUser);

  return (
    <>
      <Navigation
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        setIdTitle={setIdTitle}
      />
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
              {idTitle.map((titleObj) => {
                return <OneTitle key={titleObj.id} titleObj={titleObj} />;
                // // string interpolation not working
                // <Link id={titleObj.id} to="/board/:id">
                //   {titleObj.title}
                // </Link>
                // <Link id={titleObj.id} to="/board/:id">
                //   {titleObj.name}
                // </Link>
              })}
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
