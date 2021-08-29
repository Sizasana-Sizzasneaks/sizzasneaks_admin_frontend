import React from "react";

import EditProductDetailsCard from "../inventory/EditProductDetailsCard.js";
import EditProductDataCard from "../inventory/EditProductDataCard.js";

import { createProduct } from "../../api/products.js";
function InventoryCreatePage(props) {
  // State
  //Product Name State
  var [productName, setProductName] = React.useState(null);
  var [productNameError, setProductNameError] = React.useState(null);

  //Brand State
  var [brand, setBrand] = React.useState(null);
  var [brandError, setBrandError] = React.useState(null);

  //visibility State
  var [visibility, setVisibility] = React.useState(null);
  var [visibilityError, setVisibilityError] = React.useState(null);

  //Categories State
  var [categories, setCategories] = React.useState({
    women: false,
    men: false,
    kids: false,
  });
  var [categoriesError, setCategoriesError] = React.useState(null);

  //Supplier Cost State
  var [supplierCost, setSupplierCost] = React.useState(null);
  var [supplierCostError, setSupplierCostError] = React.useState(null);

  //Supplier Tax State
  var [supplierTax, setSupplierTax] = React.useState(null);
  var [supplierTaxError, setSupplierTaxError] = React.useState(null);

  //Selling Price State
  var [sellingPrice, setSellingPrice] = React.useState(null);
  var [sellingPriceError, setSellingPriceError] = React.useState(null);

  //Selling Tax State
  var [sellingTax, setSellingTax] = React.useState(null);
  var [sellingTaxError, setSellingTaxError] = React.useState(null);

  //Product Description
  var [productDescription, setProductDescription] = React.useState(null);
  var [productDescriptionError, setProductDescriptionError] =
    React.useState(null);

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
      available: true,
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
      <EditProductDetailsCard
        //ProductName
        productName={productName}
        setProductName={setProductName}
        productNameError={productNameError}
        setProductNameError={setProductNameError}
        //Brand
        brand={brand}
        setBrand={setBrand}
        brandError={brandError}
        setBrandError={setBrandError}
        //Visibility
        visibility={visibility}
        setVisibility={setVisibility}
        visibilityError={visibilityError}
        setVisibilityError={setVisibilityError}
        //Categories
        categories={categories}
        setCategories={(change) => {
          setCategories({ ...categories, ...change });
        }}
        categoriesError={categoriesError}
        setCategoriesError={setCategoriesError}
        //Selling Price
        sellingPrice={sellingPrice}
        setSellingPrice={setSellingPrice}
        sellingPriceError={sellingPriceError}
        setSellingPriceError={setSellingPriceError}
        //Selling Tax
        sellingTax={sellingTax}
        setSellingTax={setSellingTax}
        sellingTaxError={sellingTaxError}
        setSellingTaxError={setSellingTaxError}
        //Supplier Cost
        supplierCost={supplierCost}
        setSupplierCost={setSupplierCost}
        supplierCostError={supplierCostError}
        setSupplierCostError={setSupplierCostError}
        //Supplier Tax
        supplierTax={supplierTax}
        setSupplierTax={setSupplierTax}
        supplierTaxError={supplierTaxError}
        setSupplierTaxError={setSupplierTaxError}
      />
      <EditProductDataCard
        //Product Description
        productDescription={productDescription}
        setProductDescription={setProductDescription}
        productDescriptionError={productDescriptionError}
        setProductDescriptionError={setProductDescriptionError}
      />
    </div>
  );
}

export default InventoryCreatePage;
