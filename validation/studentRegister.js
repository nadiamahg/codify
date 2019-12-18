const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function studentValidateRegisterInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.first_name = !isEmpty(data.first_name) ? data.first_name : "";
  data.surname = !isEmpty(data.surname) ? data.surname : "";
  data.username = !isEmpty(data.username) ? data.username : "";
  data.class_code = !isEmpty(data.class_code) ? data.class_code : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
// Name checks
  if (Validator.isEmpty(data.first_name)) {
    errors.first_name = "First name field is required";
  }
  if (Validator.isEmpty(data.surname)) {
    errors.surname = "Surname field is required";
  }
  if (Validator.isEmpty(data.username)) {
    errors.username = "Username field is required";
  } else if (!Validator.isLength(data.username, { min: 4, max: 30 })) {
    errors.username = "Username must be at least 4 characters";
  }
// class_code checks
  if (Validator.isEmpty(data.class_code)) {
    errors.class_code = "Class code field is required";
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