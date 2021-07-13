import "./App.css";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//App Components
import Navbar from "./components/general/Navbar.js";
import Footer from "./components/general/Footer.js";
import { Container } from "react-bootstrap";


//Pages
import Dashboard from "./components/pages/Dashboard.js";
import LogInPage from "./components/pages/LogInPage.js";


function App() {
  

  return (
    <>
      <Router>
        <Navbar />
        <Container fluid="xl" style={{ padding: "0" }}>
          <div>
            <Switch>
              <Route exact path="/log-in">
                {" "}
                {/* Natasha */}
                <LogInPage />
              </Route>
              <Route exact path="/dashboard">
                {" "}
                {/* Natasha */}
                <Dashboard />
              </Route>
              <Route exact path="/">
                {" "}
                {/* Natasha */}
                <Dashboard />
              </Route>
            </Switch>
          </div>
        </Container>
        <Footer />
      </Router>
    </>
  );
}

export default App;
