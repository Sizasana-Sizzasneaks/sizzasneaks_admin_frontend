import React from "react";
import { Row, Col } from "react-bootstrap";
import Styles from "./ProductOptionsLineHeader.module.css";

function ProductOptionsLineHeader(props) {
  return (
    <Row className={Styles.Labels}>
      <hr className={Styles.TopLine} />

      <Col xl={2}>
        <p>Color</p>
      </Col>
      <Col xl={2}>
        <p>Size</p>
      </Col>
      <Col xl={2}>
        <p>Quantity</p>
      </Col>
    </Row>
  );
}

export default ProductOptionsLineHeader;
