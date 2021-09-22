import React from "react";
import Styles from "./DateInputField.module.css";
function DateInputField(props) {
  return (
    <div className={Styles.SearchBarBox}>
      <input
        value={props.value}
        className={Styles.SearchInput}
        type="date"
        placeholder={props.placeHolderText}
        onChange={(event) => {
          if (typeof props.onChange !== "undefined") {
            props.onChange(event.target.value);
          }
        }}
      />
    </div>
  );
}

export default DateInputField;
