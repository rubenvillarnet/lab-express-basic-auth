const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User.js");
const router = express.Router();

const saltRounds = 1;
const salt = bcrypt.genSaltSync(saltRounds);

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.post("/", (req, res, next) => {
  const userName = req.body.userName;
  const password = req.body.password;

  User.findOne({ userName: userName })
    .then(user => {
      if (!user) {
        res.render("index", {
          errorMessage: "The username doesn`t exist"
        });
        return;
      }
      if (bcrypt.compareSync(password, user.password)) {
        req.session.currentUser = user;
        res.redirect("/");
      } else {
        res.render("index", {
          errorMessage: "Incorrect password"
        });
      }
    })
    .catch(error => next(error));
});

router.get("/register", (req, res, next) => {
  res.render("register");
});

router.post("/register", (req, res, next) => {
  const userName = req.body.userName;
  const password = req.body.password;

  const hash = bcrypt.hashSync(password, salt);
  console.log(userName, hash);
  User.create({ userName: userName, password: hash })
    .then(user => {
      console.log(user);
      res.redirect("/");
    })
    .catch(error => console.log(error));
});

module.exports = router;
