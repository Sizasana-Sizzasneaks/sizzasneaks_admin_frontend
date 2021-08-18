import React from "react";
import Styles from "./InventoryItemLineHeader.module.css";
import { Row, Col } from "react-bootstrap";

function InventoryItemLineHeader(props) {
  return (
    <Row className={Styles.Labels}>
      <hr className={Styles.TopLine} />
      <Col xl={3}>
        <p>ProductID</p>
      </Col>
      <Col xl={1}>
        <p>Brand</p>
      </Col>
      <Col xl={2}>
        <p>Product Name</p>
      </Col>
      <Col xl={3}></Col>
      <Col xl={1} className={Styles.LeftAlign}>
        <p>Visibility</p>
      </Col>
      <Col xl={2} className={Styles.LeftAlign}>
        <p>Selling Price</p>
      </Col>
    </Row>
  );
}

export default InventoryItemLineHeader;
