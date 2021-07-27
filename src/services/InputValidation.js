import * as Yup from "yup";

//Validation start
const emailSchema = Yup.object().shape({
  email: Yup.string("Enter String")
    .email("Invalid email address")
    .required("Required")
});

export const validateEmail = (email) => {
  return emailSchema
    .validate({ email: email })
    .then(() => {
      console.log("email validated");
      return { valid: true, message: "" };
    })
    .catch((error) => {
      return { valid: false, message: error.errors[0] };
    });
};

const passwordSchema = Yup.object().shape({
  password: Yup.string("Enter String").required("Required"),
});

export const validatePassword = (password) => {
  return passwordSchema
    .validate({ password: password })
    .then(() => {
      return { valid: true, message: "" };
    })
    .catch((error) => {
      return { valid: false, message: error.errors[0] };
    });
};