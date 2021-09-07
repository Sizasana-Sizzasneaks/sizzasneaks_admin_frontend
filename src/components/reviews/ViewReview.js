import React from "react";
import { Row, Col } from "react-bootstrap";
import Styles from "./ViewReview.module.css";
import { CircularProgress } from "@material-ui/core";

import { useSelector } from "react-redux";

import Button from "../general/Button.js";
import Rating from "./Rating.js";

import { convertDateToString } from "../../services/dateManipulationFunctions.js";
import WriteReview from "./WriteReview";
import ReviewReply from "./ReviewReply";

function ViewReview(props) {
  const authState = useSelector((state) => state.firebase.auth);

  var [deletReviewState, setDeletReviewState] = React.useState(null);
  var [deleteLoad, setDeleteLoad] = React.useState(false);

  var [showWriteReply, setShowWriteReply] = React.useState(false);

  var [reviewCreatedAt, setReviewCreatedAt] = React.useState(
    props.createdAt || null
  );
  var [reviewFullName, setReviewFullName] = React.useState(
    props.fullName || null
  );
  var [rating, setRating] = React.useState(props.rating || 0);
  var [reviewBody, setReviewBody] = React.useState(props.body || null);
  var [reviewReplies, setReviewReplies] = React.useState(props.replies || null);

  async function reloadReview() {}

  return (
    <Row className={Styles.reviewViewCard}>
      <Col xs={12} style={{ padding: "0px" }}>
        <Row>
          <Col className={Styles.name}>
            <p>{reviewFullName && reviewFullName}</p>
            {deleteLoad ? (
              <CircularProgress style={{ marginLeft: "10px" }} size={22} />
            ) : (
              ""
            )}
            {deletReviewState && (
              <>
                {deletReviewState.ok === true ? (
                  <p style={{ color: "green", marginLeft: "10px" }}>
                    {deletReviewState.message}
                  </p>
                ) : (
                  <p style={{ color: "red", marginLeft: "10px" }}>
                    {deletReviewState.message}
                  </p>
                )}
              </>
            )}
            <p style={{ marginLeft: "auto", marginRight: "0px" }}>
              {reviewCreatedAt && convertDateToString(reviewCreatedAt)}
            </p>
          </Col>
        </Row>
        <Row>
          <Col className={Styles.rating}>
            <Rating value={rating && rating} />
          </Col>
        </Row>

        <Row>
          <Col className={Styles.body}>
            <p>{reviewBody && reviewBody}</p>
          </Col>
        </Row>

        <Row>
          <Col className={Styles.delete}>
            {" "}
            <Button
              onClick={async () => {
                if (
                  typeof props.id !== "undefined" &&
                  typeof props.deleteReview !== "undefined"
                ) {
                  setDeleteLoad(true);
                  var deleteReviewResult = await props.deleteReview(props.id);

                  setDeleteLoad(false);
                  if (deleteReviewResult.ok === true) {
                    setDeletReviewState(deleteReviewResult);

                    if (typeof props.callGetReviews !== "undefined") {
                      setTimeout(() => {
                        props.callGetReviews();
                      }, 2000);
                    }
                  } else {
                    setDeletReviewState(deleteReviewResult);
                  }
                }
              }}
              label="Delete"
              styles={{ float: "right", marginBottom: "20px" }}
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <p className={Styles.ReviewRepliesBanner}>Review Replies</p>
            <hr/>
            {reviewReplies && (reviewReplies.length !==  0 ? (reviewReplies.map((reply) => {
                return <ReviewReply body={reply.body} time={reply.createdAt} />;
              })) : (<p className={Styles.NoRepliesText}>No replies for this review</p>))
              }
          </Col>
        </Row>

        <Row>
          <Col>
            <Button
              label="Add Reply"
              styles={{
                backgroundColor: "#FADA35",
                width: "max-content",
                float: "right",
                marginTop: "20px",
              }}
              onClick={() => {
                setShowWriteReply(!showWriteReply);
              }}
            />
          </Col>
        </Row>

        {showWriteReply && (
          <Row>
            <Col>
              <WriteReview
                review_id={props.id}
                hideShowWriteReplyBox={() => {
                  setShowWriteReply(false);
                }}
                refetchReview={() => {
                  if (typeof props.callGetReviews !== "undefined") {
                    props.callGetReviews();
                  }
                }}
              />
            </Col>
          </Row>
        )}
      </Col>
    </Row>
  );
}

export default ViewReview;
