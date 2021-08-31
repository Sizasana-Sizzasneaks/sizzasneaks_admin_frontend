import React from "react";
import { Row, Col } from "react-bootstrap";
import Styles from "./ProductOptionsCard.module.css";

function ProductOptionsCard(props) {
  return (
    <Row className={Styles.ProductOptionsCard}>
      <Row className={Styles.ProductOptionsCardHeader} xl={2}>
        <Col>
              <img src={props.product.imgURls[1]} />
              <p>image 1</p>
        </Col>
        <Col>
              <img src={props.product.imgURls[2]} />
              <p>image 2</p>

        </Col>
        <Col>
              <img src={props.product.imgURls[3]} />
              <p>image 3</p>

        </Col>

      </Row>
      <Row>
          <Col xl={2} className={Styles.PeoductOtionsLabel}>
          <p>Product Options:</p>
          </Col>
          <Row>
        <Col>
          <hr />
        </Col>
      </Row>
          
      </Row>
      
    </Row>
  );
}
export default ProductOptionsCard;
