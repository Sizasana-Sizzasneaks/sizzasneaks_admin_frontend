import React from "react";
import { Row} from "react-bootstrap";
import Styles from "./InventoryItemPage.module.css";
import { useParams } from "react-router-dom";
import { getProduct } from "../../api/products.js";
import {
  getReviewsByProductId,
  deleteReviewByReviewId,
} from "../../api/review.js";

import ProductDetailsCard from "../inventory/ProductDetailsCard";
import ReviewBox from "../reviews/ReviewBox.js";
import Button from "../general/Button.js";
import ProductOptionsCard from "../inventory/ProductOptionsCard";

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
        setProduct(getProductResult.data[0]);
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
        //Reviews are at .data.reviews - its an Array
        //rating average is at .data.ratingAverage - its an Integer
        //reviewCount is at .data.reviewCount - its an Integer
        setReviews(getReviewsResult.data);
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
        //Delete Of review Successful
        //Notify User by Displaying message on screen
        //Then refresh product Reviews
        console.log("Delete was Successful");
        console.log(deleteReviewResult);
      } else {
        //Delete Of review Not Successful
        //Notify User by Displaying message on screen
        //Dont bother refreshing product Reviews
        console.log("Delete was Not Successful");
        console.log(deleteReviewResult);
      }
    } else {
      console.log("Review ID is Undefined");
    }
  }

  return (
    <div className={Styles.InventoryItemPage}>
      <Row className={Styles.EditButtonSegment}>
        <Button
          label="Edit"
          styles={{ backgroundColor: "#FADA35", marginLeft: "auto", width:"min-content" }}
        />
      </Row>

      {product && (
        <ProductDetailsCard
          productId={product._id}
          productName={product.productName}
          brand={product.brand}
          showProduct={product.showProduct ? "Visible" : "Hidden"}
          Category={product.categories}
          supplierCost={product.supplierCost}
          supplierTax={product.supplierTaxAmount}
          sellingTax={product.sellingPriceTaxAmount}
          sellingPrice={product.sellingPrice}
        />
      )}


      {product && ( <Row className={Styles.ProductOptionsCard}>
        <ProductOptionsCard 
          product = {product}
        />
         <h1>Add new card here </h1>
      </Row> 
      )}

      {
        /* <Row className={Styles.ProductRevenueCard}></Row> */}
     {reviews && <ReviewBox reviews={reviews}/>}
    </div>
  );
}

export default InventoryItemPage;
