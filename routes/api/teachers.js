const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
// Load input validation
const teacherValidateRegisterInput = require("../../validation/teacherRegister");
const teacherValidateLoginInput = require("../../validation/teacherLogin");
// Load Teacher model
const Teacher = require("../../models/Teacher");

// @route POST api/teachers/register
// @desc Register teacher
// @access Public
router.post("/register", (req, res) => {
  // Form validation
const { errors, isValid } = teacherValidateRegisterInput(req.body);
// Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
Teacher.findOne({ username: req.body.username }).then(teacher => {
    if (teacher) {
      return res.status(400).json({ username: "username already exists" });
    } else {
      const newTeacher = new Teacher({
        first_name: req.body.first_name,
        surname: req.body.surname,
        username: req.body.username,
        password: req.body.password
      });
// Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newTeacher.password, salt, (err, hash) => {
          if (err) throw err;
          newTeacher.password = hash;
          newTeacher
            .save()
            .then(teacher => res.json(teacher))
            .catch(teacher => console.log(teacher));
        });
      });
    }
  });
});

// @route POST api/teachers/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation
  const { errors, isValid } = teacherValidateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const username = req.body.username;
  const password = req.body.password;
// Find user by username
  Teacher.findOne({ username }).then(teacher => {
    // Check if user exists
    if (!teacher) {
      return res.status(404).json({ usernamenotfound: "Username not found" });
    }
// Check password
    bcrypt.compare(password, teacher.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: teacher.id,
          first_name: teacher.first_name,
          surname: teacher.surname,
          username: teacher.username
        };
// Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

module.exports = router;