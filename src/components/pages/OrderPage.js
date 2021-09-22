import React from "react";
import { useHistory } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Styles from "./OrderPage.module.css";
import { formatToNormalDate } from "../../services/dateManipulationFunctions.js";

import { LinearProgress } from "@material-ui/core";
import BoxSelector from "../general/BoxSelector";
import SearchInputField from "../general/SearchInputField.js";
import DateInputField from "../general/DateInputField.js";
import OrderItemLineHeader from "../orders/OrderItemLineHeader.js";
import OrderItemLine from "../orders/OrderItemLine.js";
import { getOrders, getOrder } from "../../api/orders.js";
import { convertDateToString } from "../../services/dateManipulationFunctions.js";

//import { getProducts } from "../../api/products.js";
//------------------------------------------------------------------------

function OrderPage(props) {
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "ZAR",
  });

  const history = useHistory();
  var [loading, setLoading] = React.useState(true);
  //  var [products, setProducts] = React.useState(null); //remove
  var [orders, setOrders] = React.useState(null);
  var [error, setError] = React.useState(null);

  //Selectors
  var [showAll, setShowAll] = React.useState(true);
  var [showNew, setShowNew] = React.useState(false);
  var [showPaid, setShowPaid] = React.useState(false);
  var [showNotPaid, setShowNotPaid] = React.useState(false);
  var [showShipped, setShowShipped] = React.useState(false);
  var [showNotShipped, setShowNotShipped] = React.useState(false);
  var [showDelivered, setShowDelivered] = React.useState(false);
  var [showNotDelivered, setShowNotDelivered] = React.useState(false);
  var [showCancelled, setShowCancelled] = React.useState(false);
  var [showNotCancelled, setShowNotCancelled] = React.useState(false);
  var [orderId, setOrderId] = React.useState("");
  var [date, setDate] = React.useState(formatToNormalDate(new Date()));

  // var [showVisible, setShowVisible] = React.useState(false); //remove
  // var [showHidden, setShowHidden] = React.useState(false); //remove
  // var [productId, setProductId] = React.useState("");  //here
  // var [productName, setProductName] = React.useState("");

  var [search, setSearch] = React.useState({
    searchBy: "DATE",
    value: new Date().toISOString(),
  });

  React.useEffect(() => {
    getOrdersMade(search.searchBy, search.value);
    setSelected(search);
  }, [search]);

  function setSelected(search) {
    switch (search.searchBy) {
      case "ALL":
        setShowAll(true);
        setShowPaid(false);
        setShowNotPaid(false);
        setShowShipped(false);
        setShowNotShipped(false);
        setShowDelivered(false);
        setShowNotDelivered(false);
        setShowCancelled(false);
        setShowNotCancelled(false);
        setOrderId("");
        setDate("");
        break;

      case "PAID":
        setShowAll(false);
        setShowPaid(search.value);
        setShowNotPaid(!search.value);
        setShowShipped(false);
        setShowNotShipped(false);
        setShowDelivered(false);
        setShowNotDelivered(false);
        setShowCancelled(false);
        setShowNotCancelled(false);
        setOrderId("");
        setDate("");
        break;

      case "SHIPPED":
        setShowAll(false);
        setShowPaid(false);
        setShowNotPaid(false);
        setShowShipped(search.value);
        setShowNotShipped(!search.value);
        setShowDelivered(false);
        setShowNotDelivered(false);
        setShowCancelled(false);
        setShowNotCancelled(false);
        setOrderId("");
        setDate("");
        break;

      case "DELIVERED":
        setShowAll(false);
        setShowPaid(false);
        setShowNotPaid(false);
        setShowShipped(false);
        setShowNotShipped(false);
        setShowDelivered(search.value);
        setShowNotDelivered(!search.value);
        setShowCancelled(false);
        setShowNotCancelled(false);
        setOrderId("");
        setDate("");
        break;

      case "CANCELLED":
        setShowAll(false);
        setShowPaid(false);
        setShowNotPaid(false);
        setShowShipped(false);
        setShowNotShipped(false);
        setShowDelivered(false);
        setShowNotDelivered(false);
        setShowCancelled(search.value);
        setShowNotCancelled(!search.value);
        setOrderId("");
        setDate("");
        break;

      case "ORDERID":
        setShowAll(false);
        setShowPaid(false);
        setShowNotPaid(false);
        setShowShipped(false);
        setShowNotShipped(false);
        setShowDelivered(false);
        setShowNotDelivered(false);
        setShowCancelled(false);
        setShowNotCancelled(false);
        setDate("");
        break;

      case "DATE":
        setShowAll(false);
        setShowPaid(false);
        setShowNotPaid(false);
        setShowShipped(false);
        setShowNotShipped(false);
        setShowDelivered(false);
        setShowNotDelivered(false);
        setShowCancelled(false);
        setShowNotCancelled(false);
        setOrderId("");
        break;

      default:
        setShowAll(true);
        setShowPaid(false);
        setShowNotPaid(false);
        setShowShipped(false);
        setShowNotShipped(false);
        setShowDelivered(false);
        setShowNotDelivered(false);
        setShowCancelled(false);
        setShowNotCancelled(false);
        setOrderId("");
        setDate("");
        break;
    }
  }

  // React.useEffect(() => {
  //   getProductInventory(search.searchBy, search.value);
  //   setSelected(search);
  // }, [search]);

  // function setSelected(search) {
  //   switch (search.searchBy) {
  //     case "ALL":
  //       setShowAll(true);
  //       setShowNew(false);
  //       setShowVisible(false);
  //       setShowHidden(false);
  //       setProductId("");
  //       setProductName("");
  //       break;
  //     case "NEW":
  //       setShowAll(false);
  //       setShowNew(true);
  //       setShowVisible(false);
  //       setShowHidden(false);
  //       setProductId("");
  //       setProductName("");
  //       break;
  //     case "VISIBILITY":
  //       if (search.value === true) {
  //         setShowAll(false);
  //         setShowNew(false);
  //         setShowVisible(true);
  //         setShowHidden(false);
  //         setProductId("");
  //         setProductName("");
  //       } else {
  //         setShowAll(false);
  //         setShowNew(false);
  //         setShowVisible(false);
  //         setShowHidden(true);
  //         setProductId("");
  //         setProductName("");
  //       }
  //       break;
  //     case "PRODUCTID":
  //       setShowAll(false);
  //       setShowNew(false);
  //       setShowVisible(false);
  //       setShowHidden(false);
  //       setProductName("");
  //       break;

  //     case "SEARCH":
  //       setShowAll(false);
  //       setShowNew(false);
  //       setShowVisible(false);
  //       setShowHidden(false);
  //       setProductId("");
  //       break;
  //     default:
  //       setShowAll(false);
  //       setShowNew(false);
  //       setShowVisible(false);
  //       setShowHidden(false);
  //   }
  // }

  // React.useEffect(() => {
  //   getProductInventory(search.searchBy, search.value);
  // }, [search]);

  React.useEffect(() => {
    getOrdersMade(search.searchBy, search.value);
  }, [search]);

  async function getOrdersMade(searchBy, value) {
    setOrders(null); //clear already exisitng orders
    setLoading(true); //should load
    setError(null); // if there was an error, it should not be there
    // Search Instructions
    //Search by order id - set searchby = "ORDERID"
    // Search orders shipped (showShipped) - set searchby = SHIPPED
    // Search orders canceled (showCancalled) - set searchby = CANCELLED
    // Search orders delivered(showDelivered) - set searchby = DELIVERED
    // Search for New Products - Set searchBy = "NEW" & set Value to ""

    var getOrdersResult = await getOrders(searchBy, value);
    setLoading(false); //signal that awaut getOrders has worked

    if (getOrdersResult.ok) {
      setOrders(getOrdersResult.data);
      console.log("Worked");
      console.log(getOrdersResult);
    } else {
      setError(getOrdersResult);
      console.log("Failed");
      console.log(getOrdersResult);
    }

    //----------------
    // // THe search query must be supplied using the "value" parameter
    // setProducts(null);
    // setError(null);
    // setLoading(true);
    // var getProductsResult = await getProducts({
    //   searchBy: searchBy,
    //   value: value,
    // });

    // if (getProductsResult.ok === true) {
    //   //Getting Products Failed
    //   setLoading(false);
    //   setError(null);
    //   setProducts(getProductsResult.data);
    // } else {
    //   //Getting Products Failed
    //   setProducts(null);
    //   setLoading(false);
    //   setError(getProductsResult);
    // }
    //---------------------

    // THe search query must be supplied using the "value" parameter
    //  setOrders(null);
    //  setError(null);
    //  setLoading(true);
    //  var getOrderResult = await getOrders({ //from the API
    //    searchBy: searchBy,
    //    value: value,
    //  });

    //  if (getOrderResult.ok === true) {
    //    //Getting Orders Failed
    //    setLoading(false);
    //    setError(null);
    //    setOrders(getOrderResult.data);
    //  } else {
    //    //Getting Orders Failed
    //    setOrders(null);
    //    setLoading(false);
    //    setError(getOrderResult);
    //  }
  }

  return (
    <div className={Styles.InventoryPageCard}>
      <Row>
        <Row>
          <Col>
            <p className={Styles.InventoryBanner}>Orders</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <hr className={Styles.Divider} />
          </Col>
        </Row>
        <Row>
          <Col>
            {" "}
            <BoxSelector
              label="All"
              selected={showAll}
              select={() => {
                setSearch({ searchBy: "ALL", value: "" });
              }}
            />
            <BoxSelector
              label="Paid"
              selected={showPaid}
              select={() => {
                setSearch({ searchBy: "PAID", value: true });
              }}
            />
            <BoxSelector
              label="Not Paid"
              selected={showNotPaid}
              select={() => {
                setSearch({ searchBy: "PAID", value: false });
              }}
            />
            <BoxSelector
              label="Shipped"
              selected={showShipped}
              select={() => {
                setSearch({ searchBy: "SHIPPED", value: true });
              }}
            />
            <BoxSelector
              label="Not Shipped"
              selected={showNotShipped}
              select={() => {
                setSearch({ searchBy: "SHIPPED", value: false });
              }}
            />
            <BoxSelector
              label="Delivered"
              selected={showDelivered}
              select={() => {
                setSearch({ searchBy: "DELIVERED", value: true });
              }}
            />
            <BoxSelector
              label="Not Delivered"
              selected={showNotDelivered}
              select={() => {
                setSearch({ searchBy: "DELIVERED", value: false });
              }}
            />
            <BoxSelector
              label="Cancelled"
              selected={showCancelled}
              select={() => {
                setSearch({ searchBy: "CANCELLED", value: true }); //FIX HERE
              }}
            />
            <BoxSelector
              label="Not Cancelled"
              selected={showNotCancelled}
              select={() => {
                setSearch({ searchBy: "CANCELLED", value: false }); //FIX HERE
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            {" "}
            <SearchInputField
              value={orderId}
              placeHolderText="Search By Order ID" //FIX HERE
              onChange={(value) => {
                setOrderId(value);
                setSearch({ searchBy: "ORDERID", value: value });
              }}
            />
            <DateInputField
              value={date}
              placeHolderText="Date" //FIX HERE
              onChange={(value) => {
                if (value !== "") {
                  console.log(value);
                  setDate(value);
                  var ISOString = new Date(value).toISOString();

                  setSearch({
                    searchBy: "DATE",
                    value: ISOString,
                  });
                } else {
                  setDate(value);
                  setSearch({ searchBy: "ALL", value: "" });
                }
              }}
            />
          </Col>
        </Row>
      </Row>
      <Row className={Styles.InventoryPageBody}>
        <OrderItemLineHeader />

        {/* {error && <p>{error.message}</p>}
        {loading && <LinearProgress />}

        {products &&
          products.map((product) => {
            return ( */}
        {/* <InventoryItemLine
                productId={product._id}
                productName={product.productName}
                brand={product.brand}
                sellingPrice={product.sellingPrice}
                visibility={product.showProduct}
                pushToProductPage={() => {
                  history.push("/inventory/" + product._id);
                }}
              /> */}

        {error && <p>{error.message}</p>}
        {loading && <LinearProgress />}

        {orders &&
          orders.map((order) => {
            var totalCost = 0;

            order.orderItems.forEach((element) => {
              totalCost = totalCost + element.sellingPriceAmount;
            });
            return (
              <OrderItemLine
                orderId={order._id}
                quantity={order.orderItems.length}
                totalCost={formatter.format(totalCost)}
                paymentComplete={order.paymentComplete}
                hasShipped={order.hasShipped}
                hasBeenDelivered={order.hasBeenDelivered}
                isCancelled={order.isCancelled}
                date={convertDateToString(order.createdAt)} //make function
                //puts what the function returns

                pushToOrderPage={() => {
                  history.push("/orders/" + order._id);
                }}
              />
            );
          })}
      </Row>
    </div>
  );
}

export default OrderPage;
