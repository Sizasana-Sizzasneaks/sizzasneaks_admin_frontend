import React from "react";
import { Row, Col } from "react-bootstrap";
import InputField from "../general/InputField.js";
import Styles from "./EditProductDetailsCard.module.css";
import BoxSelector from "../general/BoxSelector.js";
import DropDownInput from "../general/DropDownInput.js";

import {
  validateBasicString,
  validateFundsValue,
  validateVisibility, //
  validateCategories,
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
        {props.productId ? (
          <>
            <Col xl={2}>
              <p className={Styles.SectionBanner} style={{ fontWeight: "400" }}>
                ProductID:
              </p>
            </Col>
            <Col xl={2}>
              <p className={Styles.SectionBanner}>{props.productId}</p>
            </Col>
            <hr style={{ marginTop: "10px", marginBottom: "20px" }} />
          </>
        ) : (
          <Col>
            <p className={Styles.SectionBanner}>Product Description</p>
            <hr style={{ marginTop: "10px", marginBottom: "20px" }} />
          </Col>
        )}
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
        <Col xl={2}></Col>
        <Col xl={2} className={Styles.ProductDetailsLabel}>
          <p>Supplier Cost:</p>
        </Col>
        <Col xl={3} className={Styles.RightAlign}>
          <InputField
            type="text"
            inputStyle={{ textAlign: "right" }}
            value={props.supplierCost}
            onChange={async (value) => {
              var newValue = value
                .replace(/[^0-9.]/g, "")
                .replace(/(\..*)\./g, "$1");

              if (typeof props.setSupplierCost !== "undefined") {
                props.setSupplierCost(newValue);
              }
            }}
            onBlur={async (value) => {
              var numberValue = parseFloat(value, 10);

              var cleanValue =
                Math.round((numberValue + Number.EPSILON) * 100) / 100;

              var taxAmount =
                Math.round((cleanValue * 0.15 + Number.EPSILON) * 100) / 100;

              if (typeof props.setSupplierCost !== "undefined") {
                props.setSupplierCost(cleanValue);

                if (typeof props.setSupplierTax !== "undefined") {
                  props.setSupplierTax(taxAmount);
                }

                if (typeof props.setSupplierTaxError !== "undefined") {
                  var supplierTaxCheck = await validateFundsValue(taxAmount);
                  props.setSupplierTaxError(supplierTaxCheck);
                }
              }
              if (typeof props.setSupplierCostError !== "undefined") {
                var supplierCostCheck = await validateFundsValue(cleanValue);
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
        <Col xl={3}>
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
        <Col xl={2}></Col>
        <Col xl={2} className={Styles.ProductDetailsLabel}>
          <p>Supplier Tax:</p>
        </Col>
        <Col xl={3} className={Styles.RightAlign}>
          <InputField
            value={props.supplierTax}
            inputStyle={{ textAlign: "right" }}
            wrapperStyle={{ borderStyle: "none" }}
            error={props.supplierTaxError}
          />
        </Col>
      </Row>

      <Row className={Styles.SingleRow}>
        <Col xl={2} className={Styles.ProductDetailsLabel}>
          <p>Visibility:</p>
        </Col>
        <Col xl={3}>
          <DropDownInput
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
        <Col xl={2}></Col>
        <Col xl={2} className={Styles.ProductDetailsLabel}>
          <p>Selling Price:</p>
        </Col>
        <Col xl={3} className={Styles.RightAlign}>
          <InputField
            value={props.sellingPrice}
            inputStyle={{ textAlign: "right" }}
            onChange={async (value) => {
              var newValue = value
                .replace(/[^0-9.]/g, "")
                .replace(/(\..*)\./g, "$1");

              if (typeof props.setSellingPrice !== "undefined") {
                props.setSellingPrice(newValue);
              }
            }}
            onBlur={async (value) => {
              var numberValue = parseFloat(value, 10);

              var cleanValue =
                Math.round((numberValue + Number.EPSILON) * 100) / 100;

              var taxAmount =
                Math.round((cleanValue * 0.15 + Number.EPSILON) * 100) / 100;

              if (typeof props.setSellingPrice !== "undefined") {
                props.setSellingPrice(cleanValue);

                if (typeof props.setSellingTax !== "undefined") {
                  props.setSellingTax(taxAmount);
                }

                if (typeof props.setSellingPriceError !== "undefined") {
                  var sellingTaxCheck = await validateFundsValue(taxAmount);
                  props.setSellingTaxError(sellingTaxCheck);
                }
              }
              if (typeof props.setSellingPriceError !== "undefined") {
                var sellingPriceCheck = await validateFundsValue(cleanValue);
                props.setSellingPriceError(sellingPriceCheck);
              }
            }}
            error={props.sellingPriceError}
          />
        </Col>
      </Row>

      <Row className={Styles.SingleRow}>
        <Col xl={2} className={Styles.ProductDetailsLabel}>
          <p>Category:</p>
        </Col>
        <Col xl={3} style={{ marginTop: "auto", marginBottom: "auto" }}>
          <BoxSelector
            label="Women"
            selected={props.categories.women}
            select={async () => {
              props.setCategories({ women: !props.categories.women });
              var categoriesCheck = await validateCategories({
                ...props.categories,
                women: !props.categories.women,
              });
              props.setCategoriesError(categoriesCheck);
            }}
          />
          <BoxSelector
            label="Men"
            selected={props.categories.men}
            select={async () => {
              props.setCategories({ men: !props.categories.men });

              var categoriesCheck = await validateCategories({
                ...props.categories,
                men: !props.categories.men,
              });
              props.setCategoriesError(categoriesCheck);
            }}
          />
          <BoxSelector
            label="Kids"
            selected={props.categories.kids}
            select={async () => {
              props.setCategories({ kids: !props.categories.kids });

              var categoriesCheck = await validateCategories({
                ...props.categories,
                kids: !props.categories.kids,
              });
              props.setCategoriesError(categoriesCheck);
            }}
          />
          {props.categoriesError && (
            <p className={[Styles.InputLabel, Styles.InputError].join(" ")}>
              {!props.categoriesError.ok ? props.categoriesError.message : ""}
            </p>
          )}
        </Col>
        {}
        <Col xl={2}></Col>

        <Col xl={2} className={Styles.ProductDetailsLabel}>
          <p>Selling Tax:</p>
        </Col>
        <Col xl={3} className={Styles.RightAlign}>
          <InputField
            value={props.sellingTax}
            inputStyle={{ textAlign: "right" }}
            wrapperStyle={{ borderStyle: "none" }}
            error={props.sellingTaxError}
          />
        </Col>
      </Row>
    </Row>
  );
}

export default EditProductDetailsCard;
