const express = require('express');
const router = express.Router();
const {
  getItinerariesByUser
} = require('../helpers/dataHelpers');

module.exports = ({
  getBoards,
  getBoardsByUser,
  saveBoard,
  deleteBoard
}) => {
  /* GET all boards*/
  router.get('/', (req, res) => {
    getBoards()
      .then((users) => res.json(users))
      .catch((err) => res.json({
        error: err.message
      }));
  });

  /* GET boards BY user*/
  router.get('/:id', (req, res) => {
    getBoardsByUser(req.params.id)
      .then((usersBoards) => {
        res.json(usersBoards)
        // res.json(formattedItineraries);
      })
      .catch((err) => res.json({
        error: err.message
      }));
  });

  router.post('/', (req, res) => {

    const {
      title,
      owner_id,
      metadata
    } = req.body;

    addBoard(title, owner_id, metadata)
      .then(newBoard => res.json(newBoard))
      .catch(err => res.json({
        error: err.message
      }));

  })

  /*UPDATING BOARD*/
  router.put('/:id', (req, res) => {

    const {
      metadata,
      id
    } = req.body;
    
    console.log('OKOK', metadata, id)
    saveBoard(metadata, id)
      .then(savedBoard => res.json(savedBoard))
      .catch(err => res.json({
        error: err.message
      }));
  })

  router.delete('/:id', (req, res) => {
    deleteBoard(id)
      .then(res.status(204))
  })

  return router;
};