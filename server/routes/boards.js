const express = require("express");
const router = express.Router();
const { getItinerariesByUser } = require("../helpers/dataHelpers");

module.exports = ({
  getBoard,
  getBoardsByUser,
  addBoard,
  saveBoard,
  deleteBoard,
}) => {
  /* GET boards BY USER ID*/
  router.get("/", (req, res) => {
    const id = req.query.user_id;
    getBoardsByUser(id)
      .then((usersBoards) => {
        res.json(usersBoards);
        // res.json(formattedItineraries);
      })
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  /* GET board BY ID */
  router.get("/:id", (req, res) => {
    getBoard(req.params.id)
      .then((users) => res.json(users))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  router.post("/", (req, res) => {
    const { title, user_id, metadata } = req.body;

    addBoard(title, user_id, metadata)
      .then((newBoard) => res.json(newBoard))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  /*UPDATING BOARD*/
  router.put("/:id", (req, res) => {
    const { metadata, id, budget_data } = req.body;

    console.log("OKOK", metadata, id, budget_data);
    saveBoard(metadata, id, budget_data)
      .then((savedBoard) => res.json(savedBoard))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  router.delete("/:id", (req, res) => {
    deleteBoard(id).then(res.status(204));
  });

  return router;
};
