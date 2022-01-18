const express = require("express");
const bcrypt = require("bcryptjs");
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

  // POST Register: route activated when user clicks 'register' button
  router.post("/register", (req, res) => {
    const { first_name, last_name, email, password, profile_photo } = req.body;

    //Hashing the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    console.log("hash password", hashedPassword);

    //Checks to see if there is a user in the db based on email
    getUserByEmail(email)
      .then((user) => {
        // user is an array
        if (user.length > 0) {
          console.log("sadness");
          res.json({
            msg: "Sorry, a user account with this email already exists",
          });
        } else {
          // if user does not exist, adds new user to db
          return addUser(
            first_name,
            last_name,
            email,
            hashedPassword,
            profile_photo
          );
        }
      })
      // sending info as JSON for front-end
      .then((newUser) => res.json(newUser))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  router.post("/login", (req, res) => {
    const { email, password } = req.body;

    getUserByEmail(email)
      .then((user) => {
        // console.log("user--->", user);
        if (user.length >= 1) {
          //compares if the hashed password of the inputted password matches the one in our db
          const comparePass = bcrypt.compareSync(password, user[0].password);
          if (comparePass) {
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
