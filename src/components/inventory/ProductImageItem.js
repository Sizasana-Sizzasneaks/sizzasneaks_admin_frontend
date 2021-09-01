import React from "react";
import { Row, Col } from "react-bootstrap";
import Styles from "./ProductImageItem.module.css";

function ProductImageItem(props) {
  return (
    <div className={Styles.EntireProductImageItem}>
      <Row>
        <Col className={Styles.ImageBox}>
          <img src={props.imgURL} alt="Yollo" />
        </Col>
      </Row>
      <Row
        style={{
          borderStyle: "solid",
          borderWidth: "1px",
        }}
      >
        <Col
          style={{
            display: "flex",
            margin: "3px 3px",
            padding: "0px 3px",
          }}
        >
          <p className={Styles.ImageName}> {props.fileName + props.fileType}</p>{" "}
          <div
            className={Styles.ImageDeleteButton}
            style={{ marginLeft: "auto" }}
            onClick={() => {
              console.log("Image Delete");
            }}
          >
           
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default ProductImageItem;
