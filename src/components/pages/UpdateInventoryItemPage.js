import React from "react";
import { useParams } from "react-router-dom";
import { getProduct, updateProduct } from "../../api/products.js";

//Procedure
//1. First set product available to False
//2. Then get product and check if availability is false
//3. if availability is true - Loop back to Step 1 (Count this loop and stop looping after three tries then display error message)
//4. if availability is false - display product details in relevant fields and allow user to begin product editing.
//5. Allow user to edit product fields, and send new product data
//6. If update Unsuccesfull display Error Message and let user try again.
//7. if Update is succesfull or Discarded - make product available.
//8 Push To Inventory Display Page

function UpdateInventoryItemPage(props) {
  var { id } = useParams();

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

  // Set Product Availability - set available to true or false
  async function changeProductAvailabilityState(product_id, available) {
    if (typeof product_id !== "undefined" && typeof available !== "undefined") {
      var updateProductResult = await updateProduct(product_id, {
        available: available,
      });

      if (updateProductResult.ok === true) {
        console.log("Product Availability Changed");
        console.log(updateProductResult);
      } else {
        console.log(updateProductResult);
      }
    } else {
      console.log("Product Id is Undefined");
    }
  }

  async function updateInventoryItem(product_id) {
    // Make sure all input validation is true then build product data for sending
    // Remember - Mongoose adds _id field for all objects added through the mongoose api - antisipate that change and if it really has any effect on the data

    // var product = {
    //     productName: "Nike Changed",
    //     productDescription: "Best Shoe Changed",
    //     brand: "Nike Changed",
    //     categories: ["Chnaged WOMEN","Changed"],
    //     options: [
    //       {
    //         color: "Changed",
    //         variants: [
    //           {
    //             size: 10,
    //             quantity: 0,
    //           },
    //           {
    //             size: 10,
    //             quantity: 0,
    //           }, {
    //             size: 100,
    //             quantity: 10,
    //           }
    //         ],
    //       },
    //       {
    //         color: "Changed",
    //         variants: [
    //           {
    //             size: 10,
    //             quantity: 0,
    //           },
    //           {
    //             size: 10,
    //             quantity: 0,
    //           },
    //         ],
    //       },
    //       {
    //         color: "ChangedNEW",
    //         variants: [
    //           {
    //             size: 10,
    //             quantity: 0,
    //           },
    //           {
    //             size: 10,
    //             quantity: 0,
    //           },
    //         ],
    //       }
    //     ],
    //     imgURls: [
    //       "https://firebasestorage.googleapis.com/v0/b/sizasana-ecommerce-platform.appspot.com/o/products%2F6101340adc7a0305bc700014%2FShadow%201.png?alt=media&token=7e5ce264-316a-423f-bcf5-bc78633717f8",
    //         "Changed"
    //     ],
    //     showProduct: false, // was true
    //     supplierTaxAmount: 2500,
    //     supplierCost: 2500,
    //     sellingPriceTaxAmount: 2500,
    //     sellingPrice: 2500,
    //     applicableTax: ["ChangedVAT", "Changed"],
    //   };


    if (typeof product_id !== "undefined") {
      var updateProductResult = await updateProduct(
        "6112ebcb3b62871a50e8b8ab",
        {} //put productData
      );

      if (updateProductResult.ok === true) {
        console.log("Product Succesfull Updated");
        console.log(updateProductResult);
      } else {
        console.log(updateProductResult);
      }
    } else {
      console.log("Product Id is Undefined");
    }
  }

  return <p>Update Inventory Item Page</p>;
}

export default UpdateInventoryItemPage;

// Tempelet Opject Of Product - To be used when constructing product
// var product = {
//     productName: "Nike Something Something Copy",
//     productDescription: "Best Shoe in the World",
//     brand: "Nike",
//     categories: ["WOMEN"],
//     options: [
//       {
//         color: "Blue",
//         variants: [
//           {
//             size: 7,
//             quantity: 30,
//           },
//           {
//             size: 6,
//             quantity: 52,
//           },
//         ],
//       },
//       {
//         color: "Red",
//         variants: [
//           {
//             size: 6,
//             quantity: 45,
//           },
//           {
//             size: 3,
//             quantity: 23,
//           },
//         ],
//       },
//     ],
//     imgURls: [
//       "https://firebasestorage.googleapis.com/v0/b/sizasana-ecommerce-platform.appspot.com/o/products%2F6101340adc7a0305bc700014%2FShadow%201.png?alt=media&token=7e5ce264-316a-423f-bcf5-bc78633717f8",
//       "https://firebasestorage.googleapis.com/v0/b/sizasana-ecommerce-platform.appspot.com/o/products%2F6101340adc7a0305bc700014%2FShadow%202.png?alt=media&token=51225378-afc4-4188-aa28-18905940b56a",
//       "https://firebasestorage.googleapis.com/v0/b/sizasana-ecommerce-platform.appspot.com/o/products%2F6101340adc7a0305bc700014%2FShadow%203.png?alt=media&token=d1465212-6617-499a-bf90-b56710879ec0",
//       "https://firebasestorage.googleapis.com/v0/b/sizasana-ecommerce-platform.appspot.com/o/products%2F6101340adc7a0305bc700014%2FShadow%204.png?alt=media&token=858607e9-30d0-41d3-92fb-d3dfb9834f02",
//     ],
//     showProduct: true,
//     supplierTaxAmount: 199.99,
//     supplierCost: 799.99,
//     sellingPriceTaxAmount: 292.3,
//     sellingPrice: 2399,
//     applicableTax: ["VAT"],
//   };
