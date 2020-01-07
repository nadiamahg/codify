const Classroom = require('../models/Classroom');
const classValidateNewClassInput = require("../validation/newClassroom");
const keys = require("../config/keys");

// @access Public
newClassroom = (req, res) => {
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
};

getClassrooms = async (req, res) => {
  await Classroom.find({ teacher_username: req.params.teacher_username }, (err, classrooms) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }
    if (!classrooms.length) {
      return res
        .status(404)
        .json({ success: false, error: `Classes not found` })
    }
    return res.status(200).json({ success: true, data: classrooms })
  }).catch(err => console.log(err))
};

module.exports = {
  newClassroom,
  getClassrooms
}