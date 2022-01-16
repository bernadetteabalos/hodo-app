import { Container, Form, Button } from "react-bootstrap";
import { useRef } from "react";

// import stylesheet
import "../../stylesheets/css/login.css";

const Login = () => {
  const emailRef = useRef();
  const pwRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
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
  );
};

export default Login;
