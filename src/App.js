import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//App Components
import Navbar from "./components/general/Navbar.js";
import Footer from "./components/general/Footer.js";

//Pages
import Dashboard from "./components/pages/Dashboard.js"
import LogInPage from "./components/pages/LogInPage.js";

function App() {
  return (
    <><p>Admin Front-End</p>
      <Navbar />
      <Router>
        <div>
          <Switch>
            <Route exact path="/log-in"> {/* Natasha */}
              <LogInPage /> 
            </Route>
            <Route exact path="/dashboard"> {/* Natasha */}
              <Dashboard/>
            </Route>
          </Switch>
        </div>
      </Router>
      <Footer />
    </>
  );
}

export default App;
