import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import {useSelector} from "react-redux";
import NavbarLog from "./Navbar Login";

//isEmpty === true then display adminlog in  nav else display this one
function Navbar() {
  var isLoggedIn=useSelector((state)=> state.firebase.auth.isEmpty);
  
  return (
    <div>
      {isLoggedIn ? <NavbarLog/> :
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


            <Col xs={2} style={{ padding: "0", marginLeft: "auto"  }}>
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
              <NavabarNavigationLink label="Dashboard" route="" />
              <NavabarNavigationLink label="Orders" route="orders" />
              <NavabarNavigationLink label="Inventory" route="inventory" />
              <NavabarNavigationLink label="Add New Product Item" route="inventory/create" />
             
            </div>
            
          </div>
        </Container>
      </div>
    </nav>
    }
    </div>
  );
}

function NavabarNavigationLink(props) {
  return (
    <Link to={"/" + props.route}>
    <div
      className="navbarNavigationLink"
    >
      <p style={{}}>{props.label}</p>
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
