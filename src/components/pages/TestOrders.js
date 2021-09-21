import React from "react";

import { getOrders, getOrder } from "../../api/orders.js";

function TestOrders() {
  React.useEffect(() => {
   // retrieveOrders("DATE", new Date("2021-09-15T09:17:08.817+00:00"));

    //retrieveOrder();
  }, []);


  async function retrieveOrders(searchBy, value) {
    var getOrdersResult = await getOrders(searchBy, value);

    if (getOrdersResult.ok) {
      console.log("Worked");
      console.log(getOrdersResult);
    } else {
      console.log("Failed");
      console.log(getOrdersResult);
    }
  }

  async function retrieveOrder() {
    var getOrderResult = await getOrder("614891b4935a1001e071cb2b");

    if (getOrderResult.ok) {
      console.log("Worked");
      console.log(getOrderResult);
    } else {
      console.log("Failed");
      console.log(getOrderResult);
    }
  }

  return (
    <div>
      <p>Test Order</p>
    </div>
  );
}

export default TestOrders;
