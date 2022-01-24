// import from other libraries
import { useNavigate } from "react-router-dom";
// import styling
import "../../stylesheets/css/onetitle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointRight } from "@fortawesome/free-solid-svg-icons";

// this component is imported into the Profile Component
const OneTitle = (props) => {
  const { titleObj } = props;
  const navigate = useNavigate();

  // activated when specific title is clicked -- navigate to specific board
  const handleTitle = (e) => {
    e.preventDefault();
    navigate(`/board/${titleObj.id}`);
  };

  return (
    <div>
      <h3 onClick={handleTitle} className="handleTitle itineraryBoards">
        &nbsp;
        <FontAwesomeIcon icon={faHandPointRight} />
        &nbsp;{titleObj.title}
      </h3>
      <br></br>
    </div>
  );
};

export default OneTitle;
