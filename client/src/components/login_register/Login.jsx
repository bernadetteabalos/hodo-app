import { useRef, useEffect, useContext } from "react";

// import from other libraries
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";

// import other component
import Navigation from "../Navigation";
import { currentUserContext } from "../../providers/UserProvider";
import { navContext } from "../../providers/NavProvider";

// import stylesheet
import "../../stylesheets/css/login.css";

const Login = (props) => {
  const { setIdTitle } = props;
  const { currentUser, loginMainProfile } = useContext(currentUserContext);
  const { registerShow } = useContext(navContext);
  const navigate = useNavigate();
  const emailRef = useRef();
  const pwRef = useRef();

  // setShowLogin to display 'register' button in the nav bar (showLogin passed down to Navigation component)
  useEffect(() => {
    registerShow();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    loginMainProfile(emailRef.current.value, pwRef.current.value);

    // // axios request to check if user's credentials matches those in database
    // const urlOneUserApi = `/api/users/login`;
    // axios
    //   .post(urlOneUserApi, {
    //     email: emailRef.current.value,
    //     password: pwRef.current.value,
    //   })
    //   // axios request returns json data with either msg(w/ error msg to client) ex {msg: 'incorrect credentials'}
    //   .then((res) => {
    //     if (res.data.msg) {
    //       // display msg to user if incorrect credentials
    //       alert(res.data.msg);
    //     } else {
    //       // sets current user object to user data found in db {id: 1, first_name: 'mario', last_name: 'test', etc...}
    //       setCurrentUser(res.data);
    //       // setShowLogin to logout to display logout in the nav bar
    //       setShowLogin("logout");
    //       // redirects user to the profile page
    //       navigate("/profile");
    //     }
    //   })
    //   // prints any error
    //   .catch((err) => console.log(err.message));
  };

  console.log("what is my currentUser then?", currentUser);

  return (
    <>
      {/* ************ NAVIGATION BAR ************/}
      <Navigation setIdTitle={setIdTitle} />
      {/* ************ LOGIN FORM ************/}
      <div className="login-page">
        <Container className="login-container">
          <h1>Login</h1>
          <Form onSubmit={handleSubmit} className="w-100">
            <Form.Group>
              <h4>
                <Form.Label className="email-pw">Email </Form.Label>
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
                <Form.Label className="email-pw">Password </Form.Label>
              </h4>
              <Form.Control size="lg" type="password" ref={pwRef} required />
            </Form.Group>
            <Button variant="success" className="w-100 email-pw" type="submit">
              <h4>Login</h4>
            </Button>
          </Form>
        </Container>
      </div>
    </>
  );
};

export default Login;
