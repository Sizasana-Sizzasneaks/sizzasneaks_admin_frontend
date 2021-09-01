import React from "react";
import { Row, Col } from "react-bootstrap";
import Styles from "./ProductOptionLine.module.css";
import InputField from "../general/InputField.js";

function EditProductOptionLine(props) {
  var [color, setColor] = React.useState(null);
  var [size, setSize] = React.useState(0);
  var [quantity, setQuantity] = React.useState(0);

  return (
    <Row className={Styles.Info}>
      <hr className={Styles.TopLine} />

      <Col xl={2}>
        <InputField wrapperStyle={{width:"100px"}} />
      </Col>
      <Col xl={2} style={{display: "ruby"}}>
        <p style={{marginBottom: "0px", marginRight: "10px"}}>UK</p>
        <InputField wrapperStyle={{width:"70px"}} />
      </Col>
      <Col xl={2}>
        <InputField wrapperStyle={{width:"100px"}} />
      </Col>
    </Row>
  );
}

export default EditProductOptionLine;
