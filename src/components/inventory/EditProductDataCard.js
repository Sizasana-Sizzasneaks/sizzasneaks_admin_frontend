import React from "react";
import { Row, Col } from "react-bootstrap";
import Styles from "./EditProductDataCard.module.css";
import InputTextArea from "../general/InputTextArea.js";
import ProductOptionsLineHeader from "./ProductOptionsLineHeader.js";
import ProductOptionLine from "./ProductOptionLine.js";
import ProductImageItem from "./ProductImageItem.js";

import { validateBasicString } from "../../services/InputValidation.js";

function EditProductDataCard(props) {
  return (
    <Row className={Styles.ProductDataCard}>
      <Row className={Styles.ProductImagesCarousel}>
        <ProductImageItem />
        <ProductImageItem />
      </Row>
      <Row>
        <Col>
          <p>Product Options</p>
          <ProductOptionsLineHeader />
          <ProductOptionLine color="Red" />
          <ProductOptionLine size="6" quantity="16" />
          <ProductOptionLine size="3" quantity="5" />
          <ProductOptionLine size="7" quantity="80" />
          <ProductOptionLine color="Black" />
          <ProductOptionLine size="6" quantity="16" />
          <ProductOptionLine size="3" quantity="90" />
        </Col>
      </Row>
      <Row>
        <Col>
          <InputTextArea
            value={props.productDescription}
            label="Product Description"
            wrapperStyle={{ width: "auto", height: "120px" }}
            entireComponentStyle={{ width: "100%" }}
            onChange={async (value) => {
              if (typeof props.setProductDescription !== "undefined") {
                props.setProductDescription(value);
              }

              if (typeof props.setProductDescriptionError !== "undefined") {
                var productDescriptionResult = await validateBasicString(value);
                props.setProductDescriptionError(productDescriptionResult);
              }
            }}
            error={props.productDescriptionError}
          />
        </Col>
      </Row>
    </Row>
  );
}

export default EditProductDataCard;
