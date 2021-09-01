import React from "react";
import Styles from "./InventoryCreatePage.module.css";
import { Row } from "react-bootstrap";
import Button from "../general/Button.js";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useParams } from "react-router-dom";
import EditProductDetailsCard from "../inventory/EditProductDetailsCard.js";
import EditProductDataCard from "../inventory/EditProductDataCard.js";
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

  // State
  var [saveState, setSaveState] = React.useState(null);
  var [loading, setLoading] = React.useState(false);

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
    getProductItem(id);
  }, []);

  async function getProductItem(product_id) {
    if (typeof product_id !== "undefined") {
      var getProductResult = await getProduct(product_id);

      if (getProductResult.ok === true) {
        //Product Item is at index 0 of date

        console.log(getProductResult.data[0]);
        var product = getProductResult.data[0];
        setProductName(product.productName);
        setBrand(product.brand);
        setVisibility(product.showProduct);
        setCategories(prepareCategoriesDisplay(product.categories));
        setSupplierCost(product.supplierCost);
        setSupplierTax(product.supplierTaxAmount);
        setSellingTax(product.sellingPriceTaxAmount);
        setSellingPrice(product.sellingPrice);
        setProductImages(product.imgURls);
        setProductOptions(product.options);
        setProductDescription(product.productDescription);
      } else {
        console.log(getProductResult);
      }
    } else {
      console.log("Product Id is Undefined");
    }
  }

  function prepareCategoriesDisplay(categoryArray) {
    var categoriesObject = { men: false, women: false, kids: false };

    if (categoryArray.includes("MEN")) {
      categoriesObject.men = true;
    }
    if (categoryArray.includes("WOMEN")) {
      categoriesObject.women = true;
    }
    if (categoryArray.includes("KIDS")) {
      categoriesObject.kids = true;
    }

    return categoriesObject;
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

    if (typeof product_id !== "undefined") {
      var updateProductResult = await updateProduct(
        product_id,
        product //put productData
      );

      if (updateProductResult.ok === true) {
        console.log("Product Successfully Updated");
        setLoading(false);
        setSaveState({ ok: true, message: "Product Updated" });
        console.log(updateProductResult);
      } else {
        setLoading(false);
        setSaveState(updateProductResult);
        console.log(updateProductResult);
      }
    } else {
      console.log("Product Id is Undefined");
    }
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
            updateInventoryItem(id);
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

      {loading ? (
        <CircularProgress />
      ) : (
        <>
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
              var newProductOptions = JSON.parse(
                JSON.stringify(productOptions)
              );

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
        </>
      )}
    </div>
  );
}

export default UpdateInventoryItemPage;
