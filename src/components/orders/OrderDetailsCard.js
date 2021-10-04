import React from "react";
import { Row, Col } from "react-bootstrap";
import Styles from "./OrderDetailsCard.module.css";
import BoxSelector from "../general/BoxSelector.js";

function OrderDetailsCard(props) {
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "ZAR",
  });

  return (
    <>
      <Row className={Styles.OrderDetailsCard}>
        <Row className={Styles.TopRow}>
          <Col xl={8}>
            <p>#OrderID: {props.orderId}</p>
          </Col>

          <Col xl={4}>
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
                    {formatter.format(item.sellingPriceAmount * item.quantity)}
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

        <Row className={Styles.SummaryLine}>
          <Col xl={4}>
            <p>Total</p>
          </Col>

          <Col xl={8}>
            <p style={{ textAlign: "right" }}>{props.totalCost}</p>
          </Col>
        </Row>
        <Row className={Styles.BottomDivider}>
          <Col>
            <hr />
          </Col>
        </Row>

        <Row>
          <Col xl={4} className={Styles.ShippingAddress}>
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
                  <Col>
                  <p
                style={{
                  fontWeight: "400",
                  fontSize: "20px",
                  marginBottom: "8px",
                }}
              >
                Order Status
              </p>
                  </Col>
            
            </Row>

            <Row>
              <Row>
                <Col> <p>Paid:</p></Col>
                <Col> <p>{props.paymentComplete ? "True" : "False"}</p></Col>
                <Col> <p>{props.paymentComplete ? props.paymentTime : ""}</p></Col>
              </Row>

              <Row>
                <Col><p>Shipped:</p></Col>
                <Col><p>
                    {props.hasShipped ? (
                      "True"
                    ) : (
                      <div>
                        Set<p></p>
                      </div>
                    )}
                  </p></Col>

                <Col> <p>{props.hasShipped ? props.shippedTime : ""}</p> </Col>
              </Row>

              <Row>
                <Col> <p>Delivered:</p></Col>
                <Col> <p>{props.hasBeenDelivered ? "True" : "False"}</p></Col>
                <Col> <p>{props.hasBeenDelivered ? props.deliveredTime : ""}</p></Col>
              </Row>

              <Row>
                <Col><p>Cancelled:</p></Col>
                <Col> <p>{props.isCancelled ? "True" : "False"}</p></Col>
                <Col> <p>{props.isCancelled ? props.cancelTime : ""}</p></Col>
              </Row>
            </Row>

          </Col>
        </Row>
      </Row>
      <hr className={Styles.TopLine} />
    </>
  );
}

export default OrderDetailsCard;
