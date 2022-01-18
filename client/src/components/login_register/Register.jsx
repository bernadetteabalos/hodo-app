import { Container, Form, Button } from "react-bootstrap";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import Profile from "../logged_in/Profile";
import { useNavigate } from "react-router-dom";

// import stylesheet
import "../../stylesheets/css/register.css";

const Register = (props) => {
  const { setCurrentUser } = props;
  const navigate = useNavigate();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const pwRef = useRef();
  const photoRef = useRef();

  // const [user, setUser] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const urlPostApi = "/api/users";
    axios
      .post(urlPostApi, {
        first_name: firstNameRef.current.value,
        last_name: lastNameRef.current.value,
        email: emailRef.current.value,
        password: pwRef.current.value,
        profile_photo: photoRef.current.value,
      })
      .then((res) => {
        console.log("client res--->", res.data);
        console.log(typeof res.data);
        setCurrentUser(res.data);
        navigate("/profile");
        // would then change it to 'navigate("/users/${id}")
      })
      // .then((res) => {
      //   console.log("ressssss before nav", res);
      //   console.log("currentUser", currentUser);
      //   navigate("/profile");
      // })
      .error((err) => console.log(err.message));
  };

  // useEffect(() => {
  //   navigate("/user/1");
  // }, [currentUser]);

  // console.log("user--->", user);

  return (
    <div className="register-page">
      <Container className="register-container m-auto">
        <h1>Register</h1>
        <Form onSubmit={handleSubmit} className="w-100">
          <Form.Group className="mb-3">
            <h4>
              <Form.Label>First Name: </Form.Label>
            </h4>
            <Form.Control
              size="lg"
              type="text"
              ref={firstNameRef}
              required
              placeholder="First Name"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <h4>
              <Form.Label>Last Name: </Form.Label>
            </h4>
            <Form.Control
              size="lg"
              type="text"
              ref={lastNameRef}
              required
              placeholder="Last Name"
            />
          </Form.Group>
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
          <Form.Group controlId="formFileLg" className="my-3">
            <h4>
              <Form.Label>Upload Profile Photo: </Form.Label>
            </h4>
            <Form.Control ref={photoRef} type="file" size="lg" />
          </Form.Group>
          <Button className="w-100 mt-2" type="submit">
            <h4>Register</h4>
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default Register;
