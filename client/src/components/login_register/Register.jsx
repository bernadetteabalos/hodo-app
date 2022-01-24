import { useRef, useEffect } from "react";

// import from other libraries
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";

// import other components
import Navigation from "../Navigation";

// import stylesheet
import "../../stylesheets/css/register.css";
import "../../stylesheets/css/login.css";

const Register = (props) => {
  const { setCurrentUser, showLogin, setShowLogin, setIdTitle } = props;
  const navigate = useNavigate();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const pwRef = useRef();
  const photoRef = useRef();

  // setShowLogin to display 'login' button in the nav bar (showLogin passed down to Navigation component)
  useEffect(() => {
    setShowLogin("login");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // axios request add user to database
    const urlPostApi = "/api/users/register";
    axios
      .post(urlPostApi, {
        first_name: firstNameRef.current.value,
        last_name: lastNameRef.current.value,
        email: emailRef.current.value,
        password: pwRef.current.value,
        profile_photo: photoRef.current.value,
      })
      .then((res) => {
        if (res.data.msg) {
          // alert user if there is an error (eg 'user with email already exists')
          alert(res.data.msg);
        } else {
          // set current user to the one that was just added to the db
          setCurrentUser(res.data);
          // setShowLogin to logout to display logout in the nav bar
          setShowLogin("logout");
          // redirects user to the profile page
          navigate("/profile");
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      {/* ************ NAVIGATION BAR ************/}
      <Navigation
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        setIdTitle={setIdTitle}
      />
      {/* ************ REGISTRATION FORM ************/}
      <div className="register-page">
        <Container className="register-container m-auto">
          <h1>Register</h1>
          <Form onSubmit={handleSubmit} className="w-100">
            <Form.Group className="mb-3">
              <h4>
                <Form.Label className="form-label">First Name </Form.Label>
              </h4>
              <Form.Control size="lg" type="text" ref={firstNameRef} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <h4>
                <Form.Label className="form-label">Last Name </Form.Label>
              </h4>
              <Form.Control size="lg" type="text" ref={lastNameRef} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <h4>
                <Form.Label className="form-label">Email </Form.Label>
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
                <Form.Label className="form-label">Password </Form.Label>
              </h4>
              <Form.Control size="lg" type="password" ref={pwRef} required />
            </Form.Group>
            <Form.Group controlId="formFileLg" className="my-3">
              <h4>
                <Form.Label className="form-label">
                  Upload Profile Photo{" "}
                </Form.Label>
              </h4>
              <Form.Control ref={photoRef} type="file" size="lg" />
            </Form.Group>
            <Button variant="success" className="w-100" type="submit">
              <h4>Register</h4>
            </Button>
          </Form>
        </Container>
      </div>
    </>
  );
};

export default Register;
