//styling
import { Container, Navbar } from "react-bootstrap";
import "../stylesheets/css/navigation.css";

const Navigation = (props) => {
  const { currentUser, setCurrentUser } = props;

  return (
    <>
      <Navbar className="navbar">
        <Container>
          <Navbar.Brand href="/">
            <img
              src="https://media.istockphoto.com/photos/paper-plane-on-red-background-picture-id1358970693?b=1&k=20&m=1358970693&s=170667a&w=0&h=AgDbacTXHFKtBYvnkzpbL5k38J-o08iUx-6j7zPDo6Q="
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Hodo logo"
            />
          </Navbar.Brand>
          <Navbar.Brand href="/">
            <h3>Hodo</h3>
          </Navbar.Brand>
          <Navbar.Brand href="/about">
            <span className="head">About Us</span>
          </Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            {!currentUser.id && (
              <Navbar.Brand href="/login">
                <h3 className="head">Login</h3>
              </Navbar.Brand>
            )}
            <Navbar.Brand className="vr"></Navbar.Brand>
            {!currentUser.id && (
              <Navbar.Brand href="/register" className="me-2">
                <h3 className="head">Register</h3>
              </Navbar.Brand>
            )}
            {currentUser.id && (
              <Navbar.Brand
                href="/"
                className="me-2"
                onClick={() => {
                  setCurrentUser({});
                }}
              >
                <h3>Logout</h3>
              </Navbar.Brand>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Navigation;
