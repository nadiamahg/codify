const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function teacherValidateRegisterInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.first_name = !isEmpty(data.first_name) ? data.first_name : "";
  data.surname = !isEmpty(data.surname) ? data.surname : "";
  data.username = !isEmpty(data.username) ? data.username : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
// Name checks
  if (Validator.isEmpty(data.first_name)) {
    errors.first_name = "First name field is required";
  }
  if (Validator.isEmpty(data.surname)) {
    errors.surname = "Surname field is required";
  }
// Username checks
  if (Validator.isEmpty(data.username)) {
    errors.username = "Username field is required";
  } else if (!Validator.isLength(data.username, { min: 4, max: 30 })) {
    errors.username = "Username must be at least 4 characters";
  }
// Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }
if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }
if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }
return {
    errors,
    isValid: isEmpty(errors)
  };
};