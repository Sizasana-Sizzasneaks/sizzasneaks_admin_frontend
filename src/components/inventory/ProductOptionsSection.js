import React from "react";
import { Row } from "react-bootstrap";
import Styles from "./ProductOptionsSection.module.css";

function ProductOptionsSection(props) {
  return (
    <Row className={Styles.ProductOptionsSection}>
      <p className={Styles.SectionBanner}>Product Options</p>
      {props.productOptionsError && !props.productOptionsError.ok && (
        <p>{props.productOptionsError.message}</p>
      )}
      {props.children}
    </Row>
  );
}

export default ProductOptionsSection;
