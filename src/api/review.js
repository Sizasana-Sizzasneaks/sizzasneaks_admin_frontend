import axios from "axios";
import * as API_CONSTANTS from "./index.js";

import { getCurrentUserIdToken } from "../services/authentication.js";

export const getReviewsByProductId = async (id) => {
  //Getting the User Id Token of the current signed in User.
  var getCurrentUserIdTokenResult = await getCurrentUserIdToken();

  //Checking if retrieving of the current user id token was successful.
  if (getCurrentUserIdTokenResult.ok === true) {
    //Attaching credentialClaims and the current user's Id token (authentication) to the header of the request object.
    const config = {
      headers: {
        credentialClaims: "administrator",
        Authorization: "Bearer " + getCurrentUserIdTokenResult.data,
      },
    };
    //Performing the HTTP Request via the axios api.
    return axios
      .get(API_CONSTANTS.REVIEWS_ROUTE + "/" + id, config) //Supplying the product id to get the matching product reviews.
      .then((res) => {
        //Request Successful
        return res.data; //Returning the response data received.
      })
      .catch((error) => {
        //Request Unsuccessful
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
    return getCurrentUserIdTokenResult;
  }
};

export const deleteReviewByReviewId = async (id) => {
  //Getting the User Id Token of the current signed in User.
  var getCurrentUserIdTokenResult = await getCurrentUserIdToken();

  //Checking if retrieving of the current user id token was successful.
  if (getCurrentUserIdTokenResult.ok === true) {
    //Attaching credentialClaims and the current user's Id token (authentication) to the header of the request object.
    const config = {
      headers: {
        credentialClaims: "administrator",
        Authorization: "Bearer " + getCurrentUserIdTokenResult.data,
      },
    };
    return axios
      .delete(API_CONSTANTS.REVIEWS_ROUTE + "/" + id, config) //Supplying the Review Id as a route parameter.
      .then((res) => {
        return res.data; //Returning the response data received.
      })
      .catch((error) => {
        //Checking if the error is of type "Network Error"
        if (error.message === "Network Error") {
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
    return getCurrentUserIdTokenResult;
  }
};

export const sendReviewReply = async (review_id, reviewReply) => {
  //Getting the User Id Token of the current signed in User.
  var getCurrentUserIdTokenResult = await getCurrentUserIdToken();

  //Checking if retrieving of the current user id token was successful.
  if (getCurrentUserIdTokenResult.ok === true) {
    //Attaching credentialClaims and the current user's Id token (authentication) to the header of the request object.
    const config = {
      headers: {
        credentialClaims: "administrator",
        Authorization: "Bearer " + getCurrentUserIdTokenResult.data,
      },
    };
    return axios
      .post(
        API_CONSTANTS.REVIEWS_ROUTE + "/reply/" + review_id,
        { reviewReply: reviewReply },
        config
      ) //Supplying the Review Id as a route parameter.
      .then((res) => {
        return res.data; //Returning the response data received.
      })
      .catch((error) => {
        //Checking if the error is of type "Network Error"
        if (error.message === "Network Error") {
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
    return getCurrentUserIdTokenResult;
  }
};
