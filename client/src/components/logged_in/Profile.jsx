import { Button } from "react-bootstrap";
import "../../stylesheets/css/profile.css";

const Profile = () => {
  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="left-profile">
          <div className="profile-photo">
            <img
              src="https://media.istockphoto.com/photos/portrait-of-a-young-adult-asian-woman-in-venice-picture-id1157741177?b=1&k=20&m=1157741177&s=170667a&w=0&h=c91rVcd5iQ9Lwv2OMwnE36vXZ8mQKvVKjGVg9elWoRk="
              alt="profile-photo"
            />
          </div>
          <div className="profile-name">
            <h4>JANE</h4>
          </div>
        </div>
        <div className="right-profile">
          <div class="itineraries-container">
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
