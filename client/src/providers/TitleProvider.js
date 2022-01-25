// idTitle and setIdTitle. For the purposes of displaying the board titles of the specific user.

import axios from "axios";

import { useState, createContext } from "react";

export const idTitleContext = createContext();

const IdTitleProvider = (props) => {
  const [idTitle, setIdTitle] = useState([]);

  const clearIdTitle = () => {
    setIdTitle([]);
  };

  const getAllBoardIdTitle = (userId) => {
    // axios request to get the board id and titles associated with the specific user
    // 1. axios request to collaborators table to get the board ids associated with the user
    axios
      .post("/api/collaborators/userboards", { user_id: userId })
      .then((response) => {
        // response.data looks like this: [1,3] <-- this is the list of the board id associated with the user

        // will only send axios request for title if user has boards
        if (response.data.length > 0) {
          response.data.map((id) => {
            // id is the board id
            axios
              .post("/api/collaborators/boardTitle", { board_id: id })
              .then((res) => {
                // res.data looks like this: {id: 3, title: 'Greek Itinerary'}
                setIdTitle((prevState) => [...prevState, res.data]);
              });
          });
        }
      });
  };

  const providerData = {
    idTitle,
    clearIdTitle,
    getAllBoardIdTitle,
  };
  const Provider = idTitleContext.Provider;
  return <Provider value={providerData}>{props.children}</Provider>;
};

export default IdTitleProvider;
