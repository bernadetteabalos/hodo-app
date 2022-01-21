//import other Component
import Navigation from "../Navigation";

// import styling
import "../../stylesheets/css/home.css";

const Home = (props) => {
  const { currentUser, setCurrentUser, showLogin, setShowLogin, setIdTitle } =
    props;
  return (
    <>
      <Navigation
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        setIdTitle={setIdTitle}
      />
      <div className="home-page">
        <h1>Hodo-</h1>
        <h2>
          <em>Prefix for 'road', 'path', 'travel'</em>
        </h2>
        <div>
          <img
            src="https://media.istockphoto.com/photos/the-word-2022-behind-the-tree-of-empty-asphalt-road-at-golden-sunset-picture-id1300086148?b=1&k=20&m=1300086148&s=170667a&w=0&h=vh75YUEVACLRBF96r0pwFof0HX-ZTjX0PwUr2e94h0s="
            alt="home-page-photo"
          />
        </div>
        <br></br>
        <h3>
          <em>
            A collaborative whiteboard application that allows for the planning
            of itineraries!
          </em>
        </h3>
      </div>
    </>
  );
};

export default Home;
