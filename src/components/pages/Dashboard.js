import React from "react";
import Styles from "./Dashboard.module.css";
import { Row, Col } from "react-bootstrap";
import { CircularProgress } from "@material-ui/core";

import TopProductsCard from "../revenue/TopProductsCard.js";

function Dashboard() {
  let [loadingRevenueChart, setLoadingRevenueChart] = React.useState(false);

  React.useEffect(() => {
    //getRevenueData();
  }, []);

  function getRevenueData() {
    //Get Revenue Data
  }

  return (
    <Row className={Styles.EntirePage}>
      <Col xl={8} style={{ paddingLeft: "0px", paddingRight: "50px" }}>
        <div className={Styles.Card}>
          {loadingRevenueChart && (
            <div className={Styles.LoadingBox}>
              <CircularProgress size={110} />
            </div>
          )}
        </div>
      </Col>

      <Col xl={4} style={{ paddingLeft: "0px", paddingRight: "0px" }}>
        <TopProductsCard />
      </Col>
    </Row>
  );
}

export default Dashboard;
