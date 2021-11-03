import React from "react";
import Styles from "./WriteReview.module.css";
import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

import Button from "../general/Button.js";

import { validateBasicString } from "../../services/InputValidation.js";
import { getCurrentDateAsString } from "../../services/dateManipulationFunctions.js";
import { sendReviewReply } from "../../api/review.js";
import { CircularProgress } from "@material-ui/core";
//Function used for Writing a review
function WriteReview(props) {
  // var [rating, setRating] = React.useState(0); // initail state of Rating set to 0
  var [body, setBody] = React.useState(""); // initail state of body set to nothing

  // var [ratingValid, setRatingValid] = React.useState(null); //Used to check if the rating is valid
  var [bodyValid, setBodyValid] = React.useState(null); //Used to check if the body is valid

  var [formValid, setFormValid] = React.useState(false); //Used to check if the Form is valid

  var [loading, setloading] = React.useState(false);
  var [writeReviewState, setWriteReviewState] = React.useState(null);

  React.useEffect(() => {
    checkFormValidity();
  }, [bodyValid]); //Refreshes the screen

  var currentDate = getCurrentDateAsString();
  //Function to check Input Validation for rating and Body
  async function checkInputValidity() {
    var validateRatingBodyResult = await validateBasicString(body);
    await setBodyValid(validateRatingBodyResult);
    await checkFormValidity();
  }
  //function to check validation for Form e.g. Both Rating and body is required to publish a review
  async function checkFormValidity() {
    if (bodyValid) {
      if (bodyValid.ok === true) {
        setFormValid(true);
      } else {
        setFormValid(false);
      }
    }
  }
  //Clears the feilds once the review is publised or deleted
  function clearFields() {
    setBody("");
    setBodyValid(null);
    setWriteReviewState(null);
    setFormValid(false);
    if (typeof props.hideShowWriteReplyBox !== "undefined") {
      props.hideShowWriteReplyBox();
    }
  }
  //visual aspect of how the Write Review fucntion will show
  // Visual functionalities of a review will be published
  return (
    <Row className={Styles.WriteReview}>
      <Col>
        <Row>
          <Col className={Styles.WriteReviewHeader}>
            {loading ? (
              <CircularProgress style={{ marginRight: "10px" }} size={22} />
            ) : (
              ""
            )}
            {writeReviewState && (
              <>
                {writeReviewState.ok === true ? (
                  <p style={{ color: "green" }}>{writeReviewState.message}</p>
                ) : (
                  <p style={{ color: "red" }}>{writeReviewState.message}</p>
                )}
              </>
            )}
            <p style={{ marginLeft: "auto", marginRight: "0px" }}>
              {currentDate}
            </p>
          </Col>
        </Row>
        <Row>
          <Col className={Styles.WriteReviewBody}>
            <div className={Styles.TextAreaWrapper}>
              <textarea
                className={Styles.TextArea}
                rows="3"
                placeholder="Write a reply..."
                value={body}
                onChange={async (event) => {
                  await setBody(event.target.value);
                  var validateRatingBodyResult = await validateBasicString(
                    event.target.value
                  );
                  setBodyValid(validateRatingBodyResult);
                }}
              ></textarea>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className={Styles.ErrorMessage}>
            <p> {bodyValid && (!bodyValid.valid ? bodyValid.message : "")}</p>
          </Col>
        </Row>
        <Row>
          <Col className={Styles.WriteReviewPublishSection}>
            <Button
              disabled={!formValid}
              onClick={async () => {
                await checkInputValidity(); //Awaits checkInputValidity before publishing a review

                if (formValid === true) {
                  setloading(true);
                  setWriteReviewState(null)
                  var sendReviewReplyResult = await sendReviewReply(
                    props.review_id,
                    body
                  );

                  setloading(false);

                  if (sendReviewReplyResult.ok === true) {
                    setWriteReviewState({
                      ...sendReviewReplyResult,
                      message: "Review Reply Sent",
                    });
                    console.log(sendReviewReplyResult);
                    setTimeout(() => {
                      clearFields(); //clear fields after a review is published
                      if (typeof props.refetchReview !== "undefined") {
                        props.refetchReview();
                      }
                    }, 1000);
                  } else {
                    setWriteReviewState({
                      ...sendReviewReplyResult,
                    });
                  }
                }
              }}
              label="Send"
              styles={{ float: "right", backgroundColor: "#FADA35" }}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default WriteReview;
