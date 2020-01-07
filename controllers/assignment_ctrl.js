const Assignment = require('../models/Assignment');
const assignmentValidateNewAssignmentInput = require("../validation/newAssignment");
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
        assignment_due_date: req.body.assignment_due_date,
        teacher_username: req.body.teacher_username,
      });
      newAssignment
        .save()
        .then(assignment => res.json(assignment))
        .catch(assignment => console.log(assignment));
    }
  });
};

module.exports = {
  newAssignment
}