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
      <Col xl={2} >
        <p>Total Cost</p>
      </Col>
      <Col xl={1}>
        <p>Paid</p>
      </Col>
      <Col xl={1}>
        <p>Shipped</p>
      </Col>
      <Col xl={1}>
        <p>Delivered</p>
      </Col>
      <Col xl={1}>
      <p>Cancelled</p>
      </Col>
      
      <Col xl={2} >
        <p>Date</p>
      </Col>
    </Row>
  );
}

export default OrderItemLineHeader;
