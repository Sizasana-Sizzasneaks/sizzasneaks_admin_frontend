import React from "react";
import Styles from "./OrderItemLine.module.css";
import { Row, Col } from "react-bootstrap";

function OrderItemLine(props) {
  return (
    <Row
      className={Styles.Info}
      onClick={() => {
        //Checks if this property is defined
        if (typeof props.pushToOrderPage !== "undefined") {
          //Calls the function supplied to this property.
          props.pushToOrderPage();
        }
      }}
    >
      <hr className={Styles.TopLine} />
      <Col xl={3}>
        <p>{props.orderId}</p>
      </Col>
      <Col xl={1}>
        <p>{props.quantity}</p>
      </Col>
      <Col xl={3}>
        <p>{props.customerId}</p>
      </Col>
      <Col xl={2}></Col>

      <Col xl={2} className={Styles.LeftAlign}>
        <p>{"R " + props.totalCost}</p>
      </Col>

      <Col xl={1} className={Styles.LeftAlign}>
        {/* Displays the visibility of a product based on the boolean variable 
        <p>{props.visibility ? "Visible" : "Hidden"}</p> */}

        {/* Displays date */}
        <p>{props.date}</p>
      </Col>
    
    </Row>
  );
}

export default OrderItemLine;
