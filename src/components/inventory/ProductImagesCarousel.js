import React from "react";
import Styles from "./ProductImagesCarousel.module.css";
import { Row } from "react-bootstrap";
function ProductImagesCarousel(props) {
  return (
    <Row >
      <div className={Styles.ProductImagesCarousel} >
        {props.children}
        
      </div>
    </Row>
  );
}

export default ProductImagesCarousel;
