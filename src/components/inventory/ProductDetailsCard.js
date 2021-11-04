import React from "react";
import { Row, Col } from "react-bootstrap";
import Styles from "./ProductDetailsCard.module.css";
import BoxSelector from "../general/BoxSelector.js";

function ProductDetailsCard(props) {
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "ZAR",
  });
  return (
    <Row className={Styles.ProductDetailsCard}>
      <Row className={Styles.ProductDetailsHeader}>
        <Col xl={2}>
          <p style={{ fontWeight: "400" }}>ProductID:</p>
        </Col>
        <Col xl={2}>
          <p>{props.productId}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <hr />
        </Col>
      </Row>

      <Row>
        <Col xl={2} className={Styles.ProductDetailsLabel}>
          <p>Product Name:</p>
        </Col>
        <Col xl={3}>
          <p>{props.productName}</p>
        </Col>
        <Col xl={3}></Col>
        <Col xl={2} className={Styles.ProductDetailsLabel}>
          <p>Supplier Cost:</p>
        </Col>
        <Col xl={2} className={Styles.RightAlign}>
          <p>{formatter.format(props.supplierCost)}</p>
        </Col>
      </Row>

      <Row>
        <Col xl={2} className={Styles.ProductDetailsLabel}>
          <p>Brand:</p>
        </Col>
        <Col xl={2}>
          <p>{props.brand}</p>
        </Col>
        <Col xl={4}></Col>
        <Col xl={2} className={Styles.ProductDetailsLabel}>
          <p>Supplier Tax:</p>
        </Col>
        <Col xl={2} className={Styles.RightAlign}>
          <p>{formatter.format(props.supplierTax)}</p>
        </Col>
      </Row>

      <Row>
        <Col xl={2} className={Styles.ProductDetailsLabel}>
          <p>Visibility:</p>
        </Col>
        <Col xl={2}>
          <p>{props.showProduct}</p>
        </Col>
        <Col xl={4}></Col>
        <Col xl={2} className={Styles.ProductDetailsLabel}>
          <p>Selling Price:</p>
        </Col>
        <Col xl={2} className={Styles.RightAlign}>
          <p>{formatter.format(props.sellingPrice)}</p>
        </Col>

       
      </Row>

      <Row>
        <Col xl={2} className={Styles.ProductDetailsLabel}>
          <p>Category:</p>
        </Col>
        <Col xl={3}>
          <BoxSelector
            label="Women"
            selected={props.categories.indexOf("WOMEN") !== -1 ? true : false}
          />
          <BoxSelector
            label="Men"
            selected={props.categories.indexOf("MEN") !== -1 ? true : false}
          />
          <BoxSelector
            label="Kids"
            selected={props.categories.indexOf("KIDS") !== -1 ? true : false}
          />
        </Col>
        <Col xl={3}></Col>
        <Col xl={2} className={Styles.ProductDetailsLabel}>
          <p>Selling Tax:</p>
        </Col>
        <Col xl={2} className={Styles.RightAlign}>
          <p>{formatter.format(props.sellingTax)}</p>
        </Col>
      </Row>
    </Row>
  );
}

export default ProductDetailsCard;
