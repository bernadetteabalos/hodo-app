import { useRef, useEffect, useContext } from "react";

// import from other libraries
import { Container, Form, Button } from "react-bootstrap";

// import other Components and from providers
import Navigation from "../Navigation";
import { currentUserContext } from "../../providers/UserProvider";
import { navContext } from "../../providers/NavProvider";

// import stylesheet
import "../../stylesheets/css/login.css";

const Login = (props) => {
  const { setIdTitle } = props;
  const { loginMainProfile } = useContext(currentUserContext);
  const { registerShow } = useContext(navContext);
  const emailRef = useRef();
  const pwRef = useRef();

  // setShowLogin to display 'register' button in the nav bar (showLogin passed down to Navigation component)
  useEffect(() => {
    registerShow();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // fcn from currentUserContext. (fcn: does axios request to db to see if entered credentials are valid. If so, logs user in/set user to currentUser, and redirects to profile. Else, alert user)
    loginMainProfile(emailRef.current.value, pwRef.current.value);
  };

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
              <Form.Control
                size="lg"
                type="password"
                ref={pwRef}
                name="password"
                autoComplete="on"
                required
              />
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
