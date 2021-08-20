This folder "src\services" contains all the logical code for the services provided to the SIZZASNEAKS application by external platforms such as Yup validation and firebase authentication.

User authentication occurs via firebase and user validation occurs through Yup. For example, a password schema object is made so that the password field is validated and is made a required field, one that cannot be left empty.

The following is a breakdown of all the this folders contents:-
----------------------------------------------------------------------------------------------------------
src\services\authentication.js

This file contains functions associated with authentication of a user, this may include Login, Sign Up
functionality and the retrieval of user tokens, 

----------------------------------------------------------------------------------------------------------
src\services\dateManipulationFunctions.js

This file contains the functions used to manipulation the date object to track when a user interacts with the application.

The functions in the file are:

a) convertDateToString 
 A date is instance is created and converted to a string format.

b) getCurrentDateAsString
  A date instance is created to be used in retrieving the full current date.
----------------------------------------------------------------------------------------------------------
src\services\InputValidation.js

This file contains the code that deals with input validation. Input from users is always checked against a corresponding 
set of validation rules. THis help ensure that all data entered by users is in a valid format
