const Assignment = require('../models/Assignment');
const ClassroomAssignments = require('../models/ClassroomAssignments');
const StudentAssignments = require('../models/StudentAssignments');
const Students = require('../models/Student');
const assignmentValidateNewAssignmentInput = require("../validation/newAssignment");
const assignmentValidateSetAssignmentInput = require("../validation/setAssignment");
const keys = require("../config/keys");

// @access Public
newAssignment = (req, res) => {
  // Form validation
  const { errors, isValid } = assignmentValidateNewAssignmentInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  Assignment.findOne({ assignment_name: req.body.assignment_name }).then(assignment => {
    if (assignment) {
      return res.status(400).json({ assignment_name: "assignment name already exists" });
    } else {
      const newAssignment = new Assignment({
        assignment_name: req.body.assignment_name,
        assignment_question: req.body.assignment_question,
        assignment_solution: req.body.assignment_solution,
        assignment_compiled_solution: req.body.assignment_compiled_solution,
        assignment_test_code: req.body.assignment_test_code,
        teacher_username: req.body.teacher_username,
      });
      newAssignment
        .save()
        .then(assignment => res.json(assignment))
        .catch(assignment => console.log(assignment));
    }
  });
};

submitAssignment = (req, res) => {
  StudentAssignments.findOne({ assignment_name: req.body.assignment_name }).then(assignment => {
      if(!assignment) {
        res.status(404).send("assignment is not found");
      } else {
        assignment.assignment_student_solution = req.body.assignment_student_solution;
        assignment.assignment_student_compiled_solution = req.body.assignment_student_compiled_solution;
        assignment.assignment_score = req.body.assignment_score;
        assignment.assignment_status = req.body.assignment_status;
        assignment.save().then(assignment => {
            res.json('assignment updated!');
        })
        .catch(err => {
            res.status(400).send("Update not possible");
        });
      }
  });
};

setAssignment = (req, res) => {
  ClassroomAssignments.findOne({ assignment_name: req.body.assignment_name }).then(class_assignment => {
    Assignment.findOne({ assignment_name: req.body.assignment_name }).then(assignment => {
      var temp1 = [];
      var temp2=[];
      var temp = [];
      var obj = {
        assignment_name: req.body.assignment_name,
        assignment_question: assignment.assignment_question,
        assignment_solution: assignment.assignment_solution,
        assignment_compiled_solution: assignment.assignment_compiled_solution,
        assignment_test_code: assignment.assignment_test_code,
        class_name: req.body.class_name,
        due_date: req.body.due_date,
      };
      temp.push(obj);
      temp1.push(obj);
        Students.find({ class_code: req.body.class_code }).then((students) => {
          students.forEach((student) => {
            obj2 = {
              student_username: student.username,
              student_first_name: student.first_name,
              student_surname: student.surname,
              assignment_name: req.body.assignment_name,
              assignment_student_solution: assignment.assignment_question,
              assignment_student_compiled_solution: "",
              assignment_teacher_question: assignment.assignment_question,
              assignment_teacher_solution: assignment.assignment_solution,
              assignment_teacher_compiled_solution: assignment.assignment_compiled_solution,
              assignment_test_code: assignment.assignment_test_code,
              assignment_due_date: req.body.due_date,
              assignment_score: "0/100",
              assignment_status: "not submitted",
            };
            temp.push(obj2);
            temp2.push(obj2);
          })
          ClassroomAssignments.create(temp1, function(error) {
              StudentAssignments.create(temp2, function(error) {
                res.json(temp);
              });
          });
          
      });
    });
  });
}

getClassroomAssignments = async (req, res) => {
  await ClassroomAssignments.find({ class_name: req.params.class_name }, (err, assignments) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }
    if (!assignments.length) {
      return res
        .status(404)
        .json({ success: false, error: `Assignments not found` })
    }
    return res.status(200).json({ success: true, data: assignments })
  }).catch(err => console.log(err))
};

getStudentAssignments = async (req, res) => {
  await StudentAssignments.find({ student_username: req.params.student_username }, (err, assignments) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }
    if (!assignments) {
      return res
        .status(404)
        .json({ success: false, error: `Assignments not found` })
    }
    return res.status(200).json({ success: true, data: assignments })
  }).catch(err => console.log(err))
};

getAssignments = async (req, res) => {
  await Assignment.find({ teacher_username: req.params.teacher_username }, (err, assignments) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }
    if (!assignments.length) {
      return res
        .status(404)
        .json({ success: false, error: `Assignments not found` })
    }
    return res.status(200).json({ success: true, data: assignments })
  }).catch(err => console.log(err))
};

getAssignment = async (req, res) => {
  await Assignment.findOne({ assignment_name: req.params.assignment_name }, (err, assignment) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }
    if (!assignment) {
      return res
        .status(404)
        .json({ success: false, error: `Assignment not found` })
    }
    return res.status(200).json({ success: true, data: assignment })
  }).catch(err => console.log(err))
};

getStudentAssignment = async (req, res) => {
  await StudentAssignments.findOne({ assignment_name: req.params.assignment_name }, (err, assignment) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }
    if (!assignment) {
      return res
        .status(404)
        .json({ success: false, error: `Assignment not found` })
    }
    return res.status(200).json({ success: true, data: assignment })
  }).catch(err => console.log(err))
};

module.exports = {
  newAssignment,
  setAssignment,
  submitAssignment,
  getClassroomAssignments,
  getStudentAssignments,
  getAssignments,
  getAssignment,
  getStudentAssignment
}