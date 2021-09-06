import React from "react";
import { Row } from "react-bootstrap";
import Styles from "./InventoryItemPage.module.css";
import { useParams, useHistory } from "react-router-dom";
import { getProduct } from "../../api/products.js";
import {
  getReviewsByProductId,
  deleteReviewByReviewId,
} from "../../api/review.js";

import ProductDetailsCard from "../inventory/ProductDetailsCard";
import ProductDataCard from "../inventory/ProductDataCard.js";
import ReviewBox from "../reviews/ReviewBox.js";
import Button from "../general/Button.js";
import ProductOptionsCard from "../inventory/ProductOptionsCard";
import { CircularProgress } from "@material-ui/core";

function InventoryItemPage(props) {
  var { id } = useParams();
  var history = useHistory();
  var [product, setProduct] = React.useState(null);

  React.useEffect(() => {
    getProductItem(id);
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


  return (
    <div>
      {product ? (
        <div className={Styles.InventoryItemPage}>
          <Row className={Styles.EditButtonSegment}>
            <div
              className={Styles.BackButton}
              onClick={() => {
                history.goBack();
              }}
            >
              <span
                class="material-icons"
                style={{
                  fontSize: "35px",
                  alignSelf: "center",
                }}
              >
                arrow_back
              </span>
            </div>

            <Button
              label="Edit"
              styles={{
                backgroundColor: "#FADA35",
                marginLeft: "auto",
                width: "min-content",
              }}
              onClick={() => {
                history.push("/inventory/update/" + id);
              }}
            />
          </Row>

          <ProductDetailsCard
            productId={product._id}
            productName={product.productName}
            brand={product.brand}
            showProduct={product.showProduct ? "Visible" : "Hidden"}
            categories={product.categories}
            supplierCost={product.supplierCost}
            supplierTax={product.supplierTaxAmount}
            sellingTax={product.sellingPriceTaxAmount}
            sellingPrice={product.sellingPrice}
          />

          <ProductDataCard
            productImages={product.imgURls}
            productOptions={product.options}
            productDescription={product.productDescription}
          />

          <ReviewBox product_id={id} />
        </div>
      ) : (
        <div
          style={{
            marginTop: "150px",
            marginBottom: "100vh",
            alignContent: "center",
            display: "flex",
          }}
        >
          <CircularProgress size={115} style={{ margin: "0px auto" }} />
        </div>
      )}
    </div>
  );
}

export default InventoryItemPage;
