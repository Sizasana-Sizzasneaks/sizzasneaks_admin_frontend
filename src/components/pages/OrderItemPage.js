import React from "react";
import { Row } from "react-bootstrap";
import Styles from "./OrderItemPage.module.css"; //fix
import { useParams, useHistory } from "react-router-dom";

//import { getProduct } from "../../api/products.js"; //fix
import { getOrder } from "../../api/orders.js";

import {
  getReviewsByProductId,
  deleteReviewByReviewId,
} from "../../api/review.js"; //not used

import OrderDetailsCard from "../orders/OrderDetailsCard";
//not needed :import OrderDataCard from "../orders/OrderDataCard.js"; //fix

import Button from "../general/Button.js";
import { CircularProgress } from "@material-ui/core";

function OrderItemPage(props) {
  var { id } = useParams();
  var history = useHistory();
  var [order, setOrder] = React.useState(null);
  // var [product, setProduct] = React.useState(null);

  React.useEffect(() => {
    getOrderItem(id);
  }, [id]);

  async function getOrderItem(order_id) {
    if (typeof order_id !== "undefined") {
      var getOrderResult = await getOrder(order_id);

      if (getOrderResult.ok === true) {
        //Order Item is at index 0 of date
        setOrder(getOrderResult.data);
        console.log(getOrderResult.data);
      } else {
        console.log(getOrderResult);
      }
    } else {
      console.log("Order Id is Undefined");
    }
  }

  return (
    <div>
      <div className={Styles.OrderItemPage}>
        <Row className={Styles.EditButtonSegment}>
          <div
            className={Styles.BackButton}
            onClick={() => {
              history.goBack();
            }}
          >
            <span
              class="material-icons"
              style={{
                fontSize: "35px",
                alignSelf: "center",
              }}
            >
              arrow_back
            </span>
          </div>

          {order && (
            <Button
              label="Edit"
              styles={{
                backgroundColor: "#FADA35",
                marginLeft: "auto",
                width: "min-content",
              }}
              onClick={() => {
                history.push("/orders/update/" + id); //fix
              }}
            />
          )}
        </Row>

        {order ? (
          <>
            {
              <OrderDetailsCard
                orderId={order._id}
                productName={order.productName}
                color={order.color}
                size={order.size}
                quantity={order.orderItems.length}
                shippingAddress={order.shippingAddress}
              />
            }
          </>
        ) : (
          <div
            style={{
              marginTop: "150px",
              marginBottom: "100vh",
              alignContent: "center",
              display: "flex",
            }}
          >
            <CircularProgress size={115} style={{ margin: "0px auto" }} />
          </div>
        )}
        {/* <ReviewBox product_id={id} /> */}
      </div>
    </div>
  );
}

export default OrderItemPage;
