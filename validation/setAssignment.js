const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function assignmentValidateSetAssignmentInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.assignment_name = !isEmpty(data.assignment_name) ? data.assignment_name : "";
  data.class_name = !isEmpty(data.class_name) ? data.class_name : "";
  data.due_date = !isEmpty(data.due_date) ? data.due_date : "";

// Name checks
  if (Validator.isEmpty(data.assignment_name)) {
    errors.assignment_name = "Assignment name field is required";
  }
  if (Validator.isEmpty(data.class_name)) {
    errors.class_name = "Class name field is required";
  }
  if (Validator.isEmpty(data.due_date)) {
    errors.due_date = "Due date field is required";
  }
return {
    errors,
    isValid: isEmpty(errors)
  };
};