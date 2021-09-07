import React from "react";
import Styles from "./InventoryCreatePage.module.css";
import { Row } from "react-bootstrap";
import Button from "../general/Button.js";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useParams } from "react-router-dom";
import EditProductDetailsCard from "../inventory/EditProductDetailsCard.js";
import EditProductDataCard from "../inventory/EditProductDataCard.js";
import { getProduct, updateProduct } from "../../api/products.js";

import {
  validateBasicString,
  validateVisibility,
  validateCategories,
  validateFundsValue,
  validateProductDescriptionString,
} from "../../services/InputValidation.js";

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

  var [formValid, setFormValid] = React.useState(false);

  // State
  var [saveState, setSaveState] = React.useState(null);
  var [loading, setLoading] = React.useState(true);

  //Product Id
  var [productId, setProductId] = React.useState(null);

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
  var [productImagesError, setProductImagesError] = React.useState(null);

  //Product Images
  var [productOptions, setProductOptions] = React.useState([]);
  var [productOptionsError, setProductOptionsError] = React.useState(null);

  const started = React.useRef(false);

  React.useEffect(() => {
    if (!started.current) {
      onStart(id);
      started.current = true;
    }

    checkFormValidity();
  }, [
    productNameError,
    brandError,
    visibilityError,
    categoriesError,
    supplierCostError,
    supplierTaxError,
    sellingPriceError,
    sellingTaxError,
    productImagesError,
    productOptionsError,
    productDescriptionError,
  ]);

  async function onStart(idValue) {
    console.log("On Start Called");
    var setAvailabilityToFalseResult = await changeProductAvailabilityState(
      idValue,
      false
    );

    if (setAvailabilityToFalseResult.ok) {
      // get Product Details and Populate View
      var getProductItemResult = await getProductItem(idValue);

      if (!getProductItemResult.ok) {
        console.log(getProductItemResult);
        //Display Error and allow User to Try again - (Reload Page)
      }
    } else {
      console.log(setAvailabilityToFalseResult);
      //Display Error and allow User to Try again - (Reload Page)
    }
  }

  async function getProductItem(product_id) {
    if (typeof product_id !== "undefined") {
      var getProductResult = await getProduct(product_id);

      if (getProductResult.ok === true) {
        //Product Item is at index 0 of date
        if (!getProductResult.data[0].available) {
          var product = getProductResult.data[0];
          setProductId(product._id);
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
          setLoading(false);
          return { ok: true, message: "Product Retrieved and Set to View" };
        } else {
          return { ok: false, message: "Product Not Set to Unavailable" };
        }
      } else {
        return { ok: false, message: "Failed to Get the Product" };
      }
    } else {
      return { ok: false, message: "Product ID Not Supplied." };
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
        return { ok: true, message: "Product Availability Changed" };
      } else {
        return { ok: false, message: "Failed to change Product Availability" };
      }
    } else {
      return { ok: false, message: "Product ID Not Supplied" };
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

  //Check Form Fields Validity
  async function checkFormFieldsValidity() {
    //Check ProductName
    var productNameCheck = await validateBasicString(productName);
    await setProductNameError(productNameCheck);

    //Check Brand
    var brandCheck = await validateBasicString(brand);
    await setBrandError(brandCheck);

    //Check Visibility
    var visibilityCheck = await validateVisibility(visibility);
    await setVisibilityError(visibilityCheck);

    //Check Categories
    var categoriesCheck = await validateCategories(categories);
    await setCategoriesError(categoriesCheck);

    //Check Supplier Cost
    var supplierCostCheck = await validateFundsValue(supplierCost);
    await setSupplierCostError(supplierCostCheck);

    //Check Supplier Tax
    var supplierTaxCheck = await validateFundsValue(supplierTax);
    await setSupplierTaxError(supplierTaxCheck);

    // Check Selling Price
    var sellingPriceCheck = await validateFundsValue(sellingPrice);
    await setSellingPriceError(sellingPriceCheck);

    //Check Selling Tax
    var sellingTaxCheck = await validateFundsValue(sellingTax);
    await setSellingTaxError(sellingTaxCheck);

    //Check Images
    var imagesCheckOutput =
      productImages.length < 1
        ? { ok: false, message: "Product Must have at least One Image" }
        : { ok: true, message: null };
    await setProductImagesError(imagesCheckOutput);

    //Check Product Options
    var optionsCheckOutput =
      productOptions.length < 1
        ? { ok: false, message: "Product must have at least one option" }
        : { ok: true, message: null };
    await setProductOptionsError(optionsCheckOutput);

    //Check Product Description
    var productDescriptionResult = await validateProductDescriptionString(
      productDescription
    );
    await setProductDescriptionError(productDescriptionResult);

    return { ok: true };
  }

  function checkFormValidity() {
    if (
      productNameError &&
      brandError &&
      visibilityError &&
      categoriesError &&
      supplierCostError &&
      supplierTaxError &&
      sellingPriceError &&
      sellingTaxError &&
      productImagesError &&
      productOptionsError &&
      productDescriptionError
    ) {
      if (
        productNameError.ok &&
        brandError.ok &&
        visibilityError.ok &&
        categoriesError.ok &&
        supplierCostError.ok &&
        supplierTaxError.ok &&
        sellingPriceError.ok &&
        sellingTaxError.ok &&
        productImagesError.ok &&
        productOptionsError.ok &&
        productDescriptionError.ok
      ) {
        setFormValid(true); // if All Fields Check out
        return true;
      } else {
        setFormValid(false); //if some field validation is not checked
        return false;
      }
    } else {
      setFormValid(false); //if One field has not been validated Yet
      return false;
    }
  }

  return (
    <div>
      <Row className={Styles.EditButtonSegment}>
        <Button
          disabled={!formValid}
          label="Save"
          styles={{
            backgroundColor: "#FADA35",
            marginLeft: "0px",
            width: "min-content",
          }}
          onClick={async () => {
            // history.push("/inventory/update/" + id);
            // updateInventoryItem(id);

            await checkFormFieldsValidity();

            var flag = checkFormValidity();
            console.log(flag);

            if (flag) {
              console.log("We Updating");
            } else {
              console.log("No Updating");
              setSaveState({ ok: false, message: "Please Check all Fields" });
            }
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
        <div
          style={{
            marginTop: "150px",
            marginBottom: "100vh",
            alignContent: "center",
            display: "flex",
          }}
        >
          <CircularProgress size={115} style={{ margin: "0px auto" }} />
        </div>
      ) : (
        <>
          <EditProductDetailsCard
            //ProductID
            productId={productId}
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
            productImagesError={productImagesError}
            addNewProductImage={(imageObject) => {
              var outputImages = [...productImages, imageObject];

              setProductImages(outputImages);

              //Check Images
              var imagesCheckOutput =
                outputImages.length < 1
                  ? {
                      ok: false,
                      message: "Product Must have at least One Image",
                    }
                  : { ok: true, message: null };
                  
              setProductImagesError(imagesCheckOutput);
            }}
            deleteProductImage={(imageObject) => {
              function newImages(imageItem) {
                return imageItem.imgURL !== imageObject.imgURL;
              }

              console.log(imageObject);

              var outputImages = productImages.filter(newImages);

              setProductImages(outputImages);

              //Check Images
              var imagesCheckOutput =
                outputImages.length < 1
                  ? {
                      ok: false,
                      message: "Product Must have at least One Image",
                    }
                  : { ok: true, message: null };
              setProductImagesError(imagesCheckOutput);
            }}
            //Product Options
            productOptions={productOptions}
            productOptionsError={productOptionsError}
            //Add Product Option
            addProductOption={(option) => {
              var newOption = {
                color: option.color,
                variants: [{ size: option.size, quantity: option.quantity }],
              };
              var newProductOptions = JSON.parse(
                JSON.stringify(productOptions)
              );

              var colorExists = false;
              newProductOptions.forEach((oneOption) => {
                if (
                  oneOption.color.toLowerCase() ===
                  newOption.color.toLowerCase()
                ) {
                  colorExists = true;
                }
              });

              if (colorExists) {
                return { ok: false, message: "Color already exists" };
              } else {
                var outputObject = [...productOptions, newOption];

                setProductOptions(outputObject);

                //Check Product Options
                var optionsCheckOutput =
                  outputObject.length < 1
                    ? {
                        ok: false,
                        message: "Product Must have at least One Option",
                      }
                    : { ok: true, message: null };

                setProductOptionsError(optionsCheckOutput);

                return { ok: true };
              }
            }}
            //Add Variant To Product Option
            addProductOptionVariant={(option) => {
              console.log("Here I am");
              var newProductOptions = JSON.parse(
                JSON.stringify(productOptions)
              );

              var variantExists = false;
              var output = {
                ok: false,
                message: "Error adding Product Variant",
              };
              newProductOptions.forEach((oneOption) => {
                if (option.color === oneOption.color) {
                  oneOption.variants.forEach((variant) => {
                    if (variant.size === option.size) {
                      variantExists = true;
                    }
                  });
                  if (!variantExists) {
                    output = {
                      ok: true,
                    };
                    oneOption.variants.push({
                      size: option.size,
                      quantity: option.quantity,
                    });
                  } else {
                    output = {
                      ok: false,
                      message: "Size variant already exists",
                    };
                  }
                }
              });

              setProductOptions(newProductOptions);
              return output;
            }}
            // Add Quantity to Product Option
            addQuantity={(option, amount) => {
              var newProductOptions = JSON.parse(
                JSON.stringify(productOptions)
              );

              var output = { ok: false, message: "Failed to Add" };
              newProductOptions.forEach((singleOption) => {
                if (singleOption.color === option.color) {
                  singleOption.variants.forEach((variant) => {
                    if (variant.size === option.size) {
                      var possibleValue = variant.quantity + amount;
                      if (possibleValue < 0) {
                        output = {
                          ok: false,
                          message: "Quantity must be greater that 0",
                        };
                      } else {
                        output = {
                          ok: true,
                        };
                        variant.quantity = possibleValue;
                      }
                    }
                  });
                }
              });

              setProductOptions([...newProductOptions]);
              return output;
            }}
            //Subtract Quantity from Option
            subtractQuantity={(option, amount) => {
              var newProductOptions = JSON.parse(
                JSON.stringify(productOptions)
              );

              var output = { ok: false, message: "Failed to Subtract" };
              newProductOptions.forEach((singleOption) => {
                if (singleOption.color === option.color) {
                  singleOption.variants.forEach((variant) => {
                    if (variant.size === option.size) {
                      var possibleValue = variant.quantity - amount;
                      if (possibleValue < 0) {
                        output = {
                          ok: false,
                          message: "Quantity must be greater that 0",
                        };
                      } else {
                        output = {
                          ok: true,
                        };
                        variant.quantity = possibleValue;
                      }
                    }
                  });
                }
              });

              setProductOptions([...newProductOptions]);
              return output;
            }}
            //Delete Product Option
            deleteProductOption={(option) => {
              var newProductOptions = JSON.parse(
                JSON.stringify(productOptions)
              );
              var emptyOption = false;
              newProductOptions.forEach((singleOption) => {
                if (singleOption.color === option.color) {
                  singleOption.variants = singleOption.variants.filter(
                    (variant) => {
                      return variant.size !== option.size;
                    }
                  );

                  emptyOption =
                    singleOption.variants.length === 0 ? true : false;
                } else {
                }
              });

              if (emptyOption) {
                console.log("Cleaning");
                newProductOptions = newProductOptions.filter((oneOption) => {
                  return oneOption.color !== option.color;
                });
              }

              var outputOptions = [...newProductOptions];

              setProductOptions(outputOptions);

              //Check Product Options
              var optionsCheckOutput =
                outputOptions.length < 1
                  ? {
                      ok: false,
                      message: "Product Must have at least One Option",
                    }
                  : { ok: true, message: null };
              setProductOptionsError(optionsCheckOutput);
            }}
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
