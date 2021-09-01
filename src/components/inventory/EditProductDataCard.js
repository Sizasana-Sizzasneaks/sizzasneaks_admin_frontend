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
import ProductOptionsSection from "./ProductOptionsSection";

function EditProductDataCard(props) {
  return (
    <Row className={Styles.ProductDataCard}>
      <p className={Styles.SectionBanner}>Product Images</p>
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
          <ProductOptionsSection>
            <ProductOptionsLineHeader />
            {props.productOptions &&
              props.productOptions.map((productOption) => {
                return productOption.variants.map((variant, index) => {
                  return index === productOption.variants.length - 1 ? (
                    <>
                      <ProductOptionLine
                        color={productOption.color}
                        size={variant.size}
                        quantity={variant.quantity}
                      />
                      <EditProductOptionLine
                        color={productOption.color}
                        editType="variant"
                        addVariant={props.addProductOptionVariant}
                      />
                    </>
                  ) : (
                    <ProductOptionLine
                      color={productOption.color}
                      size={variant.size}
                      quantity={variant.quantity}
                    />
                  );
                });
              })}

            <EditProductOptionLine
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