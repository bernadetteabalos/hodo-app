const express = require("express");
const router = express.Router();

module.exports = ({
  updateCollaborators,
  getSpecificBoards,
  getBoardIdTitle,
}) => {
  /* api/collaborators*/
  // POST Add Collaborator: route activated when user clicked 'Add a Collaborator' button on board. Adds to collaborators table
  router.post("/", (req, res) => {
    // deconstructoring the info being passed down
    const { user_id, board_id } = req.body;

    console.log("this is the user_id-->", user_id);
    console.log("this is the board_id--->", board_id);

    updateCollaborators(user_id, board_id)
      .then((results) => {
        // console.log(
        //   "hit line 15 in collaborators after the function call. This is the res",
        //   res
        // );
        return res.json({
          msg: "Added collaborator to board! Happy planning!",
        });
      })
      .catch((err) => {
        return res.json({
          msg: "cannot add collaborator because collaborator id does not exist",
        });
      });
  });

  // POST userboards: route activated when user clicked 'Login' button on login page. Display the boards of the user
  router.post("/userboards", (req, res) => {
    // deconstructoring the info being passed down
    const { user_id } = req.body;

    getSpecificBoards(user_id).then((boardIdArray) => {
      console.log("what is my boardIdArray--->", boardIdArray);
      // boardIdArray looks like this [1,3]
      return res.json(boardIdArray);
    });
  });

  router.post("/boardTitle", (req, res) => {
    const { board_id } = req.body;
    // console.log("line 78 from collaborators.js", board_id);
    getBoardIdTitle(board_id).then((result) => {
      // console.log("result from line 81--->", result);
      res.json(result);
    });
  });

  return router;
};
