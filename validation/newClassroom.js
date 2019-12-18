const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function classValidateNewClassInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.class_name = !isEmpty(data.class_name) ? data.class_name : "";
  
// Name checks
  if (Validator.isEmpty(data.class_name)) {
    errors.class_name = "Class name field is required";
  }
return {
    errors,
    isValid: isEmpty(errors)
  };
};