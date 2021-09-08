import React from "react";
import Styles from "./InventoryCreatePage.module.css";
import { Row } from "react-bootstrap";
import Button from "../general/Button.js";
import EditProductDetailsCard from "../inventory/EditProductDetailsCard.js";
import EditProductDataCard from "../inventory/EditProductDataCard.js";
import { useHistory, Prompt } from "react-router-dom";

import { createProduct } from "../../api/products.js";
import CircularProgress from "@material-ui/core/CircularProgress";

import {
  validateBasicString,
  validateVisibility,
  validateCategories,
  validateFundsValue,
  validateProductDescriptionString,
} from "../../services/InputValidation.js";

function InventoryCreatePage(props) {
  const history = useHistory();
  // State
  var [saveState, setSaveState] = React.useState(null);
  var [loading, setLoading] = React.useState(false);
  var [changesNotSaved, setChangesNotSaved] = React.useState(true);

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

  //Product Options
  var [productOptions, setProductOptions] = React.useState([]);
  var [productOptionsError, setProductOptionsError] = React.useState(null);

  React.useEffect(() => {
    window.addEventListener("beforeunload", alertUser);

    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  }, [
    productName,
    brand,
    visibility,
    categories,
    supplierCost,
    supplierTax,
    sellingPrice,
    sellingTax,
    productImages,
    productOptions,
    productDescription,
  ]);

  function clearFields() {
    setProductName("");
    setBrand("");
    setVisibility(null);
    setCategories({ women: false, men: false, kids: false });
    setSupplierCost(null);
    setSupplierTax(null);
    setSellingTax(null);
    setSellingPrice(null);
    setProductImages(null);
    setProductOptions(null);
    setProductDescription("");
  }

  function alertUser(event) {
    if (changesNotSaved) {
      event.preventDefault();
      event.returnValue = "";
    }
    return "";
  }
  async function createNewProduct() {
    var categoryData = prepareCategories();

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

    return createProductResult;
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

  //Check Form Fields Validity
  async function checkFormFieldsValidity() {
    try {
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
    } catch {
      return { ok: false };
    }
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
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  return (
    <div>
      <Row className={Styles.EditButtonSegment}>
        <Prompt
          when={changesNotSaved}
          message="Changes made have not yet been stored, are you sure that you want to leave this page?"
        />
        <Button
          label="Save"
          disabled={!checkFormValidity()}
          styles={{
            backgroundColor: "#FADA35",
            marginLeft: "0px",
            width: "min-content",
          }}
          onClick={async () => {
            setSaveState(null);
            setLoading(true);

            if (checkFormValidity()) {
              var createNewProductResult = await createNewProduct();

              setLoading(false);
              if (createNewProductResult.ok) {
                setSaveState({ ok: true, message: "Product Created" });
                clearFields();
                setChangesNotSaved(false);

                setTimeout(() => {
                  history.push("/inventory");
                }, 1000);
              } else {
                setSaveState(createNewProductResult);
              }
            } else {
              setLoading(false);
              checkFormFieldsValidity();
              setSaveState({
                ok: false,
                message: "Please check all input fields",
              });
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
            setSaveState(null);
            setLoading(true);
            setChangesNotSaved(false);

            setTimeout(() => {
              history.goBack();
            }, 1000);
          }}
        />

        {loading && (
          <div
            style={{
              width: "max-content",
              marginLeft: "8px",
              alignItems: "center",
              display: "flex",
            }}
          >
            <CircularProgress size={26} />
          </div>
        )}
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
              {saveState.message}
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
          var newProductOptions = JSON.parse(JSON.stringify(productOptions));

          var colorExists = false;
          newProductOptions.forEach((oneOption) => {
            if (
              oneOption.color.toLowerCase() === newOption.color.toLowerCase()
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
          var newProductOptions = JSON.parse(JSON.stringify(productOptions));

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
          var newProductOptions = JSON.parse(JSON.stringify(productOptions));

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
          var newProductOptions = JSON.parse(JSON.stringify(productOptions));

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
          var newProductOptions = JSON.parse(JSON.stringify(productOptions));
          var emptyOption = false;
          newProductOptions.forEach((singleOption) => {
            if (singleOption.color === option.color) {
              singleOption.variants = singleOption.variants.filter(
                (variant) => {
                  return variant.size !== option.size;
                }
              );

              emptyOption = singleOption.variants.length === 0 ? true : false;
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
    </div>
  );
}

export default InventoryCreatePage;
