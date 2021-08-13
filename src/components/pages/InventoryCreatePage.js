import React from "react";

import { createProduct } from "../../api/products.js";
function InventoryCreatePage(props) {
  React.useEffect(() => {
    // createNewProduct();
  }, []);

  async function createNewProduct() {
    var product = {
      productName: "Nike Changed",
      productDescription: "Best Shoe Changed",
      brand: "Nike Changed",
      categories: ["Chnaged WOMEN", "Changed"],
      options: [
        {
          color: "Changed",
          variants: [
            {
              size: 10,
              quantity: 0,
            },
            {
              size: 10,
              quantity: 0,
            },
            {
              size: 100,
              quantity: 10,
            },
          ],
        },
        {
          color: "Changed",
          variants: [
            {
              size: 10,
              quantity: 0,
            },
            {
              size: 10,
              quantity: 0,
            },
          ],
        },
        {
          color: "ChangedNEW",
          variants: [
            {
              size: 10,
              quantity: 0,
            },
            {
              size: 10,
              quantity: 0,
            },
          ],
        },
      ],
      imgURls: [
        "https://firebasestorage.googleapis.com/v0/b/sizasana-ecommerce-platform.appspot.com/o/products%2F6101340adc7a0305bc700014%2FShadow%201.png?alt=media&token=7e5ce264-316a-423f-bcf5-bc78633717f8",
        "Changed",
      ],
      showProduct: false, // was true
      supplierTaxAmount: 2500,
      supplierCost: 2500,
      sellingPriceTaxAmount: 2500,
      sellingPrice: 2500,
      applicableTax: ["ChangedVAT", "Changed"],
      available: true
    };

    var createProductResult = await createProduct(product);

    if (createProductResult.ok === true) {
      console.log("Product Created");
    } else {
      console.log("Faliure To Create Product");
      console.log(createProductResult);
    }
  }

  return (
    <div>
      <p>Inventory Create Page</p>
    </div>
  );
}

export default InventoryCreatePage;
