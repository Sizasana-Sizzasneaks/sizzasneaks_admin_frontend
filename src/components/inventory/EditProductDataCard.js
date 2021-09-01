import React from "react";
import { Row, Col } from "react-bootstrap";
import Styles from "./EditProductDataCard.module.css";
import InputTextArea from "../general/InputTextArea.js";
import ProductOptionsLineHeader from "./ProductOptionsLineHeader.js";
import ProductOptionLine from "./ProductOptionLine.js";
import EditProductOptionLine from "./EditProductOptionLine.js";
import ProductImagesCarousel from "./ProductImagesCarousel.js";
import EditProductImageItem from "./EditProductImageItem.js";

import { validateBasicString } from "../../services/InputValidation.js";

function EditProductDataCard(props) {
  return (
    <Row className={Styles.ProductDataCard}>
      <ProductImagesCarousel>
        {props.productImages && props.productImages.length !== 0 ? (
          <>
            {props.productImages.map((productImage, index) => {
              return index === props.productImages.length - 1 ? (
                <>
                  <EditProductImageItem
                    fileName={productImage.fileName}
                    fileType={productImage.fileType}
                    imgURL={productImage.imgURL}
                    deleteProductImage={props.deleteProductImage}
                    empty={false}
                  />
                  <EditProductImageItem
                    addNewProductImage={props.addNewProductImage}
                    empty={true}
                  />
                </>
              ) : (
                <EditProductImageItem
                  fileName={productImage.fileName}
                  fileType={productImage.fileType}
                  imgURL={productImage.imgURL}
                  deleteProductImage={props.deleteProductImage}
                  empty={false}
                />
              );
            })}
          </>
        ) : (
          <EditProductImageItem
            addNewProductImage={props.addNewProductImage}
            empty={true}
          />
        )}
      </ProductImagesCarousel>
      <Row>
        <Col>
          <p>Product Options</p>
          <ProductOptionsLineHeader />

          <ProductOptionLine color="Red" size="6" quantity="16" />
          <ProductOptionLine color="Red" size="3" quantity="5" />
          <ProductOptionLine color="Red" size="7" quantity="80" />

          <ProductOptionLine color="Black" size="6" quantity="16" />
          <ProductOptionLine color="Black" size="3" quantity="90" />
          <EditProductOptionLine/>
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
