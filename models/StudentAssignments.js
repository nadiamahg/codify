const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const StudentAssignmentSchema = new Schema({
  student_username: {
    type: String
  },
  student_first_name: {
    type: String
  },
  student_surname: {
    type: String
  },
  assignment_name: {
    type: String,
  },
  assignment_student_solution: {
    type: String,
  },
  assignment_student_compiled_solution: {
    type: String,
  },
  assignment_score: {
    type: String,
  },
  assignment_teacher_question: {
    type: String,
  },
  assignment_teacher_compiled_solution: {
    type: String,
  },
  assignment_due_date: {
    type: String,
  },
  assignment_status: {
    type: String,
  },
});
module.exports = Assignment = mongoose.model("student_assignments", StudentAssignmentSchema);