import React from "react";
import { Row, Col } from "react-bootstrap";
import Styles from "./ProductImageItem.module.css";

function ProductImageItem(props) {
  return (
    <div className={Styles.EntireProductImageItem}>
      <Row>
        <Col className={Styles.ImageBox}>
          <img
            src="https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg"
            alt="Yollo"
          />
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
          <p className={Styles.ImageName}>Image Name</p>{" "}
          <div
            className={Styles.ImageDeleteButton}
            style={{ marginLeft: "auto" }}
            onClick={()=>{
                console.log("Image Delete")

            }}
          >
            <span
              style={{ float: "right", fontSize: "23px" }}
              class="material-icons"
            >
              delete
            </span>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default ProductImageItem;
