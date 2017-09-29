const emailValidator = require('email-validator');
const ValidatePassword = require('validate-password');
const validator = new ValidatePassword({
  enforce: {
    lowercase: true,
    uppercase: true,
    specialCharacters: true,
    numbers: true
  }
});

export class User {
  id: string;
  email: string;
  password: string;
  username: string;
  verified: boolean = false;
  active: boolean = false;
  role: string = null;
  createdAt: Date = null;
  createdBy: string = null;
  modifiedAt: Date = null;
  modifiedBy: string = null;
  owner: string = null;

  isValidEmail() {
    return emailValidator.validate(this.email);
  }
  isValidPassword() {
    var passwordData = validator.checkPassword(this.password);
    return passwordData.isValid;
  }
}