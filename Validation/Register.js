const Validator = require("validator");
const isEmpty = require("is-empty");

//form validation logic
module.exports = function validateRegisterInput(data) {
  let errors = {};

  //convert empty fields to an empty string so we can use validator functions
  data.userName = !isEmpty(data.userName) ? data.userName : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  //name checks
  if (Validator.isEmpty(data.userName)) {
    errors.name = "Name field is required";
  }
  if((data.userName).length >= 10){
    errors.name = "userName must be less than or equal to 10 characters"
  }

  //email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "'Email is invalid";
  }

  //Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password feild is required";
  }else if(!Validator.isLength(data.password, { min: 6, max: 30 })){
    errors.password =
      "Password must be at least 6 characters and at most 30 characters";
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password feild is required";
  }else if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords do not match";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};