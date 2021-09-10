import React from "react";
import Styles from "./ReviewReply.module.css";
import { convertDateToString } from "../../services/dateManipulationFunctions.js";

function ReviewReply(props) {
  return (
    <div className={Styles.ReviewReplyBox} style={{ ...props.styles }}>
      <p  className={Styles.Body}>{props.body}</p>
      <p className={Styles.Time}>
        {props.time && convertDateToString(props.time)}
      </p>
    </div>
  );
}

export default ReviewReply;
