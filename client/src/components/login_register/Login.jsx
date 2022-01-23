import { useRef, useState } from "react";

// import other component
import Navigation from "../Navigation";

// import from other libraries
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";

// import stylesheet
import "../../stylesheets/css/login.css";

const Login = (props) => {
  const {
    currentUser,
    setCurrentUser,
    showLogin,
    setShowLogin,
    idTitle,
    setIdTitle,
  } = props;
  const navigate = useNavigate();
  const emailRef = useRef();
  const pwRef = useRef();

  console.log("this is my user in login line 20 --->", currentUser);

  const handleSubmit = (e) => {
    e.preventDefault();

    const urlOneUserApi = `/api/users/login`;

    axios
      .post(urlOneUserApi, {
        email: emailRef.current.value,
        password: pwRef.current.value,
      })
      // axios request returns json data with either msg(w/ error msg to client) ex {msg: 'incorrect credentials'}
      .then((res) => {
        if (res.data.msg) {
          // display msg to user if incorrect credentials
          alert(res.data.msg);
        } else {
          // sets current user object to user data found in db {id: 1, first_name: 'mario', last_name: 'test', etc...}
          setCurrentUser(res.data);
          setShowLogin("logout");
          navigate("/profile");
          // // post request to get the user info
          // axios
          //   .post("api/collaborators/userboards", { user_id: res.data.id })
          //   .then((response) => {
          //     // response.data looks like this: [1,3]

          //     // Checks if the user has any exisiting boards. If so, do individual axios request to get board titles. If user does not, navigate to profile
          //     if (response.data.length > 0) {
          //       response.data.map((id) => {
          //         // id is the board id
          //         axios
          //           .post("api/collaborators/boardTitle", { board_id: id })
          //           .then((res) => {
          //             // res.data looks like this: {id: 3, title: 'Greek Itinerary'}
          //             setIdTitle((prevState) => [...prevState, res.data]);
          //             navigate("/profile");
          //           });
          //       });
          //     } else {
          //       navigate("/profile");
          //     }
          //   });
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <Navigation
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        setIdTitle={setIdTitle}
      />
      <div className="login-page">
        <Container className="login-container m-auto">
          <h1>Login</h1>
          <Form onSubmit={handleSubmit} className="w-100">
            <Form.Group className="mb-3">
              <h4>
                <Form.Label>Email: </Form.Label>
              </h4>
              <Form.Control
                size="lg"
                type="email"
                ref={emailRef}
                required
                placeholder="name@example.com"
              />
            </Form.Group>
            <Form.Group>
              <h4>
                <Form.Label>Password: </Form.Label>
              </h4>
              <Form.Control size="lg" type="password" ref={pwRef} required />
            </Form.Group>
            <Button className="w-100 mt-2" type="submit">
              <h4>Login</h4>
            </Button>
          </Form>
        </Container>
      </div>
    </>
  );
};

export default Login;
