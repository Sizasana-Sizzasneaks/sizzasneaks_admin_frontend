import React from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../../api/products.js";
import {
  getReviewsByProductId,
  deleteReviewByReviewId,
} from "../../api/review.js";

function InventoryItemPage(props) {
  var { id } = useParams();
  var [product, setProduct] = React.useState(null);
  var [reviews, setReviews] = React.useState(null);

  React.useEffect(() => {
    getProductItem(id);
    getProductReviews(id);
  }, [id]);

  async function getProductItem(product_id) {
    if (typeof product_id !== "undefined") {
      var getProductResult = await getProduct(product_id);

      if (getProductResult.ok === true) {
        //Product Item is at index 0 of date
        console.log(getProductResult.data[0]);
      } else {
        console.log(getProductResult);
      }
    } else {
      console.log("Product Id is Undefined");
    }
  }

  async function getProductReviews(product_id) {
    if (typeof product_id !== "undefined") {
      var getReviewsResult = await getReviewsByProductId(product_id);
      if (getReviewsResult.ok === true) {
        //Reviews are at .data.reviews - its an Arrray
        //rating average is at .data.ratingAverage - its an Integer
        //reviewCount is at .data.reviewCount - its an Integer
        console.log(getReviewsResult.data);
      } else {
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
        //Delete Of review Succesfull
        //Notify User by Displaying message on screen
        //Then refresh product Reviews
        console.log("Delete was Succesfull");
        console.log(deleteReviewResult);
      } else {
        //Delete Of review Not Succesfull
        //Notify User by Displaying message on screen
        //Dont bother refreshing product Reviews
        console.log("Delete was Not Succesfull");
        console.log(deleteReviewResult);
      }
    } else {
      console.log("Review ID is Undefined");
    }
  }

  return (
    <div>
      <p>Inventory Item Page</p>
      {/* <p>{products && products}</p> */}
    </div>
  );
}

export default InventoryItemPage;
