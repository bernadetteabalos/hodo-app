const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const { getPostsByUsers } = require("../helpers/dataHelpers");
const cookieSession = require("cookie-session");
const app = require("../app");

module.exports = ({
  getUsers,
  getUserByEmail,
  addUser,
  getUsersPosts,
  updateBoardTitle,
}) => {
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

  // ********** POST REQUESTS **************

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
      .then((newUser) => {
        // newUser looks like this: {
        //   id: 7,
        //   first_name: 'ok',
        //   last_name: 'ok',
        //   email: 'ok@ok',
        //   password: '$2a$10$NpXEdN0Ej/3Xzij/r5ZqreEsg3mGt9HE0/yg00BYVgydZJnGTZw4m',
        //   profile_photo: ''
        // }
        // create cookie session
        // req.session.user_id = newUser.id;
        // newUser.cookie = req.session.user_id;
        return res.json(newUser);
      })
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  // POST Login: route activated when user clicks 'login' button
  router.post("/login", (req, res) => {
    const { email, password } = req.body;

    getUserByEmail(email)
      .then((user) => {
        // console.log("user--->", user);
        if (user.length >= 1) {
          //compares if the hashed password of the inputted password matches the one in our db
          const comparePass = bcrypt.compareSync(password, user[0].password);
          if (comparePass) {
            // If matches, set cookie session
            // req.session.user_id = user[0].id;
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
      .catch((err) => {
        res.json({
          error: err.message,
        });
      });
  });

  // Logout Route activated when user selected "logout" button. Cookie session cleared
  router.post("/logout", (req, res) => {
    req.session = null;
    return res.json({ msg: "You are now logged out" });
  });

  //************** PUT REQUESTS */

  // PUT title: route activated when user clicks 'save' button for the title
  router.put("/title", (req, res) => {
    // getting the title from the form
    const { id, title } = req.body;
    // get the board Id that is present as a prop, send that down into the axios request
    // updateBoardTitleFunction

    console.log("id, title", id, title);

    updateBoardTitle(id, title)
      .then((board) => res.json(board))
      .catch((err) => {
        res.json({
          error: err.message,
        });
      });
  });

  return router;
};
