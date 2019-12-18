const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var randomString = function() {
  // Base 36 uses letters and digits to represent a number:
  return (Math.random()+1).toString(36).substring(2);
}

// Create Schema
const ClassroomSchema = new Schema({
  class_code: {
    type: String,
    default: randomString()
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