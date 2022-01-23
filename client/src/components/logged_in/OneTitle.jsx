import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

import "../../stylesheets/css/onetitle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointRight } from "@fortawesome/free-solid-svg-icons";

const OneTitle = (props) => {
  const { titleObj } = props;
  const navigate = useNavigate();
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
