import axios from "axios";
import * as API_CONSTANTS from "./index.js";

import { isLoaded, isEmpty } from "react-redux-firebase";
import { getCurrentUserIdToken } from "../services/authentication.js";
import store from "../redux/index.js";

export const getTopProducts = async () => {
  //Checks whether data from the redux store has been loaded
  if (isLoaded(store.getState().firebase.auth)) {
    // Checks whether the item loaded is not empty
    if (!isEmpty(store.getState().firebase.auth)) {
      var getTokenResult = await getCurrentUserIdToken();

      // checks whether the current user's token was retrieved successfully
      if (getTokenResult.ok === true) {
        const config = {
          // sets the necessary header information for authentication based on the user's token
          headers: {
            credentialClaims: "administrator",
            Authorization: "Bearer " + getTokenResult.data,
          },
        };

        //returns the cart object from the user
        return axios
          .get(API_CONSTANTS.REVENUE_ROUTE + "/top_products", config)
          .then((res) => {
            // Request Successful
            //Handle Different HTTP Status Codes and Responses
            return res.data;
          }) // returns the corresponding data for a signed in user's cart
          .catch((error) => {
            // returns general error when trying to getting cart is unsuccessful
            return { ok: false, error: error };
          });
      } else {
        //returns a general error when the system has failed to get the user's token
        return getTokenResult;
      }
    } else {
      //returns a message if the current user is not signed into the platform
      return { ok: false, message: "No User Signed In" };
    }
  } else {
    //returns a message when data has not been loaded from the redux store.
    return { ok: false, message: "Getting Top Products Failed - Try again" };
  }
};