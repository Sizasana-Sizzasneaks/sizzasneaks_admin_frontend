import React from "react";
import Styles from "./OrderItemLine.module.css";
import { Row, Col } from "react-bootstrap";

function OrderItemLine(props) { //props is an object
  return (
    <Row
      className={Styles.Info}
      onClick={() => {
        // Checks if this property is defined
        if (typeof props.pushToOrderPage !== "undefined") {
          //Calls the function supplied to this property.
          props.pushToOrderPage();
        }
      }}
    >
      <Col xl={3}>
        <p>{props.orderId}</p>
      </Col>
      <Col xl={1}>
        <p>{props.quantity}</p>
      </Col>
      <Col xl={2}>
        <p>{props.totalCost}</p>
      </Col>
      <Col xl={1}>
        <p>{props.paymentComplete ? "Paid" : "Not Paid"}</p>
      </Col>
      <Col xl={1}>
        <p>{props.hasShipped ? "Shipped" : "Not Shipped"}</p>
      </Col>
      <Col xl={1}>
        <p>{props.hasBeenDelivered ? "Delivered" : "Not Delivered"}</p>
      </Col>
      <Col xl={1}>
        <p>{props.isCancelled ? "Cancelled" : "Not Cancelled"}</p>
      </Col>

      <Col xl={2}>
        {/* Displays date */}
        <p>{props.date}</p>
      </Col>
      <hr className={Styles.TopLine} />
    </Row>
  );
}

export default OrderItemLine;
