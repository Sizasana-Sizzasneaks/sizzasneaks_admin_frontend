import React from "react";
import { Row, Col } from "react-bootstrap";
import Styles from "./OrderDetailsCard.module.css";
import BoxSelector from "../general/BoxSelector.js";

function OrderDetailsCard(props) {
  return (
    <Row className={Styles.OrderDetailsCard}>
      <Row className={Styles.TopRow}>
        <Col xl={10}>
          <p>#OrderID: {props.orderId}</p>
        </Col>

        <Col xl={2}>
          <p style={{ textAlign: "right" }}> {props.date}</p>
        </Col>
      </Row>

      <Row className={Styles.CardRow}>
        <Col xl={2}>
          <p>Product Name</p>
        </Col>

        <Col xl={2}>
          <p>Color</p>
        </Col>

        <Col xl={2}>
          <p>Size</p>
        </Col>

        <Col xl={2}>
          <p>Quantity</p>
        </Col>

        <Col xl={4}>
          <p style={{ textAlign: "right" }}>Total</p>
        </Col>
      </Row>

      <Row>
        <Col>
          <hr />
        </Col>
      </Row>

      {props.orderItems.map((item) => {
        return (
          <>
            <Row className={Styles.TextRow}>
              <Col xl={2}>
                <p>Product Name</p>
              </Col>

              <Col xl={2}>
                {/* getting color of item */}
                <p>{item.option.color}</p>
              </Col>

              <Col xl={2}>
                <p>{item.option.size}</p>
              </Col>

              <Col xl={2}>
                <p>{item.quantity}</p>
              </Col>

              <Col xl={4}>
                <p style={{ textAlign: "right" }}>
                  {item.sellingPriceAmount * item.quantity}
                </p>
              </Col>
            </Row>
            <Row>
              <Col>
                <hr />
              </Col>
            </Row>
          </>
        );
      })}

      <Row className={Styles.CardRow}>
        <Col xl={4}>
          <p>Total</p>
        </Col>

        <Col xl={8}>
          <p style={{ textAlign: "right" }}>{props.totalCost}</p>
        </Col>
      </Row>

      <Row>
        <Col className={Styles.ShippingAddress}>
          <Row>
            <p
              style={{
                fontWeight: "400",
                fontSize: "20px",
                marginBottom: "8px",
              }}
            >
              Shipping Address
            </p>
          </Row>
          <Row>
            <p>
              {props.shippingAddress.firstName +
                " " +
                props.shippingAddress.lastName}
            </p>
          </Row>
          <Row>
            <p>{props.shippingAddress.addressLineOne}</p>
          </Row>
          <Row>
            <p>{props.shippingAddress.addressLineTwo}</p>
          </Row>
          <Row>
            <p>{props.shippingAddress.city}</p>
          </Row>
          <Row>
            <p>{props.shippingAddress.province}</p>
          </Row>
          <Row>
            <p>{props.shippingAddress.country}</p>
          </Row>
          <Row>
            <p>{props.shippingAddress.zipCode}</p>
          </Row>
          <Row>
            <p>{props.shippingAddress.contactNumber}</p>
          </Row>
        </Col>

    <Col></Col>

        <Col className={Styles.OrderStatus}>
          <Row>
            <p
              style={{
                fontWeight: "400",
                fontSize: "20px",
                marginBottom: "8px",
              }}
            >
              Order Status
            </p>
          </Row>

          <Row>
          <Col xl={3}>
            <Row>
              <p>
                Paid:
              </p>
            </Row>
            <Row>
              <p>Shipped:</p>
            </Row>
            <Row>
              <p>Delivered:</p>
            </Row>

            <Row>
              <p>Cancelled:</p>
            </Row>

          </Col>
{/* if payment was made time is displayed */}
          <Col xl={3}>
            <Row>
              <p>
                {props.paymentComplete ? "True" : "False"}
              </p>
            </Row>
            <Row>
              <p>{props.hasShipped ? "True" : <div>Set<p></p></div>}</p>
            </Row>
            <Row>
              <p>{props.hasBeenDelivered ? "True" : "False"}</p>
            </Row>
            <Row>
              <p>{props.isCancelled ? "True" : "False"}</p>
            </Row>
          </Col>

          <Col className={Styles.TimeValues} xl={6}>
          <Row>
              <p>
                {props.paymentComplete ? props.paymentTime : ""}
              </p>
            </Row>
            <Row>
              <p>{props.hasShipped ? props.shippedTime: ""}</p>
            </Row>
            <Row>
              <p>{props.hasBeenDelivered ? props.deliveredTime: ""}</p>
            </Row>
            <Row>
              <p>{props.isCancelled ? props.cancelTime: ""}</p>
            </Row>
          </Col>

          </Row>
        </Col>
      </Row>
    </Row>
  );
}

export default OrderDetailsCard;
