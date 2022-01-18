const express = require("express");
const router = express.Router();
const { getPostsByUsers } = require("../helpers/dataHelpers");

module.exports = ({ getUsers, getUserByEmail, addUser, getUsersPosts }) => {
  /* GET users listing. */
  router.get("/", (req, res) => {
    getUsers()
      .then((users) => res.json(users))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  router.get("/posts", (req, res) => {
    getUsersPosts()
      .then((usersPosts) => {
        const formattedPosts = getPostsByUsers(usersPosts);
        res.json(formattedPosts);
      })
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  router.post("/", (req, res) => {
    const { first_name, last_name, email, password, profile_photo } = req.body;

    getUserByEmail(email)
      .then((user) => {
        if (user) {
          res.json({
            msg: "Sorry, a user account with this email already exists",
          });
        } else {
          return addUser(first_name, last_name, email, password, profile_photo);
        }
      })
      .then((newUser) => res.json(newUser))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  router.post("/:id", (req, res) => {
    const { email, password } = req.body;
    getUserByEmail(email)
      .then((user) => {
        console.log("user--->", user);
        if (user.length >= 1) {
          console.log("hey look, a user in the db--->", user);
          if (password === user[0].password) {
            console.log("hit this route");
            return res.json(user[0]);
          } else {
            return res.json({ msg: "Sorry, invalid password" });
          }
        } else {
          return res.json({
            msg: "Sorry, a user account with this email does not exist.",
          });
        }
      })
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  return router;
};
