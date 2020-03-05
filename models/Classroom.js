const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ClassroomSchema = new Schema({
  class_code: {
    type: String,
  },
  class_name: {
    type: String,
    required: true
  }, 
  teacher_username: {
    type: String
  }

});
module.exports = Classroom = mongoose.model("classrooms", ClassroomSchema);