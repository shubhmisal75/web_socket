const validator = require("email-validator");

const isValid = function (value) {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
};

const isValidSyntaxOfEmail = function (value) {
  if (!validator.validate(value.trim())) {
    return false;
  }
  return true;
};

const isValidSyntaxOFPassword = (value) => {
  if (!/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(value)) {
    return false;
  }
  return true;
};
const isValidNumber = function isInteger(value) {
  if (value == undefined || isNaN(value)) return false;
  return true;
};
//----------------------------------------------//

module.exports = {
  isValid,
  isValidSyntaxOfEmail,
  isValidSyntaxOFPassword,
  isValidNumber,
};
