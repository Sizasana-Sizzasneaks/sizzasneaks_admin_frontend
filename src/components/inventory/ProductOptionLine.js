import React from "react";
import { Row, Col } from "react-bootstrap";
import Styles from "./ProductOptionLine.module.css";

function ProductOptionLine(props) {
  return (
    <Row className={Styles.Info}>
      <hr className={Styles.TopLine} />

      <Col xl={2} className={Styles.SingleFieldBanner}>
        <p>{props.color}</p>
      </Col>
      <Col xl={2} className={Styles.SingleFieldBanner}>
        <p>{props.size && "UK " + props.size}</p>
      </Col>
      <Col xl={2} className={Styles.SingleFieldBanner}>
        <p>{props.quantity}</p>
      </Col>
    </Row>
  );
}

export default ProductOptionLine;
