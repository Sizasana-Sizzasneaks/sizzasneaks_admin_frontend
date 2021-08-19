import * as Yup from "yup";

//Validation starts here
//create email schema for email validation
const emailSchema = Yup.object().shape({
  email: Yup.string("Enter String")
    .email("Invalid email address")
    //make validation a requirement
    .required("Required")
});

export const validateEmail = (email) => {
  return emailSchema
  //validate email entered by user
    .validate({ email: email })
    //if email entered is correct, the user may continue through to the app
    .then(() => {
      console.log("email validated");
      return { valid: true, message: "" };
    })
      //if there is a validation error, it is caught and handled
    .catch((error) => {
      return { valid: false, message: error.errors[0] };
    });
};

//create passsword schema object for password validation
const passwordSchema = Yup.object().shape({
  //password should be in string format
  password: Yup.string("Enter String").required("Required"),
});

export const validatePassword = (password) => {
  return passwordSchema
  //password is validated
    .validate({ password: password })
    //if there is no error in validation, user proceeds, however if there is the error is caught and handled
    .then(() => {
      return { valid: true, message: "" };
    })
    .catch((error) => {
      return { valid: false, message: error.errors[0] };
    });
};