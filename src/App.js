import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//App Components
import Navbar from "./components/general/Navbar.js";
import NavbarLogIn from "./components/general/NavbarLogIn.js";
import Footer from "./components/general/Footer.js";
import { Container } from "react-bootstrap";
import CircularProgress from "@material-ui/core/CircularProgress";
import ProtectedRoute from "./components/general/ProtectedRoute.js";

//Pages
import Dashboard from "./components/pages/Dashboard.js";
import LogInPage from "./components/pages/LogInPage.js";

import InventoryPage from "./components/pages/InventoryPage.js";
import InventoryItemPage from "./components/pages/InventoryItemPage.js";
import UpdateInventoryItemPage from "./components/pages/UpdateInventoryItemPage.js";
import InventoryCreatePage from "./components/pages/InventoryCreatePage.js";

import OrderPage from "./components/pages/OrderPage.js";
import OrderItemPage from "./components/pages/OrderItemPage.js";

//Test
import TestOrders from "./components/pages/TestOrders.js";

//Redux Store
import store from "./redux/index.js";
import { useSelector } from "react-redux";
import { isLoaded, isEmpty } from "react-redux-firebase";

function App() {
  var isUserEmpty = useSelector((state) => state.firebase.auth.isEmpty);
  var [loading, setLoading] = React.useState(true);

  const subscription = store.subscribe(appStart);

  async function appStart() {
    if (isLoaded(store.getState().firebase.auth)) {
      if (isEmpty(store.getState().firebase.auth)) {
        subscription();
        console.log("Loaded & Empty");
        setLoading(false);
      } else {
        subscription();
        console.log("Loaded & Not Empty");
        setLoading(false);
      }
    }
  }

  return (
    <>
      {loading ? (
        <div
          style={{
            height: "100vh",
            width: "100%",
            textAlign: "center",
            marginTop: "30vh",
            color: "#007bff",
          }}
        >
          <p
            className="logo-banner"
            style={{ marginBottom: "40px", fontSize: "60px", color: "black" }}
          >
            SIZZASNEAKS
          </p>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <Router>
          {isUserEmpty ? <NavbarLogIn /> : <Navbar />}

          <Container fluid="xl" style={{ padding: "0" }}>
            <div>
              <Switch>
                <Route exact path="/log-in">
                  <LogInPage />
                </Route>

                <ProtectedRoute
                  exact
                  path="/test_orders"
                  component={TestOrders}
                />

                <ProtectedRoute
                  exact
                  path="/inventory"
                  component={InventoryPage}
                />

                <ProtectedRoute
                  exact
                  path="/inventory/create"
                  component={InventoryCreatePage}
                />

                <ProtectedRoute
                  exact
                  path="/inventory/:id"
                  component={InventoryItemPage}
                />

                <ProtectedRoute
                  exact
                  path="/inventory/update/:id"
                  component={UpdateInventoryItemPage}
                />
{/* 
route for the orders in the navigation */}
                <ProtectedRoute
                 exact
                 path="/orders"
                 component={OrderPage}
                />

                <ProtectedRoute
                  exact
                  path="/orders/:id"
                  component={OrderItemPage}
                />    

                <ProtectedRoute exact path="/" component={Dashboard} />
              </Switch>
            </div>
          </Container>
          <Footer />
        </Router>
      )}
    </>
  );
}

export default App;
