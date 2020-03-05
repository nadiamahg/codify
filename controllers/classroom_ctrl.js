const Classroom = require('../models/Classroom');
const Student = require('../models/Student');
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
    if (classroom) {
      return res.status(400).json({ class_name: "classroom name already exists" });
    } else {
      const newClassroom = new Classroom({
        class_name: req.body.class_name,
        class_code: req.body.class_code,
        teacher_username: req.body.teacher_username,
      });
      newClassroom
        .save()
        .then(classroom => res.json(classroom))
        .catch(classroom => console.log(classroom));
    }
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

getClassroom = async (req, res) => {
  await Classroom.findOne({ class_name: req.params.class_name }, (err, classroom) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }
    if (!classroom) {
      return res
        .status(404)
        .json({ success: false, error: `Class not found` })
    }
    return res.status(200).json({ success: true, data: classroom })
  }).catch(err => console.log(err))
};

getStudents = async (req, res) => {
  await Classroom.findOne({ class_name: req.params.class_name }, (err, classroom) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }
    if (!classroom) {
      return res
        .status(404)
        .json({ success: false, error: `Class not found` })
    }
    Student.find({ class_code: classroom.class_code }, (err, students) => {
      if (err) {
        return res.status(400).json({ success: false, error: err })
      }
      if (!students) {
        return res
          .status(404)
          .json({ success: false, error: `Students not found` })
      }
      return res.status(200).json({ success: true, data: students })
    }).catch(err => console.log(err))
  }).catch(err => console.log(err))
};

deleteClassroom = async (req, res) => {
    await Classroom.findOneAndDelete({ class_name: req.params.class_name, class_code:  req.params.class_code}, (err, classroom) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!classroom) {
            return res
                .status(404)
                .json({ success: false, error: `Classroom not found` })
        }

        return res.status(200).json({ success: true, data: classroom })
    }).catch(err => console.log(err))
}

module.exports = {
  newClassroom,
  getClassrooms,
  getClassroom,
  getStudents,
  deleteClassroom
}