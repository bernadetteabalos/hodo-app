import { Button } from "react-bootstrap";
import "../../stylesheets/css/profile.css";

const Profile = (props) => {
  const { currentUser } = props;
  console.log("this is currentUser", currentUser);
  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="left-profile">
          <div className="profile-photo">
            <img src={currentUser.profile_photo} alt="profile-photo" />
          </div>
          <div className="profile-name">
            <h4>{currentUser.first_name}</h4>
          </div>
        </div>
        <div className="right-profile">
          <div className="itineraries-container">
            <h1>My Itineraries</h1>
            <ul>
              <li>JAPAN 2020</li>
            </ul>
          </div>
          <Button type="submit" className="w-100 mt-3">
            <h4>Create New Itinerary</h4>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
