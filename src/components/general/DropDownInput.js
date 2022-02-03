import React from "react";
import Styles from "./DropDownInput.module.css";

function DropDownInput(props) {
  var [focused, setFocus] = React.useState(false);

  return (
    <div
      className={Styles.EntireInputFieldComponent}
      style={props.entireComponentStyle}
    >
      <p
        className={
          focused
            ? [Styles.InputLabel, Styles.InputLabelFocused].join(" ")
            : props.error && !props.error.ok
            ? [Styles.InputLabel, Styles.InputLabelError].join(" ")
            : Styles.InputLabel
        }
      >
        {props.label}
      </p>
      <div
        className={
          focused
            ? [Styles.InputWrapper, Styles.InputWrapperFocused].join(" ")
            : props.error && !props.error.ok
            ? [Styles.InputWrapper, Styles.InputWrapperError].join(" ")
            : Styles.InputWrapper
        }
        style={props.wrapperStyle}
      >
        <select
          className={Styles.InputField}
          style={props.inputStyle}
          value={props.value}
          name="visibility"
          id="visibility-selector"
          onChange={(event) => {
            if (typeof props.onChange !== "undefined") {
              props.onChange(event.target.value);
            }
          }}
        >
          <option value=""></option>
          <option value="true">Visible</option>
          <option value="false">Hidden</option>
        </select>
      </div>
      {props.error && !props.error.ok && !focused && (
        <p className={[Styles.InputLabel, Styles.InputError].join(" ")}>
          {props.error.message}
        </p>
      )}
    </div>
  );
}

export default DropDownInput;
