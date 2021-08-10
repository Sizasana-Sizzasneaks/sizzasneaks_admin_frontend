import axios from "axios";
import * as API_CONSTANTS from "./index.js";

import { getCurrentUserIdToken } from "../services/authentication.js";

export const getProducts = async (queryObject) => {
  var getCurrentUserIdTokenResult = await getCurrentUserIdToken();

  if (getCurrentUserIdTokenResult.ok === true) {
    const config = {
      headers: {
        credentialclaims: "administrator",
        Authorization: "Bearer " + getCurrentUserIdTokenResult.data,
      },
      params: queryObject,
    };

    return axios
      .get(API_CONSTANTS.PRODUCTS_ROUTE, config)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.log(error.message);

        if (error.message === "Network Error") {
          return {
            ok: false,
            message: "Network Error - Please Check your Internet Connection",
          };
        }
        return { ok: false, message: "Error getting products" };
      });
  } else {
    return getCurrentUserIdTokenResult;
  }
};

export const getProduct = async (id) => {
  var getCurrentUserIdTokenResult = await getCurrentUserIdToken();

  if (getCurrentUserIdTokenResult.ok === true) {
    const config = {
      headers: {
        credentialclaims: "administrator",
        Authorization: "Bearer " + getCurrentUserIdTokenResult.data,
      },
    };

    return axios
      .get(API_CONSTANTS.PRODUCTS_ROUTE + "/" + id, config)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.log(error.message);

        if (error.message === "Network Error") {
          return {
            ok: false,
            message: "Network Error - Please Check your Internet Connection",
          };
        }
        return { ok: false, message: "Error getting products" };
      });
  } else {
    return getCurrentUserIdTokenResult;
  }
};
