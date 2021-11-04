import axios from "axios";
import * as API_CONSTANTS from "./index.js";

import { getCurrentUserIdToken } from "../services/authentication.js";

export const updateProduct = async (productId, productData) => {
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
      .put(
        API_CONSTANTS.PRODUCTS_ROUTE + "/" + productId, //Supplying the corresponding route.
        { productData: productData }, // Providing the productData within the body of the request object.
        config //Adding all request configuration data, such as authentication headers.
      )
      .then((res) => {
        return res.data; //Returning the response data received.
      })
      .catch((error) => {
        if (error.message === "Network Error") {
          //Checking if the error is of type "Network Error"
          return {
            //Returning a appropriate response if the error is of type network error.
            ok: false,
            message: "Network Error - Please Check your Internet Connection",
          };
        }
        //Returning a general error response when there is an error with sending the http request.
        return { ok: false, message: "Error updating product." };
      });
  } else {
    //Returning an appropriate response when retrieving the current signed user's ID token fails.
    return getCurrentUserIdTokenResult;
  }
};

export const getProducts = async (queryObject) => {
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
      //The query object s supplied as query parameters
      params: queryObject,
    };

    return axios
      .get(API_CONSTANTS.PRODUCTS_ROUTE, config)
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
        return { ok: false, message: "Error getting products." };
      });
  } else {
    //Returning an appropriate response when retrieving the current signed user's ID token fails.
    return getCurrentUserIdTokenResult;
  }
};

export const getProduct = async (id) => {
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
      .get(API_CONSTANTS.PRODUCTS_ROUTE + "/" + id, config) //Supplying the product id as a route parameter.
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
        return { ok: false, message: "Error getting product." };
      });
  } else {
    //Returning an appropriate response when retrieving the current signed user's ID token fails.
    return getCurrentUserIdTokenResult;
  }
};

export const createProduct = async (productData) => {
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
      .post(API_CONSTANTS.PRODUCTS_ROUTE, { product: productData }, config) //Supplying the productData via the request body.
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
        return { ok: false, message: "Error creating new product." };
      });
  } else {
    //Returning an appropriate response when retrieving the current signed user's ID token fails.
    return getCurrentUserIdTokenResult;
  }
};
