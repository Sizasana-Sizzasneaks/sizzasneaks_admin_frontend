import React from "react";
import Styles from "./InventoryCreatePage.module.css";
import { Row } from "react-bootstrap";
import Button from "../general/Button.js";
import EditProductDetailsCard from "../inventory/EditProductDetailsCard.js";
import EditProductDataCard from "../inventory/EditProductDataCard.js";

import { createProduct } from "../../api/products.js";
import CircularProgress from "@material-ui/core/CircularProgress";
function InventoryCreatePage(props) {
  // State
  var [saveState, setSaveState] = React.useState(null);
  var [loading, setLoading] = React.useState(true);

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

  //Product Images
  var [productImages, setProductImages] = React.useState([]);

  //Product Images
  var [productOptions, setProductOptions] = React.useState([]);

  React.useEffect(() => {
    // createNewProduct();
  }, []);

  async function createNewProduct() {
    setSaveState(null);
    setLoading(true);
    var categoryData = prepareCategories();
    console.log(categoryData);
    var product = {
      productName: productName,
      productDescription: productDescription,
      brand: brand,
      categories: categoryData,
      options: productOptions,
      imgURls: productImages,
      showProduct: visibility, // was true
      supplierTaxAmount: supplierTax,
      supplierCost: supplierCost,
      sellingPriceTaxAmount: sellingTax,
      sellingPrice: sellingPrice,
      applicableTax: ["VAT"],
      available: true,
    };

    var createProductResult = await createProduct(product);

    if (createProductResult.ok === true) {
      console.log("Product Created");
      setLoading(false);
      setSaveState({ ok: true, message: "Product Created" });
    } else {
      setLoading(false);
      setSaveState(createProductResult);
      console.log("Failure To Create Product");
      console.log(createProductResult);
    }
  }

  function prepareCategories() {
    var categoriesArray = [];
    if (categories.men) {
      categoriesArray.push("MEN");
    }
    if (categories.women) {
      categoriesArray.push("WOMEN");
    }

    if (categories.kids) {
      categoriesArray.push("KIDS");
    }

    return categoriesArray;
  }

  return (
    <div>
      <Row className={Styles.EditButtonSegment}>
        <Button
          label="Save"
          styles={{
            backgroundColor: "#FADA35",
            marginLeft: "0px",
            width: "min-content",
          }}
          onClick={() => {
            // history.push("/inventory/update/" + id);
            createNewProduct();
          }}
        />
        <Button
          label="Discard"
          styles={{
            backgroundColor: "#E3E3E3",
            marginLeft: "20px",
            width: "min-content",
          }}
          onClick={() => {
            // history.push("/inventory/update/" + id);
          }}
        />
        {/* {loading && (
          <div>
            <CircularProgress
              variant="indeterminate"
              style={{ marginLeft: "20px" }}
              size={35}
            />
          </div>
        )} */}
        {saveState &&
          (saveState.ok ? (
            <p
              className={[
                Styles.SaveStateText,
                Styles.SaveStateTextSuccess,
              ].join(" ")}
            >
              {saveState.message}
            </p>
          ) : (
            <p
              className={[Styles.SaveStateText, Styles.SaveStateTextError].join(
                " "
              )}
            >
              Error:{saveState.message}
            </p>
          ))}
      </Row>
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
        //Product Images
        productImages={productImages}
        addNewProductImage={(imageObject) => {
          setProductImages([...productImages, imageObject]);
        }}
        deleteProductImage={(imageObject) => {
          function newImages(imageItem) {
            return imageItem.imgURL !== imageObject.imgURL;
          }
          console.log("Got Here");
          console.log(imageObject);
          console.log(productImages.filter(newImages));
          setProductImages(productImages.filter(newImages));
        }}
        //Product Options

        productOptions={productOptions}
        addProductOption={(option) => {
          var newOption = {
            color: option.color,
            variants: [{ size: option.size, quantity: option.quantity }],
          };
          setProductOptions([...productOptions, newOption]);
        }}
        addProductOptionVariant={(option) => {
          console.log("Here I am");
          var newProductOptions = JSON.parse(JSON.stringify(productOptions));

          newProductOptions.forEach((oneOption) => {
            if (option.color === oneOption.color) {
              oneOption.variants.push({
                size: option.size,
                quantity: option.quantity,
              });
            }
          });

          setProductOptions(newProductOptions);
        }}
        updateProductOptionVariant={(option) => {}}
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
