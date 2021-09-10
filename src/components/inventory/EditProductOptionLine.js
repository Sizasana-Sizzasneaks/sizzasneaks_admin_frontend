import React from "react";
import { Row, Col } from "react-bootstrap";
import Styles from "./ProductOptionLine.module.css";
import InputField from "../general/InputField.js";
import Button from "../general/Button.js";

import {
  validateColorName,
  validateNumber,
} from "../../services/InputValidation.js";
import { Style } from "@material-ui/icons";

function EditProductOptionLine(props) {
  //Option Color
  var [color, setColor] = React.useState(props.color || null);
  var [colorError, setColorError] = React.useState(null);

  //Option Size
  var [size, setSize] = React.useState(props.size || 0);
  var [sizeError, setSizeError] = React.useState(null);

  //Option Quantity
  var [quantity, setQuantity] = React.useState(props.quantity || 0);
  var [quantityError, setQuantityError] = React.useState(null);

  //Quantity Change
  var [quantityAdd, setQuantityAdd] = React.useState(0);
  var [quantityAddError, setQuantityAddError] = React.useState(null);
  var [quantitySubtract, setQuantitySubtract] = React.useState(0);
  var [quantitySubtractError, setQuantitySubtractError] = React.useState(null);

  //Add Error
  var [addError, setAddError] = React.useState(null);

  async function checkInputFields() {
    var validateColorNameResult = await validateColorName(color);
    await setColorError(validateColorNameResult);

    var validateSizeResult = await validateNumber(size);
    await setSizeError(validateSizeResult);

    var validateQuantityResult = await validateNumber(quantity);
    await setQuantityError(validateQuantityResult);

    return { ok: true };
  }

  function checkFormValidity() {
    if (colorError && sizeError && quantityError) {
      if (colorError.ok && sizeError.ok && quantityError.ok) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  return (
    <Row className={Styles.Info}>
      <hr className={Styles.TopLine} />

      <Col xl={2} className={Styles.SingleFieldBanner}>
        {props.editType === "variant" || props.editType === "complete" ? (
          <p style={{ marginBottom: "0px", marginRight: "10px" }}>
            {color && color}
          </p>
        ) : (
          <InputField
            value={color}
            wrapperStyle={{ width: "100px" }}
            onChange={async (value) => {
              setAddError(null);
              setColor(value);

              var validateColorResult = await validateColorName(value);
              setColorError(validateColorResult);
            }}
            error={colorError}
          />
        )}
      </Col>
      <Col
        xl={2}
        className={Styles.SingleFieldBanner}
        style={{ display: "ruby" }}
      >
        <p style={{ marginBottom: "0px", marginRight: "10px" }}>UK</p>
        {props.editType === "complete" ? (
          <p style={{ marginBottom: "0px", marginRight: "10px" }}>
            {size && size}
          </p>
        ) : (
          <InputField
            value={size}
            wrapperStyle={{ width: "100px" }}
            onChange={async (value) => {
              var newValue = value
                .replace(/[^0-9.]/g, "")
                .replace(/(\..*)\./g, "$1");
              setSize(newValue);
            }}
            onBlur={async (value) => {
              var numberValue = parseFloat(value, 10);

              var cleanValue =
                Math.round((numberValue + Number.EPSILON) * 10) / 10;

              if (cleanValue > 36) {
                cleanValue = 36;
              } else if (cleanValue < 1) {
                cleanValue = 1;
              }
              setSize(cleanValue);

              var validateSizeResult = await validateNumber(cleanValue);
              setSizeError(validateSizeResult);
            }}
            error={sizeError}
          />
        )}
      </Col>
      <Col xl={2} className={Styles.SingleFieldBanner}>
        {props.editType === "complete" ? (
          <p style={{ marginBottom: "0px", marginRight: "10px" }}>
            {props.quantity}
          </p>
        ) : (
          <InputField
            value={quantity}
            wrapperStyle={{ width: "100px" }}
            onChange={async (value) => {
              var newValue = value
                .replace(/[^0-9.]/g, "")
                .replace(/(\..*)\./g, "$1");

              setQuantity(newValue);
            }}
            onBlur={async (value) => {
              var numberValue = parseFloat(value, 10);

              var cleanValue =
                Math.round((numberValue + Number.EPSILON) * 1) / 1;

              if (cleanValue < 0) {
                cleanValue = 0;
              }
              setQuantity(cleanValue);

              var validateQuantityResult = await validateNumber(cleanValue);
              setQuantityError(validateQuantityResult);
            }}
            error={quantityError}
          />
        )}
      </Col>

      {props.editType === "complete" ? (
        <Col xl={5} style={{ display: "flex", alignItems: "center" }}>
          <InputField
            value={quantitySubtract}
            wrapperStyle={{ width: "100px", marginRight: "10px" }}
            onChange={async (value) => {
              var newValue = value
                .replace(/[^0-9.]/g, "")
                .replace(/(\..*)\./g, "$1");

              setQuantitySubtract(newValue);
            }}
            onBlur={async (value) => {
              var numberValue = parseFloat(value, 10);

              var cleanValue =
                Math.round((numberValue + Number.EPSILON) * 1) / 1;

              if (cleanValue < 0) {
                cleanValue = 0;
              }
              setQuantitySubtract(cleanValue);

              var validateQuantityResult = await validateNumber(cleanValue);
              setQuantitySubtractError(validateQuantityResult);
            }}
            error={quantitySubtractError}
          />
          <Button
            label="SUBTRACT"
            styles={{
              padding: "8px 13px",
              backgroundColor: "#FADA35",
              float: "right",
              marginRight: "50px",
            }}
            onClick={async () => {
              if (typeof props.subtractQuantity !== "undefined") {
                var subtractQuantityResult = await props.subtractQuantity(
                  {
                    color: color,
                    size: size,
                  },
                  quantitySubtract
                );
                if (!subtractQuantityResult.ok) {
                  console.log("Failed");
                  setQuantitySubtractError(subtractQuantityResult);
                } else {
                  console.log("Worked");
                  setQuantitySubtract(0);
                  setQuantitySubtractError(null);
                  setQuantityAdd(0);
                  setQuantityAddError(null);
                }
              } else {
              }
            }}
          />
          <InputField
            value={quantityAdd}
            wrapperStyle={{ width: "100px", marginRight: "10px" }}
            onChange={async (value) => {
              var newValue = value
                .replace(/[^0-9.]/g, "")
                .replace(/(\..*)\./g, "$1");

              setQuantityAdd(newValue);
            }}
            onBlur={async (value) => {
              var numberValue = parseFloat(value, 10);

              var cleanValue =
                Math.round((numberValue + Number.EPSILON) * 1) / 1;

              if (cleanValue < 0) {
                cleanValue = 0;
              }
              setQuantityAdd(cleanValue);

              var validateQuantityResult = await validateNumber(cleanValue);
              setQuantityAddError(validateQuantityResult);
            }}
            error={quantityAddError}
          />
          <Button
            label="ADD"
            styles={{
              padding: "8px 13px",
              backgroundColor: "#FADA35",
              float: "right",
            }}
            onClick={async () => {
              console.log("Tea");
              if (typeof props.addQuantity !== "undefined") {
                var addQuantityResult = await props.addQuantity(
                  {
                    color: color,
                    size: size,
                  },
                  quantityAdd
                );
                if (!addQuantityResult.ok) {
                  console.log("Failed");
                  setQuantityAddError(addQuantityResult);
                } else {
                  console.log("Worked");
                  setQuantitySubtract(0);
                  setQuantitySubtractError(null);
                  setQuantityAdd(0);
                  setQuantityAddError(null);
                }
              }
            }}
          />
        </Col>
      ) : (
        <Col xl={3} style={{ display: "flex", alignItems: "center" }}>
          <p className={Styles.AddErrorText}>{addError && addError.message}</p>
        </Col>
      )}

      {props.editType !== "complete" ? (
        <Col xl={3}>
          <Button
            label={
              props.editType === "variant"
                ? "ADD NEW VARIANT"
                : "ADD NEW OPTION"
            }
            disabled={!checkFormValidity()}
            styles={{
              padding: "8px 13px",
              backgroundColor: "#FADA35",
              marginTop: "10px",
              float: "right",
            }}
            onClick={async () => {
              if (checkFormValidity()) {
                if (typeof props.addOption !== "undefined") {
                  var addOptionResult = await props.addOption({
                    color,
                    size,
                    quantity,
                  });

                  if (!addOptionResult.ok) {
                    setAddError(addOptionResult);
                  } else {
                    setColor("");
                    setSize(0);
                    setQuantity(0);
                  }
                } else if (typeof props.addVariant !== "undefined") {
                  var addVariantResult = await props.addVariant({
                    color,
                    size,
                    quantity,
                  });

                  if (!addVariantResult.ok) {
                    setAddError(addVariantResult);
                  } else {
                    setQuantity(0);
                  }
                }
              } else {
                console.log("Not Adding");
              }
            }}
          />
        </Col>
      ) : (
        <Col xl={1} style={{ display: "flex", alignItems: "center" }}>
          <div
            className={Styles.DeleteBox}
            onClick={() => {
              if (typeof props.deleteProductOption !== "undefined") {
                props.deleteProductOption({ color: color, size: size });
              }
            }}
          >
            <span class="material-icons">close</span>
          </div>
        </Col>
      )}
    </Row>
  );
}

export default EditProductOptionLine;
