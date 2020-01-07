const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function assignmentValidateNewAssignmentInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.assignment_name = !isEmpty(data.assignment_name) ? data.assignment_name : "";
  data.assignment_question = !isEmpty(data.assignment_question) ? data.assignment_question : "";
  data.assignment_solution = !isEmpty(data.assignment_solution) ? data.assignment_solution : "";
  data.assignment_compiled_solution = !isEmpty(data.assignment_compiled_solution) ? data.assignment_compiled_solution : "";
  data.assignment_due_date = !isEmpty(data.assignment_due_date) ? data.assignment_due_date : "";

// Name checks
  if (Validator.isEmpty(data.assignment_name)) {
    errors.assignment_name = "Assignment name field is required";
  }
  if (Validator.isEmpty(data.assignment_question)) {
    errors.assignment_question = "Assignment question field is required";
  }
  if (Validator.isEmpty(data.assignment_solution)) {
    errors.assignment_solution = "Assignment solution field is required";
  }
  if (Validator.isEmpty(data.assignment_compiled_solution)) {
    errors.assignment_compiled_solution = "Assignment compiled solution field is required";
  }
  if (Validator.isEmpty(data.assignment_due_date)) {
    errors.assignment_due_date = "Assignment due date field is required";
  }
return {
    errors,
    isValid: isEmpty(errors)
  };
};