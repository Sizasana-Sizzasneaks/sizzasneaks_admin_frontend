import React from "react";
import { Row, Col } from "react-bootstrap";
import Styles from "./ReviewBox.module.css";
import ViewReview from "../reviews/ViewReview.js";

function ReviewBox(props) {
  return (
    <div className={Styles.reviewBox}>
      <Row>
        <Col className={Styles.reviewCount}>
          <p>Reviews ({props.reviews && props.reviews.reviewCount})</p>
        </Col>
      </Row>

      <Row>
        <Col className={Styles.averageRating}>
          <span
            style={{ fontSize: "25px", alignItems: "baseline" }}
            class="material-icons"
          >
            star_outline
          </span>
          <p style={{ marginRight: "0px", fontSize: "25px" }}>
            {props.reviews.ratingAverage}
          </p>
          <p>/5</p>
          <p style={{ color: "black" }}>Average Rating</p>
        </Col>
      </Row>

      <Row>
        <Col className={Styles.divider}></Col>
      </Row>
      {props.reviews &&
        props.reviews.reviews.map((review) => {
          return (
            <ViewReview
              fullName={review.customerFullName}
              rating={review.rating}
              body={review.body}
              createdAt={review.createdAt}
              user={review.customer_id}
              id={review._id}
              // deleteReview={deleteReview}
              // callGetReviews={getReviews}
            />
          );
        })}

      {props.getReviewError && (
        <p style={{ color: "red", fontSize: "20px", marginTop: "15px" }}>
          {props.getReviewError.message}
        </p>
      )}
    </div>
    // <Row className={Styles.ProductReviewsCard}>

    // {props.reviews && props.reviews.map((review)=>{
    //     return  <ViewReview
    //       fullName={review.customerFullName}
    //       rating={review.rating}
    //       body={review.body}
    //       createdAt={review.createdAt}
    //       user={review.customer_id}
    //       id={review._id}
    //     //   deleteReview={deleteReview}
    //     //   callGetReviews={getReviews}
    //     />
    // })}

    // </Row>
  );
}

export default ReviewBox;
