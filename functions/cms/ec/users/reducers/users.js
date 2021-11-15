const { searchEmail } = require("../../../common/requests");
//Validator
const isEmpty = (string) => {
  return string.trim() === "";
};

const isEmail = (email) => {
  const emailRegEx =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return email.match(emailRegEx);
};

exports.emailVerification = async (email) => {
  const check = await searchEmail(email);
  if (check.status === 200) {
    return false;
  } else {
    return true;
  }
};

exports.validateUserData = (data) => {
  let errors = {};

  if (isEmpty(data.name)) errors.name = "Must not be empty";
  if (isEmpty(data.lastname)) errors.lastname = "Must not be empty";

  if (isEmpty(data.email)) {
    errors.email = "Must not be empty";
  } else if (!isEmail(data.email)) {
    errors.email = "Must be a valid email address";
  }

  if (isEmpty(data.password)) {
    errors.password = "Must not be empty";
  }
  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Passwords must match";
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

exports.reduceUserData = (data) => {
  let userDetails = {};
  let errors = {};

  if (isEmpty(data.name)) errors.name = "Must not be empty";
  if (isEmpty(data.lastname)) errors.lastname = "Must not be empty";

  userDetails.email = data.email.toLowerCase();
  if (Object.keys(data).includes("password")) {
    userDetails.password = data.password;
  }

  if (!isEmpty(data.name.trim())) {
    userDetails.name = data.name;
  }
  if (!isEmpty(data.lastname.trim())) {
    userDetails.lastname = data.lastname;
  }
  if (Object.keys(data).includes("EXAMPLE")) {
    if (!isEmpty(data.EXAMPLE.trim())) {
      userDetails.EXAMPLE = data.EXAMPLE;
    }
  }
  if (Object.keys(data).includes("NUMBER")) {
    if (!isNaN(data.NUMBER)) {
      userDetails.NUMBER = data.NUMBER;
    }
  }

  return errors, userDetails;
};
