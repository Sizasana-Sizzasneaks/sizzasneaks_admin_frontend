import axios from "axios";
import * as API_CONSTANTS from "./index.js";

import { getCurrentUserIdToken } from "../services/authentication.js";

export const getReviewsByProductId = async (id) => {
  var getCurrentUserIdTokenResult = await getCurrentUserIdToken();

  if (getCurrentUserIdTokenResult.ok === true) {
    const config = {
      headers: {
        credentialclaims: "administrator",
        Authorization: "Bearer " + getCurrentUserIdTokenResult.data,
      },
    };

    return axios
      .get(API_CONSTANTS.REVIEWS_ROUTE + "/" + id, config)
      .then((res) => {
        //Request Succesfull
        //Handle Different HTTP Status Codes and Responses
        if (res.status === 200) {
          return res.data;
        } else {
          return res.data;
        }
      })
      .catch((error) => {
        //Request Unsuccesfull
        return { ok: false, error: error };
      });
  } else {
    return getCurrentUserIdTokenResult;
  }
};


export const deleteReviewByReviewId = async (id) => {
  var getCurrentUserIdTokenResult = await getCurrentUserIdToken();

  if (getCurrentUserIdTokenResult.ok === true) {
    const config = {
      headers: {
        credentialclaims: "administrator",
        Authorization: "Bearer " + getCurrentUserIdTokenResult.data,
      },
    };
    return axios
      .delete(API_CONSTANTS.REVIEWS_ROUTE + "/" + id, config)
      .then((res) => {
        //Request Succesfull
        //Handle Different HTTP Status Codes and Responses
        if (res.status === 200) {
          console.log(res.data);
          return res.data;
        } else {
          return res.data;
        }
      })
      .catch((error) => {
        //Request Unsuccesfull
        return { ok: false, error: error };
      });
  } else {
    //Failed to get Token
    return getCurrentUserIdTokenResult;
  }
};
