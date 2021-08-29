import React from "react";
import { Row, Col } from "react-bootstrap";
import Styles from "./ProductImageItem.module.css";

function ProductImageItem(props) {
  return (
    <div style={{}}>
      <Row>
        <Col className={Styles.ImageBox}>
            <img src="https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg" alt="Yollo" />
        </Col>
      </Row>
      <Row>
        <Col>
          <p>Image Name</p>
          <span class="material-icons">delete</span>
        </Col>
      </Row>
    </div>
  );
}

export default ProductImageItem;
