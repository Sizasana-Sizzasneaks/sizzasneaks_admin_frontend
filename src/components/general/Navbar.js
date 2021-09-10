import React from "react";
import { useHistory } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import { signOutCurrentUser } from "../../services/authentication.js";
import { useSelector } from "react-redux";

//isEmpty === true then display adminlog in  nav else display this one
function Navbar() {
  var history = useHistory();
  var isLoggedIn = useSelector((state) => state.firebase.auth.isEmpty);

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

            <Col xs={2} style={{ padding: "0", marginLeft: "auto" }}>
              <Row className="top-right-nav-banner-links">
                <Col xs={5} className="top-right-nav-banner-link" style={{}}>
                  <Link to="/">
                    <div className="shopping-cart-banner">
                      <span
                        style={{ float: "left", color: "black" }}
                        className="material-icons"
                      >
                        account_circle
                      </span>
                      <p style={{ color: "black", fontWeight: 400 }}>Admin</p>
                    </div>
                  </Link>
                </Col>
                <Col xs={1}>
                  <div className="vertical-divider"></div>
                </Col>
                <Col xs={5} className="top-right-nav-banner-link">
                  {" "}
                  <p
                    style={{ color: "black", fontWeight: 400 }}
                    onClick={() => {
                      signOutCurrentUser();
                    }}
                  >
                    Log out
                  </p>{" "}
                </Col>
              </Row>
            </Col>
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
              <NavbarNavigationLink label="Dashboard" route="" />
              <NavbarNavigationLink label="Orders" route="Coming Soon" />
              <NavbarNavigationLink label="Inventory" route="inventory" />
            </div>
            <div
              style={{
                height: "100%",
                display: "inline-block",
                marginLeft: "auto",
              }}
            >
              <NavbarNavigationLink
                label="Add New Product Item"
                route="inventory/create"
              />
            </div>
          </div>
        </Container>
      </div>
    </nav>
  );
}

function NavbarNavigationLink(props) {
  return (
    <Link to={"/" + props.route}>
      <div className="navbarNavigationLink">
        <p style={{ color: "black" }}>{props.label}</p>
        {props.expandable && (
          <span class="material-icons" style={{ marginLeft: "10px" }}>
            expand_more
          </span>
        )}
      </div>
    </Link>
  );
}

export default Navbar;
