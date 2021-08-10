import React from "react";
import { getProducts } from "../../api/products.js";

function InventoryPage(props) {
  var [products, setProducts] = React.useState(null);

  React.useEffect(() => {
    getProductInventory();
  }, []);

  async function getProductInventory() {
    // Search Instructions
    // Search by Product_id - Set searchBy = "PRODUCTID"
    // Search by visibility(showProduct) - Set searchBy = "VISIBILITY"
    // Search by productName - Set searchBy = "SEARCH"
    // Search for New Products - Set searchBy = "NEW" & set Value to ""

    // THe search query must be supplied using the "value" parameter

    var getProductsResult = await getProducts({
      searchBy: "SEARCH",
      value: "max",
    });

    if (getProductsResult.ok === true) {
      console.log(getProductsResult.data);
    } else {
      console.log(getProductsResult);
    }
  }

  return (
    <div>
      <p>Inventory Page</p>
      {/* <p>{products && products}</p> */}
    </div>
  );
}

export default InventoryPage;
