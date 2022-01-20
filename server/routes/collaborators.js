const express = require("express");
const router = express.Router();

module.exports = ({ updateCollaborators }) => {
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

  return router;
};
