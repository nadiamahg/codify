const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");
// Load input validation
const classValidateNewClassInput = require("../../validation/newClassroom");

const Classroom = require("../../models/Classroom");

const ClassCtrl = require('../../controllers/class_ctrl')

// @route POST api/class/newClass
// @desc Register class
// @access Public
router.post("/newClassroom", (req, res) => {
  // Form validation
const { errors, isValid } = classValidateNewClassInput(req.body);
// Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
Classroom.findOne({ class_name: req.body.class_name }).then(classroom => {
     
      const newClassroom = new Classroom({
        class_name: req.body.class_name,
        class_code: req.body.class_code,
        teacher_username: req.body.teacher_username,
      });
      newClassroom
            .save()
            .then(classroom => res.json(classroom))
            .catch(classroom => console.log(classroom));
    
  });
});

router.get('/classes/:teacher_username', ClassCtrl.getClasses);


module.exports = router;