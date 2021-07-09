import "./App.css";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//App Components
 import Navbar from "./components/general/Navbar.js";
// import Footer from "./components/general/Footer.js";

//Pages
import Dashboard from "./components/pages/Dashboard.js"
import LogInPage from "./components/pages/LogInPage.js";
import { login, logout, selectUser } from "./components/features/userSlice";

function App() {
    //check if user is logged in
    const user = useSelector(selectUser);

  return (
  
    <>
      <div>{user ? <login /> : <logout />} </div>

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
      {/* <Footer /> */}
    </>
  );
}

export default App;
