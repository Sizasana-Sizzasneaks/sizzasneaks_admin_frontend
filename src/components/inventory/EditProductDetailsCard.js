import { Input } from "@material-ui/core";
import React from "react";
import { Row, Col } from "react-bootstrap";
import InputField from "../general/InputField.js";
import Styles from "./EditProductDetailsCard.module.css";

import {
  validateBasicString,
  validateFundsValue,
  validateVisibility,
} from "../../services/InputValidation.js";

function EditProductDetailsCard(props) {
  return (
    <Row className={Styles.ProductDetailsCard}>
      {/* <Row className={Styles.ProductDetailsHeader}>
        <Col xl={2}>
          <p style={{ fontWeight: "400" }}>ProductID:</p>
        </Col>
        <Col xl={2}>
          <p>{props.productId}</p>
        </Col>
      </Row> */}
      <Row>
        <Col>
          <hr style={{ marginTop: "0px" }} />
        </Col>
      </Row>

      <Row className={Styles.SingleRow}>
        <Col xl={2} className={Styles.ProductDetailsLabel}>
          <p>Product Name:</p>
        </Col>
        <Col xl={3}>
          <InputField
            value={props.productName}
            onChange={async (value) => {
              if (typeof props.setProductName !== "undefined") {
                props.setProductName(value);
              }
              if (typeof props.setProductNameError !== "undefined") {
                var productNameCheck = await validateBasicString(value);
                props.setProductNameError(productNameCheck);
              }
            }}
            error={props.productNameError}
          />
        </Col>
        <Col xl={3}></Col>
        <Col xl={2} className={Styles.ProductDetailsLabel}>
          <p>Supplier Cost:</p>
        </Col>
        <Col xl={2} className={Styles.RightAlign}>
          <InputField
            value={props.supplierCost}
            onChange={async (value) => {
              if (typeof props.setSupplierCost !== "undefined") {
                props.setSupplierCost(value);
              }
              if (typeof props.setSupplierCostError !== "undefined") {
                var supplierCostCheck = await validateFundsValue(value);
                props.setSupplierCostError(supplierCostCheck);
              }
            }}
            error={props.supplierCostError}
          />
        </Col>
      </Row>

      <Row className={Styles.SingleRow}>
        <Col xl={2} className={Styles.ProductDetailsLabel}>
          <p>Brand:</p>
        </Col>
        <Col xl={2}>
          <InputField
            value={props.brand}
            onChange={async (value) => {
              if (typeof props.setBrand !== "undefined") {
                props.setBrand(value);
              }
              if (typeof props.setBrandError !== "undefined") {
                var brandCheck = await validateBasicString(value);
                props.setBrandError(brandCheck);
              }
            }}
            error={props.brandError}
          />
        </Col>
        <Col xl={4}></Col>
        <Col xl={2} className={Styles.ProductDetailsLabel}>
          <p>Supplier Tax:</p>
        </Col>
        <Col xl={2} className={Styles.RightAlign}>
          <InputField
            value={props.supplierTax}
            onChange={async (value) => {
              if (typeof props.setSupplierTax !== "undefined") {
                props.setSupplierTax(value);
              }
              if (typeof props.setSupplierTaxError !== "undefined") {
                var supplierTaxCheck = await validateFundsValue(value);
                props.setSupplierTaxError(supplierTaxCheck);
              }
            }}
            error={props.supplierTaxError}
          />
        </Col>
      </Row>

      <Row className={Styles.SingleRow}>
        <Col xl={2} className={Styles.ProductDetailsLabel}>
          <p>Visibility:</p>
        </Col>
        <Col xl={2}>
          <InputField
            value={props.visibility}
            onChange={async (value) => {
              if (typeof props.setVisibility !== "undefined") {
                props.setVisibility(value);
              }
              if (typeof props.setVisibilityError !== "undefined") {
                var visibilityCheck = await validateVisibility(value);
                props.setVisibilityError(visibilityCheck);
              }
            }}
            error={props.visibilityError}
          />
        </Col>
        <Col xl={4}></Col>
        <Col xl={2} className={Styles.ProductDetailsLabel}>
          <p>Selling Tax:</p>
        </Col>
        <Col xl={2} className={Styles.RightAlign}>
          <InputField
            value={props.sellingTax}
            onChange={async (value) => {
              if (typeof props.setSellingTax !== "undefined") {
                props.setSellingTax(value);
              }
              if (typeof props.setSellingTaxError !== "undefined") {
                var sellingTaxCheck = await validateFundsValue(value);
                props.setSellingTaxError(sellingTaxCheck);
              }
            }}
            error={props.sellingTaxError}
          />
        </Col>
      </Row>

      <Row className={Styles.SingleRow}>
        <Col xl={2} className={Styles.ProductDetailsLabel}>
          <p>Category:</p>
        </Col>
        <Col xl={2}>
          <InputField
            value={props.categories}
            onChange={(value) => {
              if (typeof props.setCategories !== "undefined") {
                props.setCategories(value);
              }
              if (typeof props.setCategoriesError !== "undefined") {
                // props.setCategoriesError();
              }
            }}
            error={props.categoriesError}
          />
        </Col>
        <Col xl={4}></Col>
        <Col xl={2} className={Styles.ProductDetailsLabel}>
          <p>Selling Price:</p>
        </Col>
        <Col xl={2} className={Styles.RightAlign}>
          <InputField
            value={props.sellingPrice}
            onChange={async (value) => {
              if (typeof props.setSellingPrice !== "undefined") {
                props.setSellingPrice(value);
              }
              if (typeof props.setSellingPriceError !== "undefined") {
                var sellingPriceCheck = await validateFundsValue(value);
                props.setSellingPriceError(sellingPriceCheck);
              }
            }}
            error={props.sellingPriceError}
          />
        </Col>
      </Row>
    </Row>
  );
}

export default EditProductDetailsCard;
