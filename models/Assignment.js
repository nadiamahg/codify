const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const AssignmentSchema = new Schema({
  assignment_name: {
    type: String,
    required: true
  },
  assignment_question: {
    type: String,
    required: true
  },
  assignment_solution: {
    type: String,
    required: true
  },
  assignment_test_code: {
    type: String,
  },
  assignment_compiled_solution: {
    type: String,
    required: true
  },
  teacher_username: {
    type: String
  },

});
module.exports = Assignment = mongoose.model("assignments", AssignmentSchema);