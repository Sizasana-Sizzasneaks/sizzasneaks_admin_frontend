import React from "react";
import { Row, Col } from "react-bootstrap";
import Styles from "./ProductOptionLine.module.css";
import InputField from "../general/InputField.js";
import Button from "../general/Button.js";

import {
  validateColorName,
  validateNumber,
} from "../../services/InputValidation.js";

function EditProductOptionLine(props) {
  //Option Color
  var [color, setColor] = React.useState(props.color || null);
  var [colorError, setColorError] = React.useState(null);

  //Option Size
  var [size, setSize] = React.useState(0);
  var [sizeError, setSizeError] = React.useState(null);

  //Option Quantity
  var [quantity, setQuantity] = React.useState(0);
  var [quantityError, setQuantityError] = React.useState(null);

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
      if (
        colorError.ok === true &&
        sizeError.ok === true &&
        quantityError.ok === true
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
    <Row className={Styles.Info}>
      <hr className={Styles.TopLine} />

      <Col xl={2} className={Styles.SingleFieldBanner}>
        {props.editType === "variant" ? (
          <p style={{ marginBottom: "0px", marginRight: "10px" }}>
            {props.color}
          </p>
        ) : (
          <InputField
            value={color}
            wrapperStyle={{ width: "100px" }}
            onChange={async (value) => {
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
      </Col>
      <Col xl={2} className={Styles.SingleFieldBanner}>
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

            var cleanValue = Math.round((numberValue + Number.EPSILON) * 1) / 1;

            if (cleanValue < 0) {
              cleanValue = 0;
            }
            setQuantity(cleanValue);

            var validateQuantityResult = await validateNumber(cleanValue);
            setQuantityError(validateQuantityResult);
          }}
          error={quantityError}
        />
      </Col>
      <Col xl={4}></Col>
      <Col xl={2}>
        <Button
          label="ADD"
          styles={{
            padding: "8px 13px",
            backgroundColor: "#FADA35",
            marginTop: "10px",
            float: "right",
          }}
          onClick={async () => {
            await checkInputFields();

            var formValidityCheck = checkFormValidity();

            if (formValidityCheck) {
              console.log("Adding");

              if (typeof props.addOption !== "undefined") {
                props.addOption({ color, size, quantity });
              } else if (typeof props.addVariant !== "undefined") {
                props.addVariant({ color, size, quantity });
              }

              setColor("");
              setSize(0);
              setQuantity(0);
            } else {
              console.log("Not Adding");
            }
          }}
        />
      </Col>
    </Row>
  );
}

export default EditProductOptionLine;
