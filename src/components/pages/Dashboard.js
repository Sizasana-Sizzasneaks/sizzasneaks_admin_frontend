import React from "react";
import Styles from "./Dashboard.module.css";
import { Row, Col } from "react-bootstrap";
import { CircularProgress } from "@material-ui/core";

import UnitsSoldChart from "../revenue/UnitsSoldChart";
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
        <UnitsSoldChart/>
      </Col>

      <Col xl={4} style={{ paddingLeft: "0px", paddingRight: "0px" }}>
        <TopProductsCard />
      </Col>
    </Row>
  );
}

export default Dashboard;
