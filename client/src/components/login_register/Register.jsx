import { useRef, useEffect, useContext } from "react";

// import from other libraries
import { Container, Form, Button } from "react-bootstrap";

// import other components/providers
import Navigation from "../Navigation";
import { navContext } from "../../providers/NavProvider";
import { currentUserContext } from "../../providers/UserProvider";

// import stylesheet
import "../../stylesheets/css/register.css";
import "../../stylesheets/css/login.css";

const Register = (props) => {
  const { setIdTitle } = props;
  const { registerMainProfile } = useContext(currentUserContext);
  const { loginShow } = useContext(navContext);
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const pwRef = useRef();
  const photoRef = useRef();

  // setShowLogin to display 'login' button in the nav bar (showLogin passed down to Navigation component)
  useEffect(() => {
    loginShow();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    registerMainProfile(
      firstNameRef.current.value,
      lastNameRef.current.value,
      emailRef.current.value,
      pwRef.current.value,
      photoRef.current.value
    );
  };

  return (
    <>
      {/* ************ NAVIGATION BAR ************/}
      <Navigation setIdTitle={setIdTitle} />
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
