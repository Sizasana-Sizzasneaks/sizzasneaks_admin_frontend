import * as Yup from "yup";

//Validation starts here
//create email schema for email validation
const emailSchema = Yup.object().shape({
  email: Yup.string("Enter String")
    .email("Invalid email address")
    //make validation a requirement
    .required("Required"),
});

export const validateEmail = (email) => {
  return (
    emailSchema
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
      })
  );
};

//create passsword schema object for password validation
const passwordSchema = Yup.object().shape({
  //password should be in string format
  password: Yup.string("Enter String").required("Required"),
});

export const validateLogInPassword = (password) => {
  return (
    passwordSchema
      //password is validated
      .validate({ password: password })
      //if there is no error in validation, user proceeds, however if there is the error is caught and handled
      .then(() => {
        return { valid: true, message: "" };
      })
      .catch((error) => {
        return { valid: false, message: error.errors[0] };
      })
  );
};

// Basic String
const basicStringSchema = Yup.object().shape({
  text: Yup.string("Please enter a string")
    .required("Required")
    .max(50)
    .nullable(),
});

export const validateBasicString = (text) => {
  return basicStringSchema
    .validate({ text: text })
    .then(() => {
      return { ok: true, message: null };
    })
    .catch((error) => {
      return { ok: false, message: error.errors[0] };
    });
};

// Visibility Validation
const visibilitySchema = Yup.object().shape({
  visibility: Yup.bool()
    .oneOf([true, false], "Must be either true or false.")
    .typeError("Required"),
});

export const validateVisibility = (flag) => {
  return visibilitySchema
    .validate({ visibility: flag })
    .then(() => {
      return { ok: true, message: null };
    })
    .catch((error) => {
      return { ok: false, message: error.errors[0] };
    });
};

//Double (Amount) Validation

const fundsValueSchema = Yup.object().shape({
  value: Yup.number().required().typeError("Invalid Entry"),
});

export const validateFundsValue = (value) => {
  return fundsValueSchema
    .validate({ value: value })
    .then(() => {
      return { ok: true, message: null };
    })
    .catch((error) => {
      return { ok: false, message: error.errors[0] };
    });
};

//Categories Check

export const validateCategories = (categoriesInput) => {
  const categoriesSchema = Yup.object().shape({
    categories: Yup.object().test(
      "Great!",
      "Select at least one category",
      (categories) => {
        if (categories.men || categories.women || categories.kids) {
          return true;
        } else {
          return false;
        }
      }
    ),
  });

  return categoriesSchema
    .validate({ categories: categoriesInput })
    .then(() => {
      return { ok: true, message: null };
    })
    .catch((error) => {
      return { ok: false, message: error.errors[0] };
    });
};

// File Name String

const fileNameSchema = Yup.object().shape({
  text: Yup.string("Please enter a string")
    .matches(/^[A-Za-z0-9-]*$/, "Invalid File Name")
    .max(28)
    .required("Required")
    .nullable(),
});

export const validateFileName = (text) => {
  return fileNameSchema
    .validate({ text: text })
    .then(() => {
      return { ok: true, message: null };
    })
    .catch((error) => {
      return { ok: false, message: error.errors[0] };
    });
};

//Validate Color Name

const colorNameSchema = Yup.object().shape({
  text: Yup.string("Please enter a string")
    .required("Required")
    .matches(/^[aA-zZ]+$/, "Only alphabets are allowed for this field ")
    .max(50)
    .nullable(),
});

export const validateColorName = (text) => {
  return colorNameSchema
    .validate({ text: text })
    .then(() => {
      return { ok: true, message: null };
    })
    .catch((error) => {
      return { ok: false, message: error.errors[0] };
    });
};

//Number Validation - Used on Option Size & Quantity

const numberSchema = Yup.object().shape({
  value: Yup.number().required().typeError("Invalid Entry"),
});

export const validateNumber = (value) => {
  return numberSchema
    .validate({ value: value })
    .then(() => {
      return { ok: true, message: null };
    })
    .catch((error) => {
      return { ok: false, message: error.errors[0] };
    });
};

// Basic String
const productDescriptionSchema = Yup.object().shape({
  text: Yup.string("Please enter a string")
    .required("Required")
    .max(1000)
    .nullable(),
});

export const validateProductDescriptionString = (text) => {
  return productDescriptionSchema
    .validate({ text: text })
    .then(() => {
      return { ok: true, message: null };
    })
    .catch((error) => {
      return { ok: false, message: error.errors[0] };
    });
};
