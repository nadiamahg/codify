const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TeacherSchema = new Schema({
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
module.exports = Teacher = mongoose.model("teachers", TeacherSchema);