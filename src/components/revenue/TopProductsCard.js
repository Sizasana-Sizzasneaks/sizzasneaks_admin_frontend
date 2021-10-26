import React from "react";
import Styles from "./TopProductsCard.module.css";
import { CircularProgress } from "@material-ui/core";
import { Row, Col } from "react-bootstrap";

import * as Revenue from "../../api/revenue.js";
import { useHistory } from "react-router-dom";

function TopProductsCard() {
  let history = useHistory();
  let [loadingTopProducts, setLoadingTopProducts] = React.useState(false);
  let [topProducts, setTopProducts] = React.useState(null);
  let [topProductsError, setTopProductsError] = React.useState(null);

  React.useEffect(() => {
    getTopProducts();
  }, []);

  async function getTopProducts() {
    setLoadingTopProducts(true);
    setTopProducts(null);
    setTopProductsError(null);

    //Get Top Products
    var getTopProductsResult = await Revenue.getTopProducts();

    setLoadingTopProducts(false);
    if (getTopProductsResult.ok) {
      setTopProducts(getTopProductsResult.data);
    } else {
      setTopProductsError(getTopProductsResult);
    }
    console.log(getTopProductsResult);
  }

  return (
    <div className={Styles.Card}>
      {loadingTopProducts && (
        <div className={Styles.LoadingBox}>
          <CircularProgress size={90} />
        </div>
      )}

      {topProducts && (
        <div className="TopProductsBox">
          <Row className={Styles.Header}>
            <p>Top Products</p>
          </Row>
          <Row className={Styles.RecordHeader}>
            <Col xl={2} style={{ padding: "0px" }}>
              <p>No.</p>
            </Col>
            <Col xl={6} style={{ padding: "0px" }}>
              <p>Product Name</p>
            </Col>
            <Col xl={4} style={{ padding: "0px", textAlign: "right" }}>
              <p>Units Sold</p>
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
          {topProducts.map((product, index) => {
            return (
              <Row>
                <Row
                  className={Styles.Record}
                  onClick={() => {
                    history.push("/inventory/" + product.productId);
                  }}
                >
                  <Col xl={2} style={{ padding: "0px" }}>
                    <p>{index}</p>
                  </Col>
                  <Col xl={6} style={{ padding: "0px" }}>
                    <p>{product.productName}</p>
                  </Col>
                  <Col xl={4} style={{ padding: "0px", textAlign: "right" }}>
                    <p>{product.quantity}</p>
                  </Col>
                </Row>
                <Row>
                  <hr
                    style={{
                      marginTop: "0px",
                      marginBottom: "0px",
                      borderStyle: "solid",
                      borderColor: "black",
                    }}
                  />
                </Row>
              </Row>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default TopProductsCard;
