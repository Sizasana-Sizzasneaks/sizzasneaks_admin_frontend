import axios from "axios";
import { getCurrentUserIdToken } from "../services/authentication.js";
import * as API_CONSTANTS from "./index.js";

export const getUserDetails = async () => {
  //Getting the User Id Token of the current signed in User.
  var getTokenResult = await getCurrentUserIdToken();

  //Checking if retrieving of the current user id token was successful.
  if (getTokenResult.ok === true) {
    //Attaching credentialClaims and the current user's Id token (authentication) to the header of the request object.
    const config = {
      headers: { Authorization: "Bearer " + getTokenResult.data },
    };

    return axios
      .get(API_CONSTANTS.USER_ROUTE, config)
      .then((res) => {
        // Request Successful
        return { ok: true, data: res.data }; //Returning the response data received.
      })
      .catch((error) => {
        //Checking if the error is of type "Network Error"
        if (error.message === "Network Error") {
          //Checking if the error is of type "Network Error"
          return {
            //Returning a appropriate response if the error is of type network error.
            ok: false,
            message: "Network Error - Please Check your Internet Connection",
          };
        }
        //Returning a general error response when there is an error with sending the http request.
        return { ok: false, message: "Error Retrieving Reviews" };
      });
  } else {
    //Returning an appropriate response when retrieving the current signed user's ID token fails.
    return getTokenResult;
  }
};
