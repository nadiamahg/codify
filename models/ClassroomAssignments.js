const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ClassroomAssignmentsSchema = new Schema({
  assignment_name: {
    type: String,
    required: true
  },
  class_name: {
    type: String,
    required: true
  },
  due_date: {
    type: Date,
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
  assignment_compiled_solution: {
    type: String,
    required: true
  },
  assignment_test_code: {
    type: String,
  },

});
module.exports = ClassroomAssignments = mongoose.model("classroom_assignments", ClassroomAssignmentsSchema);