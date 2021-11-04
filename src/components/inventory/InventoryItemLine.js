import React from "react";
import Styles from "./InventoryItemLine.module.css";
import { Row, Col } from "react-bootstrap";

function InventoryItemLine(props) {
  return (
    <Row
      className={Styles.Info}
      onClick={() => {
        //Checks if this property is defined
        if (typeof props.pushToProductPage !== "undefined") {
          //Calls the function supplied to this property.
          props.pushToProductPage();
        }
      }}
    >
      <hr className={Styles.TopLine} />
      <Col xl={3}>
        <p>{props.productId}</p>
      </Col>
      <Col xl={1}>
        <p>{props.brand}</p>
      </Col>
      <Col xl={3}>
        <p>{props.productName}</p>
      </Col>
      <Col xl={2}></Col>
      <Col xl={1} className={Styles.LeftAlign}>
        {/* Displays the visibility of a product based on the boolean variable  */}
        <p>{props.visibility ? "Visible" : "Hidden"}</p>
      </Col>
      <Col xl={2} className={Styles.LeftAlign}>
        <p>{props.sellingPrice}</p>
      </Col>
    </Row>
  );
}

export default InventoryItemLine;
