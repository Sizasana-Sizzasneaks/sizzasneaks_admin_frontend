import axios from "axios";
import { getCurrentUserIdToken } from "../services/authentication.js";
import * as API_CONSTANTS from "./index.js";
 
// user token check
export const getUserDetails = async () => {
    var getTokenResult = await getCurrentUserIdToken();
  
    if (getTokenResult.ok === true) {
      const config = {
        headers: { Authorization: "Bearer " + getTokenResult.data },
      };
      return axios
        .get(API_CONSTANTS.USER_ROUTE, config)
        .then((res) => {
          // Request Succesfull
          //Handle Different HTTP Status Codes and Responses
          console.log("token recieved");
          return { ok: true, data: res.data };
        })
        .catch((error) => {
          //Request Unsuccesfull
          return { ok: false, error: error };
        });
    } else {
      //Failed to get Token
      return getTokenResult;
    }
  };
  