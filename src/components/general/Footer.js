import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import facebookIcon from "../../icons/facebook-icon.svg";
import twitterIcon from "../../icons/twitter-icon.svg";
import googlePlusIcon from "../../icons/google-plus-icon.svg";

function Footer() {
  return (
    <footer style={{ height: "max-content" }}>
      <Container
        fluid="xl"
        style={{
          paddingLeft: "0",
          paddingRight: "0",
          //backgroundColor: "red",
          paddingTop: "50px",
        }}
      >
        <Row style={{ fontWeight: "bold", height: "30px" }}>
          <Col xs={3} className="footer-heading-block">
            <p className="footer-headingOne-text">SIZZASNEAKS</p>
          </Col>
          <Col xs={4} className="footer-heading-block">
            <p className="footer-heading-text">SITE LINKS</p>
          </Col>
          {/* <Col xs={2} className="footer-heading-block">
            <p className="footer-heading-text">POLICY</p>
          </Col> */}
        </Row>

        <Row style={{ marginTop: "35px" }}>
          <Col className="footer-segment-block" xs={3}>
            <FooterIconLink src={facebookIcon} alt="facebook-icon" link="https://www.facebook.com" />
            <FooterIconLink src={twitterIcon} alt="twitter-icon" link="https://www.twitter.com" />
            <FooterIconLink src={googlePlusIcon} alt="google-plus-icon" link="https://www.google.com" />
          </Col>
          <Col xs={4} className="footer-segment-block">
            <FooterSegmentItem label="Dashboard" link="/" />
            <FooterSegmentItem label="Inventory" link="/inventory" />
            <FooterSegmentItem label="Orders" link="/orders" />
          </Col>
          {/* <Col xs={2} className="footer-segment-block">
            <FooterSegmentItem label="Terms of Usage" />
            <FooterSegmentItem label="Privacy Policy" />
            <FooterSegmentItem label="Return Policy" />
          </Col> */}
        </Row>

        <Row style={{ backgroundColor: "", height: "55px", marginTop:"30px" }}>
          <div style={{ display: "inline-flex", position: "relative" }}>
            <div className="copyright-container">
              <p>Copyright © 2021 SIZZASNEAKS. All Rights Reserved</p>
            </div>
            
          </div>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;

function FooterSegmentItem(props) {
  const history = useHistory();
  return (
    <p
      className="footer-segment-item-text"
      onClick={() => {
        if (typeof props.link !== undefined) {
          history.push(props.link);
        }
      }}
    >
      {props.label}{" "}
    </p>
  );
}

function FooterIconLink(props) {
  return (
    <img
    className="footer-icon-link"
    onClick={() => {
        if (typeof props.link !== undefined) {
          window.open(props.link, '_newtab')
        }
      }}
      src={props.src}
      
      style={{ height: "22px", marginRight: "20px" }}
      alt={props.alt}
    />
  );
}
