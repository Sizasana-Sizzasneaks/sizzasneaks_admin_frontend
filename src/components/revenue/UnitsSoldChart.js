import React from "react";
import Styles from "./UnitsSoldChart.module.css";
import { Row } from "react-bootstrap";
import {
  BarChart,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Bar,
  Tooltip,
  Legend,
  Label,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { CircularProgress } from "@material-ui/core";
import { monthNames } from "../../services/dateManipulationFunctions";

import * as Revenue from "../../api/revenue.js";

function UnitsSoldChart() {
  let [loadingUnitsSoldChart, setLoadingUnitsSoldChart] = React.useState(false);
  let [unitsSold, setUnitsSold] = React.useState(null);
  let [unitsSoldError, setUnitsSoldError] = React.useState(null);

  React.useEffect(() => {
    getUnitsSold();
  }, []);

  function prepareUnitsSold(unitsSoldArray) {
    for (let month of unitsSoldArray) {
      month.name = monthNames[month.month];
    }
    return unitsSoldArray;
  }

  async function getUnitsSold() {
    setLoadingUnitsSoldChart(true);
    setUnitsSold(null);
    setUnitsSoldError(null);

    let getUnitsSoldResult = await Revenue.getUnitsSold();

    setLoadingUnitsSoldChart(false);
    if (getUnitsSoldResult.ok) {
      console.log(getUnitsSoldResult);
      setUnitsSold(prepareUnitsSold(Object.values(getUnitsSoldResult.data)));
    } else {
      console.log(getUnitsSoldResult);
      setUnitsSoldError(getUnitsSoldResult);
    }
  }

  return (
    <div className={Styles.Card}>
      {loadingUnitsSoldChart && (
        <div className={Styles.LoadingBox}>
          <CircularProgress size={110} />
        </div>
      )}

      {unitsSoldError && (
        <div className={Styles.ErrorBox}>
          <div className={Styles.InnerErrorBox}>
            <span
              class="material-icons"
              style={{
                color: "red",
                display: "block",
                fontSize: "110px",
                marginBottom: "10px",
              }}
            >
              error
            </span>

            <p>{unitsSoldError.message}</p>
          </div>
        </div>
      )}
      {unitsSold && (
        <Row className={Styles.Header}>
          <p>Product Units Sold</p>
         
        </Row>
      )}

      {unitsSold && (
        <ResponsiveContainer width="95%" height="90%">
          <BarChart
            data={unitsSold}
            margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="6 6" />
            <XAxis dataKey="name">
              <Label value="Month" height={30} offset={0} position="bottom" />
            </XAxis>

            <YAxis>
              {" "}
              <Label
                value="Products Sold"
                offset={1}
                angle={-90}
                position="left"
              />
            </YAxis>
            <Legend offset={0} align="right" />
            <Tooltip />
            <Bar
              type="monotone"
              dataKey="quantity"
              name="Units Sold"
              fill="#007bff"
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default UnitsSoldChart;
