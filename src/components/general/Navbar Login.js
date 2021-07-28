import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <div className="navbar-banner">
        <Container
          fluid="xl"
          style={{
            height: "100%",
            paddingLeft: "0",
            paddingRight: "0",
            paddingTop: "10px",
            // backgroundColor: "red"
          }}
        >
          <Row>
            <Col xs={4} style={{ padding: "0" }}>
              <Link to="/">
                {" "}
                <p className="logo-banner">SIZZASNEAKS</p>{" "}
              </Link>
            </Col>


            {/* <Col xs={2} style={{ padding: "0", marginLeft: "auto"  }}>
              <Row className="top-right-nav-banner-links">
                <Col
                  xs={5}
                  className="top-right-nav-banner-link"
                  style={{}}
                >
                  <Link to="/">
                  <div className="shopping-cart-banner">
                    <span style={{ float: "left" }} className="material-icons">
                      account_circle
                    </span>
                    <p>Admin</p>
                    </div>
                  </Link>
                </Col>
                <Col xs={1}>
                  <div className="vertical-divider"></div>
                </Col>
                <Col xs={5} className="top-right-nav-banner-link">
                  <Link to="/logout">
                    {" "}
                    <p>Logout</p>{" "}
                  </Link>
                </Col>
              </Row>
            </Col> */}
          </Row>
        </Container>
      </div>
      <div className="navbar-links-segment">
        <Container
          fluid="xl"
          style={{ height: "100%", paddingLeft: "0", paddingRight: "0" }}
        >
          <div style={{ display: "flex", height: "100%" }}>
            <div style={{ height: "100%", display: "inline-block" }}>
              <p className="sub-nav"> Adminstration Log In</p>      
            </div>
            
          </div>
        </Container>
      </div>
    </nav>
  );
}

export default Navbar;
