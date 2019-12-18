const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const StudentSchema = new Schema({
  class_code: {
    type: String,
    required: true
  },
  first_name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});
module.exports = Student = mongoose.model("students", StudentSchema);