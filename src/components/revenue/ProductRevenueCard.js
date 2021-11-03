import React from "react";
import Styles from "./ProductRevenueCard.module.css";
import { Row, Col } from "react-bootstrap";
import { CircularProgress } from "@material-ui/core";

import * as Revenue from "../../api/revenue.js";
import { monthNames } from "../../services/dateManipulationFunctions.js";

function ProductRevenueCard(props) {
  let [loadingProductRevenue, setLoadingProductRevenue] = React.useState(true);
  let [productRevenue, setProductRevenue] = React.useState(null);
  let [productRevenueError, setProductRevenueError] = React.useState(null);

  React.useEffect(() => {
    getProductRevenue();
  }, []);

  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "ZAR",
  });

  async function getProductRevenue() {
    setLoadingProductRevenue(true);
    setProductRevenue(null);
    setProductRevenueError(null);

    //Get Top Products
    var getProductRevenueResult = await Revenue.getProductRevenue(
      props.product_id
    );

    setLoadingProductRevenue(false);
    if (getProductRevenueResult.ok) {
      console.log(Object.values(getProductRevenueResult.data));
     
      setProductRevenue(Object.values(getProductRevenueResult.data));
    } else {
      console.log(getProductRevenueResult);
      setProductRevenueError(getProductRevenueResult);
    }
  }

  return (
    <Row className={Styles.ProductRevenueCard}>
      {loadingProductRevenue && (
        <div className={Styles.LoadingBox}>
          <CircularProgress size={60} />
        </div>
      )}
      {productRevenueError && (
        <div className={Styles.ErrorBox}>
          <div className={Styles.InnerErrorBox}>
            <span
              class="material-icons"
              style={{
                color: "red",
                display: "block",
                fontSize: "80px",
                marginBottom: "10px",
              }}
            >
              error
            </span>

            <p>{productRevenueError.message}</p>
          </div>
        </div>
      )}
      {productRevenue && (
        <>
          <Row className={Styles.RecordHeader}>
            <Col xl={3} style={{ padding: "0px" }}>
              <p>Month</p>
            </Col>
            <Col xl={3} style={{ padding: "0px" }}>
              <p>Units Sold</p>
            </Col>
            <Col xl={3} style={{ padding: "0px" }}>
              <p>Product Revenue</p>
            </Col>
            <Col xl={3} style={{ padding: "0px", textAlign: "right" }}>
              <p>Product Profit</p>
            </Col>

            <hr
              style={{
                marginTop: "5px",
                marginBottom: "0px",
                borderStyle: "solid",
                borderColor: "black",
                height: "2px",
              }}
            />
          </Row>

          {productRevenue.map((month) => {
            return (
              <Row className={Styles.Record}>
                <Col xl={3} style={{ padding: "0px" }}>
                  <p>{monthNames[month.month]}</p>
                </Col>
                <Col xl={3} style={{ padding: "0px" }}>
                  <p>{month.quantity}</p>
                </Col>
                <Col xl={3} style={{ padding: "0px" }}>
                  <p>{formatter.format(month.revenue)}</p>
                </Col>
                <Col xl={3} style={{ padding: "0px", textAlign: "right" }}>
                  <p>{formatter.format(month.profit)}</p>
                </Col>

                <hr
                  style={{
                    marginTop: "5px",
                    marginBottom: "0px",
                    borderStyle: "solid",
                    borderColor: "black",
                    height: "2px",
                  }}
                />
              </Row>
            );
          })}
        </>
      )}
    </Row>
  );
}

export default ProductRevenueCard;
