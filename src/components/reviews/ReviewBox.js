import React from "react";
import { Row, Col } from "react-bootstrap";
import Styles from "./ReviewBox.module.css";
import ViewReview from "../reviews/ViewReview.js";
import {
  getReviewsByProductId,
  deleteReviewByReviewId,
} from "../../api/review.js";
import { LinearProgress } from "@material-ui/core";

function ReviewBox(props) {
  var [reviews, setReviews] = React.useState(null);
  var [reviewsError, setReviewsError] = React.useState(null);

  var [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (typeof props.product_id !== "undefined") {
      getProductReviews(props.product_id);
    }
  }, []);

  async function getProductReviews(product_id) {
    if (typeof product_id !== "undefined") {
      setLoading(true);
      setReviews(null);
      setReviewsError(null);
      var getReviewsResult = await getReviewsByProductId(product_id);
      if (getReviewsResult.ok === true) {
        //Reviews are at .data.reviews - its an Array
        //rating average is at .data.ratingAverage - its an Integer
        //reviewCount is at .data.reviewCount - its an Integer
        setLoading(false);
        setReviews(getReviewsResult.data);
        console.log(getReviewsResult.data);
      } else {
        setLoading(false);
        setReviews(getReviewsResult.data);
        setReviewsError(getReviewsResult);
        console.log(getReviewsResult);
      }
    } else {
      console.log("Product Id is Undefined");
    }
  }

  async function deleteProductReview(review_id) {
    if (typeof review_id !== "undefined") {
      var deleteReviewResult = await deleteReviewByReviewId(review_id);

      if (deleteReviewResult.ok === true) {
        //Delete Of review Successful
        //Notify User by Displaying message on screen
        //Then refresh product Reviews
        console.log("Delete was Successful");
        console.log(deleteReviewResult);
        return deleteReviewResult;
      } else {
        //Delete Of review Not Successful
        //Notify User by Displaying message on screen
        //Dont bother refreshing product Reviews
        console.log("Delete was Not Successful");
        console.log(deleteReviewResult);
        return deleteReviewResult;
      }
    } else {
      console.log("Review ID is Undefined");
    }
  }

  return (
    <>
      <div className={Styles.reviewBox}>
        <Row>
          <Col className={Styles.reviewCount}>
            <p>
              Reviews (
              {reviews && (reviews.reviewCount ? reviews.reviewCount : "0")})
            </p>
          </Col>
        </Row>

        <Row>
          {reviews && reviews.reviewCount && (
            <Col className={Styles.averageRating}>
              <span
                style={{ fontSize: "25px", alignItems: "baseline" }}
                class="material-icons"
              >
                star_outline
              </span>

              <p style={{ marginRight: "0px", fontSize: "25px" }}>
                {reviews &&
                  (reviews.ratingAverage ? reviews.ratingAverage : "0")}
              </p>
              <p>/5</p>
              <p style={{ color: "black" }}>Average Rating</p>
            </Col>
          )}
        </Row>

        <Row>
          <Col className={Styles.divider}></Col>
        </Row>

        {reviews && (
          <div>
            {" "}
            {reviews.reviews ? (
              reviews.reviews.map((review) => {
                return (
                  <ViewReview
                    fullName={review.customerFullName}
                    rating={review.rating}
                    body={review.body}
                    createdAt={review.createdAt}
                    user={review.customer_id}
                    id={review._id}
                    deleteReview={async (review_id) => {
                      var deleteProductReviewResult = await deleteProductReview(
                        review_id
                      );

                      return deleteProductReviewResult;
                    }}
                    callGetReviews={() => {
                      if (typeof props.product_id !== "undefined") {
                        getProductReviews(props.product_id);
                      }
                    }}
                  />
                );
              })
            ) : (
              <div></div>
            )}
          </div>
        )}

        {loading && <LinearProgress style={{ marginTop: "20px" }} />}

        {reviewsError && (
          <p style={{ color: "red", fontSize: "18px", marginTop: "15px" }}>
            {reviewsError.message}
          </p>
        )}
      </div>
    </>
  );
}

export default ReviewBox;
