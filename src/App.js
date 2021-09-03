import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//App Components
import Navbar from "./components/general/Navbar.js";
import NavbarLog from "./components/general/Navbar Login";
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

//Redux Store
import store from "./redux/index.js";
import { isLoaded, isEmpty } from "react-redux-firebase";

function App() {
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
            style={{ marginBottom: "40px", fontSize: "60px" }}
          >
            SIZZASNEAKS
          </p>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <Router>
          <Navbar />
          <Container fluid="xl" style={{ padding: "0" }}>
            <div>
              <Switch>
                <Route exact path="/log-in">
                  <LogInPage />
                </Route>

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
