const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
// Load input validation
const studentValidateRegisterInput = require("../../validation/studentRegister");
const studentValidateLoginInput = require("../../validation/studentLogin");
// Load student model
const Student = require("../../models/Student");
const Classroom = require("../../models/Classroom");
// @route POST api/student/register
// @desc Register student
// @access Public
router.post("/register", (req, res) => {
  // Form validation
  const { errors, isValid } = studentValidateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  Classroom.findOne({ class_code: req.body.class_code }).then(student => {
    if (!student) {
      return res.status(400).json({ classcodenotfound: "Class code not found" });
    } else {
      Student.findOne({ username: req.body.username }).then(student => {
        if (student) {
          return res.status(400).json({ username: "Username is taken" });
        } else {
          const newStudent = new Student({
            first_name: req.body.first_name,
            surname: req.body.surname,
            username: req.body.username,
            class_code: req.body.class_code,
            password: req.body.password
          });
          // Hash password before saving in database
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newStudent.password, salt, (err, hash) => {
              if (err) throw err;
              newStudent.password = hash;
              newStudent
                .save()
                .then(student => res.json(student))
                .catch(student => console.log(student));
            });
          });
        }
      });
    }
  });


});

// @route POST api/student/login
// @desc Login student and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation
  const { errors, isValid } = studentValidateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const username = req.body.username;
  const password = req.body.password;
  // Find student by username
  Student.findOne({ username }).then(student => {
    // Check if student exists
    if (!student) {
      return res.status(404).json({ usernamenotfound: "Usename not found" });
    }
    // Check password
    bcrypt.compare(password, student.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: student.id,
          first_name: student.first_name,
          surname: student.surname
        };
        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey, {
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