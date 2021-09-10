import React from "react";

import Styles from "./InventoryCreatePage.module.css";
import { Row } from "react-bootstrap";
import Button from "../general/Button.js";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useParams, useHistory, Prompt } from "react-router-dom";
import EditProductDetailsCard from "../inventory/EditProductDetailsCard.js";
import EditProductDataCard from "../inventory/EditProductDataCard.js";
import firebase from "../../config/firebaseConfig.js";
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

  const history = useHistory();

  const started = React.useRef(false);

  // var [formValid, setFormValid] = React.useState(true);

  // State
  var [saveState, setSaveState] = React.useState(null);
  var [saveLoading, setSaveLoading] = React.useState(false);
  var [changesNotSaved, setChangesNotSaved] = React.useState(true);

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
  var [initialImages, setInitialImages] = React.useState([]);
  var [newImages, setNewImages] = React.useState([]);
  var [productImagesError, setProductImagesError] = React.useState(null);

  //Product Options
  var [productOptions, setProductOptions] = React.useState([]);
  var [productOptionsError, setProductOptionsError] = React.useState(null);

  React.useEffect(() => {
    if (!started.current) {
      onStart(id);

      started.current = true;
    }
    window.addEventListener("beforeunload", alertUser);
    checkFormFieldsValidity();

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
    newImages,
    productOptions,
    productDescription,
  ]);

  function alertUser(event) {
    if (changesNotSaved) {
      event.preventDefault();
      event.returnValue = "";
    }
    return "";
  }

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
          setInitialImages(product.imgURls);
          setNewImages(product.imgURls);
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

  function compareImageData(firstArray, secondArray) {
    var outputArray = [];

    for (var i = 0; i < firstArray.length; i++) {
      if (
        secondArray.some((image) => image.fileName === firstArray[i].fileName)
      ) {
      } else {
        outputArray.push(firstArray[i]);
      }
    }

    return outputArray;
  }

  function replaceNewImages(firstArray, newImagesArray) {
    var outputArray = firstArray.map(
      (item) =>
        newImagesArray.find((image) => image.fileName === item.fileName) || item
    );

    return outputArray;
  }

  function deleteImage(imageURL) {
    return new Promise((resolve, reject) => {
      try {
        var storageRef = firebase.storage();

        //Delete image By it URL
        var imgRef = storageRef.refFromURL(imageURL);

        // Delete the file
        imgRef
          .delete()
          .then(() => {
            resolve({ ok: true });
          })
          .catch((error) => {
            resolve({ ok: false, message: "Failed to Delete Image" });
          });
      } catch (error) {
        resolve({ ok: false, message: "Error when trying to delete an image" });
      }
    });
  }
  async function removeImages(images) {
    for (var i = 0; i < images.length; i++) {
      await deleteImage(images[i]);
    }
    return { ok: true };
  }

  async function updateInventoryItem(product_id) {
    // Remember - Mongoose adds _id field for all objects added through the mongoose api - antisipate that change and if it really has any effect on the data

    if (typeof product_id !== "undefined") {
      setSaveState({ok: true, message: "Updating Images.."});
      //Find Images to Deletes
      var imagesToDelete = compareImageData(initialImages, newImages);
      // Delete Images
      var deleteImages = await removeImages(imagesToDelete);

      //Find Images to Upload
      var imagesToUpload = compareImageData(newImages, initialImages);
      // Upload Images
      var imageUploadResult = await uploadImages(imagesToUpload);
      if (!imageUploadResult.ok) {
        return { ok: false, message: "Failed to Upload Images" };
      } else {
        //Build Image data to be Uploaded.
        var imagesToSave = replaceNewImages(newImages, imageUploadResult.data);

        var categoryData = prepareCategories();

        var product = {
          productName: productName,
          productDescription: productDescription,
          brand: brand,
          categories: categoryData,
          options: productOptions,
          imgURls: imagesToSave,
          showProduct: visibility, // was true
          supplierTaxAmount: supplierTax,
          supplierCost: supplierCost,
          sellingPriceTaxAmount: sellingTax,
          sellingPrice: sellingPrice,
          applicableTax: ["VAT"],
          available: true,
        };

        var updateProductResult = await updateProduct(
          product_id,
          product //put productData
        );

        return updateProductResult;
      }
    } else {
      return { ok: false, message: "Product ID is undefined" };
    }
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
        newImages.length < 1
          ? { ok: false, message: "Product Must have at least One Image" }
          : { ok: true, message: null };
      await setProductImagesError(imagesCheckOutput);

      //Check Product Options
      var optionsCheckOutput =
        newImages.length < 1
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

  async function uploadImages(images) {
    var completeImages = [];

    for (var i = 0; i < images.length; i++) {
      var completedImageResult = await uploadImage(images[i]);
      if (completedImageResult.ok) {
        completeImages.push(completedImageResult.data);
      } else {
        return { ok: false, message: "Failed to upload New Image No." + i };
      }
    }

    return { ok: true, data: completeImages };
  }

  function uploadImage(imageItem) {
    return new Promise((resolve, reject) => {
      try {
        //Root Ref
        var outputImageItem = {};
        var storageRef = firebase.storage().ref();

        //Create
        var metadata = {
          name: imageItem.fileName,
          contentType: imageItem.fileType,
        };

        //change to correct dynamic type/
        var imagesRef = storageRef.child(
          "images/" + imageItem.fileName + imageItem.fileType
        );

        var imageUpload = imagesRef.put(imageItem.file, metadata);

        //Handle Image Upload
        imageUpload.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            // Handle unsuccessful uploads
            console.log("Error");
            console.log(error);
            reject({ ok: false, message: "Unsuccessful to Upload" });
          },
          () => {
            imageUpload.snapshot.ref.getDownloadURL().then((downloadURL) => {
              outputImageItem = {
                fileName: imageItem.fileName,
                fileType: imageItem.fileType,
                imgURL: downloadURL,
              };
              resolve({ ok: true, data: outputImageItem });
            });
          }
        );
      } catch (error) {
        console.log(error);
        reject({
          ok: false,
          message: "Unexpected Error When Uploading an Images",
        });
      }
    });
  }

  function checkIfFileNameAlreadyExists(newFileName) {
    var output = false;

    initialImages.forEach((initialImage) => {
      if (initialImage.fileName === newFileName) {
        output = true;
      }
    });

    newImages.forEach((newImage) => {
      if (newImage.fileName === newFileName) {
        output = true;
      }
    });

    return output;
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
        {!loading && (
          <>
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
                setSaveLoading(true);

                if (checkFormValidity()) {
                  var updateProductResult = await updateInventoryItem(
                    productId
                  );
                  setSaveLoading(false);
                  if (updateProductResult.ok === true) {
                    setSaveState({ ok: true, message: "Product Updated" });
                    setChangesNotSaved(false);

                    setTimeout(() => {
                      history.goBack();
                    }, 1000);
                  } else {
                    setSaveState(updateProductResult);
                  }
                } else {
                  setSaveLoading(false);
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
              onClick={async () => {
                setSaveState(null);
                setSaveLoading(true);
                // Discard Changes
                var changeAvailabilityState =
                  await changeProductAvailabilityState(productId, true);

                setSaveLoading(false);
                setSaveState({ ok: true, message: "Changes Discarded" });
                setChangesNotSaved(false);

                setTimeout(() => {
                  history.goBack();
                }, 1000);
              }}
            />
          </>
        )}

        {saveLoading && (
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
            productImages={newImages}
            productImagesError={productImagesError}
            addNewProductImage={(imageObject) => {
              //Check That filename is unique, if not changes fileName and tr again.
              imageObject.fileName = imageObject.fileName.toLowerCase();
              while (checkIfFileNameAlreadyExists(imageObject.fileName)) {
                imageObject.fileName = imageObject.fileName + "1";
              }

              //Then add New Image Object to new Images
              var outputImages = [...newImages, imageObject];
              setNewImages(outputImages);

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
              function getNewImages(imageItem) {
                return imageItem.fileName !== imageObject.fileName;
              }

              var outputImages = newImages.filter(getNewImages);
              setNewImages([]);
              setNewImages(outputImages);

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
