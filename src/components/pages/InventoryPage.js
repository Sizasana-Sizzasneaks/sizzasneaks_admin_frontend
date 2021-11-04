import React from "react";
import { useHistory } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Styles from "./InventoryPage.module.css";

import { LinearProgress } from "@material-ui/core";
import BoxSelector from "../general/BoxSelector";
import SearchInputField from "../general/SearchInputField";
import InventoryItemLineHeader from "../inventory/InventoryItemLineHeader.js";
import InventoryItemLine from "../inventory/InventoryItemLine.js";
import { getProducts } from "../../api/products.js";

function InventoryPage(props) {
  const history = useHistory();
  var [loading, setLoading] = React.useState(true);
  var [products, setProducts] = React.useState(null);
  var [error, setError] = React.useState(null);

  //Selectors
  var [showAll, setShowAll] = React.useState(true);
  var [showNew, setShowNew] = React.useState(false);
  var [showVisible, setShowVisible] = React.useState(false);
  var [showHidden, setShowHidden] = React.useState(false);
  var [productId, setProductId] = React.useState("");
  var [productName, setProductName] = React.useState("");

  var [search, setSearch] = React.useState({
    searchBy: "",
    value: "",
  });

  React.useEffect(() => {
    getProductInventory(search.searchBy, search.value);
    setSelected(search);
  }, [search]);

  function setSelected(search) {
    switch (search.searchBy) {
      case "ALL":
        setShowAll(true);
        setShowNew(false);
        setShowVisible(false);
        setShowHidden(false);
        setProductId("");
        setProductName("");
        break;
      case "NEW":
        setShowAll(false);
        setShowNew(true);
        setShowVisible(false);
        setShowHidden(false);
        setProductId("");
        setProductName("");
        break;
      case "VISIBILITY":
        if (search.value === true) {
          setShowAll(false);
          setShowNew(false);
          setShowVisible(true);
          setShowHidden(false);
          setProductId("");
          setProductName("");
        } else {
          setShowAll(false);
          setShowNew(false);
          setShowVisible(false);
          setShowHidden(true);
          setProductId("");
          setProductName("");
        }
        break;
      case "PRODUCTID":
        setShowAll(false);
        setShowNew(false);
        setShowVisible(false);
        setShowHidden(false);
        setProductName("");
        break;

      case "SEARCH":
        setShowAll(false);
        setShowNew(false);
        setShowVisible(false);
        setShowHidden(false);
        setProductId("");
        break;
      default:
        setShowAll(false);
        setShowNew(false);
        setShowVisible(false);
        setShowHidden(false);
    }
  }

  React.useEffect(() => {
    getProductInventory(search.searchBy, search.value);
  }, [search]);

  async function getProductInventory(searchBy, value) {
    // Search Instructions
    // Search by Product_id - Set searchBy = "PRODUCTID"
    // Search by visibility(showProduct) - Set searchBy = "VISIBILITY"
    // Search by productName - Set searchBy = "SEARCH"
    // Search for New Products - Set searchBy = "NEW" & set Value to ""

    // THe search query must be supplied using the "value" parameter
    setProducts(null);
    setError(null);
    setLoading(true);
    var getProductsResult = await getProducts({
      searchBy: searchBy,
      value: value,
    });

    if (getProductsResult.ok === true) {
      //Getting Products Failed
      setLoading(false);
      setError(null);
      setProducts(getProductsResult.data);
    } else {
      //Getting Products Failed
      setProducts(null);
      setLoading(false);
      setError(getProductsResult);
    }
  }

  return (
    <div className={Styles.InventoryPageCard}>
      <Row>
        <Row>
          <Col>
            <p className={Styles.InventoryBanner}>Inventory</p>
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
              label="New"
              selected={showNew}
              select={() => {
                setSearch({ searchBy: "NEW", value: "" });
              }}
            />
            <BoxSelector
              label="Visible"
              selected={showVisible}
              select={() => {
                setSearch({ searchBy: "VISIBILITY", value: true });
              }}
            />
            <BoxSelector
              label="Hidden"
              selected={showHidden}
              select={() => {
                setSearch({ searchBy: "VISIBILITY", value: false });
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            {" "}
            <SearchInputField
              value={productId}
              placeHolderText="Search By Product ID"
              onChange={(value) => {
                setProductId(value);
                setSearch({ searchBy: "PRODUCTID", value: value });
              }}
            />
            <SearchInputField
              value={productName}
              placeHolderText="Search By Product Name"
              onChange={(value) => {
                setProductName(value);
                setSearch({ searchBy: "SEARCH", value: value });
              }}
            />
          </Col>
        </Row>
      </Row>
      <Row className={Styles.InventoryPageBody}>
        <InventoryItemLineHeader />
        {error && <p style={{ fontSize: "16px", color:"red" }}>{error.message}</p>}
        {loading && <LinearProgress />}
        {products &&
          products.map((product) => {
            return (
              <InventoryItemLine
                productId={product._id}
                productName={product.productName}
                brand={product.brand}
                sellingPrice={product.sellingPrice}
                visibility={product.showProduct}
                pushToProductPage={() => {
                  history.push("/inventory/" + product._id);
                }}
              />
            );
          })}
      </Row>
    </div>
  );
}

export default InventoryPage;
