import React from "react";
import { Row, Col } from "react-bootstrap";
import Styles from "./EditProductDataCard.module.css";

import { randomString } from "../../services/randomString.js";
import InputTextArea from "../general/InputTextArea.js";
import ProductOptionsLineHeader from "./ProductOptionsLineHeader.js";
import ProductOptionLine from "./ProductOptionLine.js";
import EditProductOptionLine from "./EditProductOptionLine.js";
import ProductImagesCarousel from "./ProductImagesCarousel.js";
import EditProductImageItem from "./EditProductImageItem.js";

import { validateProductDescriptionString } from "../../services/InputValidation.js";
import ProductOptionsSection from "./ProductOptionsSection";

function EditProductDataCard(props) {
  return (
    <Row className={Styles.ProductDataCard}>
      <p className={Styles.SectionBanner}>Product Images</p>
      {props.productImagesError && !props.productImagesError.ok && (
        <p className={Styles.ErrorMessage}>
          {props.productImagesError.message}
        </p>
      )}
      <hr style={{ marginTop: "10px", marginBottom: "20px" }} />
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
                    file={productImage.file}
                    deleteProductImage={props.deleteProductImage}
                    empty={false}
                    key={productImage._id || randomString(10)}
                  />
                  <EditProductImageItem
                    addNewProductImage={props.addNewProductImage}
                    empty={true}
                    key={productImage._id ? productImage._id + randomString(5) : randomString(9)}
                  />
                </>
              ) : (
                <EditProductImageItem
                  fileName={productImage.fileName}
                  fileType={productImage.fileType}
                  imgURL={productImage.imgURL}
                  file={productImage.file}
                  deleteProductImage={props.deleteProductImage}
                  empty={false}
                  key={productImage._id || randomString(7)}
                />
              );
            })}
          </>
        ) : (
          <EditProductImageItem
            addNewProductImage={props.addNewProductImage}
            empty={true}
            key={0}
          />
        )}
      </ProductImagesCarousel>
      <Row>
        <Col>
          <ProductOptionsSection
            productOptionsError={props.productOptionsError}
          >
            <ProductOptionsLineHeader />
            {props.productOptions &&
              props.productOptions.map((productOption) => {
                return productOption.variants.map((variant, index) => {
                  return index === productOption.variants.length - 1 ? (
                    <>
                      <EditProductOptionLine //Show
                        color={productOption.color}
                        size={variant.size}
                        quantity={variant.quantity}
                        editType="complete"
                        subtractQuantity={props.subtractQuantity}
                        addQuantity={props.addQuantity}
                        deleteProductOption={props.deleteProductOption}
                      />
                      <EditProductOptionLine // Varaint add
                        color={productOption.color}
                        editType="variant"
                        addVariant={props.addProductOptionVariant}
                      />
                      <div
                        style={{
                          height: "3px",
                          width: "100%",
                          backgroundColor: "Black",
                          marginTop: "20px",
                          marginBottom: "20px",
                        }}
                      ></div>
                    </>
                  ) : (
                    <EditProductOptionLine
                      color={productOption.color}
                      size={variant.size}
                      quantity={variant.quantity}
                      editType="complete"
                      subtractQuantity={props.subtractQuantity}
                      addQuantity={props.addQuantity}
                      deleteProductOption={props.deleteProductOption}
                    />
                  );
                });
              })}

            <EditProductOptionLine // Add Color
              updateVariant={props.addProductOptionVariant}
              addOption={props.addProductOption}
            />
          </ProductOptionsSection>
        </Col>
      </Row>
      <Row>
        <p className={Styles.SectionBanner}>Product Description</p>
        <hr style={{ marginTop: "15px", marginBottom: "20px" }} />
        <Col>
          <InputTextArea
            value={props.productDescription}
            // label="Product Description"
            wrapperStyle={{ width: "auto", height: "120px" }}
            entireComponentStyle={{ width: "100%" }}
            inputStyle={{ width: "99%" }}
            onChange={async (value) => {
              if (typeof props.setProductDescription !== "undefined") {
                props.setProductDescription(value);
              }

              if (typeof props.setProductDescriptionError !== "undefined") {
                var productDescriptionResult =
                  await validateProductDescriptionString(value);
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
