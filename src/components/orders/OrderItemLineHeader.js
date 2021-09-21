import React from "react";
import Styles from "./OrderItemLineHeader.module.css";
import { Row, Col } from "react-bootstrap";

function OrderItemLineHeader(props) {
  return (
    <Row className={Styles.Labels}>
      <hr className={Styles.TopLine} />
      <Col xl={3}>
        <p>OrderID</p>
      </Col>
      <Col xl={1}>
        <p>Quantity</p>
      </Col>
      <Col xl={2}>
        <p>CustomerID</p>
      </Col>
      <Col xl={3}></Col>
      <Col xl={1} className={Styles.LeftAlign}>
        <p>Total Cost</p>
      </Col>
      <Col xl={2} className={Styles.LeftAlign}>
        <p>Date</p>
      </Col>
    </Row>
  );
}

export default OrderItemLineHeader;
