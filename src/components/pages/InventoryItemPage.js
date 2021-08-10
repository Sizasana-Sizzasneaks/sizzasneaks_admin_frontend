import React from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../../api/products.js";

function InventoryItemPage(props) {
  var { id } = useParams();
  var [product, setProduct] = React.useState(null);

  React.useEffect(() => {
    getProductItem(id);
  }, []);

  async function getProductItem(product_id) {
    if (typeof product_id !== "undefined") {
      var getProductResult = await getProduct(product_id);

      if (getProductResult.ok === true) {
        //Product Item is at index 0 of date 
        console.log(getProductResult.data[0]);
      } else {
        console.log(getProductResult);
      }
    } else {
      console.log("Product Id is Undefined");
    }
  }

  return (
    <div>
      <p>Inventory Item Page</p>
      {/* <p>{products && products}</p> */}
    </div>
  );
}

export default InventoryItemPage;
