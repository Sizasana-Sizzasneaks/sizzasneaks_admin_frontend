import React, { useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Link,
  Typography,
  Container,
  Button,
} from "@material-ui/core";
//import PersonIcon from "@material-ui/icons/Person";
import Box from "@material-ui/core/Box";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import useStyles from "./styles/style.js";

import { useHistory } from "react-router-dom";
import * as InputValidation from "../../services/InputValidation";
import { logIn } from "../../services/authentication";
import Navbar from "../general/Navbar";

const LogInPage = ({ showLogin }) => {
  const classes = useStyles();
  const paperStyle = {
    padding: 20,
    height: "60vh",
    width: 980,
    margin: "20px auto",
  };
  //const avatarStyle = { backgroundColor: "#02ced1" };
  const tstyle = { margin: "20px", width: 400 };
  const bstyle = { margin: "8px 0", backgroundColor: "orange" };

  var [email, setEmail] = useState("");
  var [password, setPassword] = useState("");

  var [errorEmail, setErrorEmail] = useState(null);
  var [errorPassword, setErrorPassword] = useState(null);
  var [formError, setFormError] = React.useState(null);

  const history = useHistory();
  
  const handleRoute = () =>{ 
    history.push("/dashboard");
  }

  return (
    <div className={`${showLogin ? "active" : ""} show`}>
      <form className={classes.root} noValidate autoComplete="off">
        <div className="LogInPage" noValidate autoComplete="Off">
          <Grid>
            <Paper style={paperStyle}>
              
                {/* <Avatar style={avatarStyle}>
                  <PersonIcon />
                </Avatar> */}
                <p className="error-prompt">
                  {formError && formError.message}
                </p>

              <Box>
                <label className="label-style">Email</label>
                <Container align="center">    
                  <TextField
                    placeholder="Enter email"
                    variant="outlined"
                    style={tstyle}
                    value={email}
                    onChange={async(event) => {
                      await setEmail(event.target.value);
                      var emailValidationResult= 
                        await InputValidation.validateEmail(event.target.value);
                      setErrorEmail(emailValidationResult);
                      //console.log("no clue whats going on");
                    }}
                  />
                </Container>               
               <p className="p-errors">
                    {errorEmail &&
                      (!errorEmail.valid ? errorEmail.message : "")}
                  </p>
                <label className="label-style">Password</label>

                <Container align="center">
                  <TextField
                    placeholder="Enter password"
                    type="password"
                    style={tstyle}
                    variant="outlined"
                    value={password}
                    onChange={async (event) => {
                      await setPassword(event.target.value);
                      var passwordValidationResult= 
                        await InputValidation.validatePassword(event.target.value);
                      setErrorPassword(passwordValidationResult);
                    }}
                  /> 
                </Container>
                <p className="p-errors">
                    {errorPassword &&
                      (!errorPassword.valid ? errorPassword.message : "")}
                  </p>

                {/* <Container>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="checkedB"
                        color="primary"
                        fullWidth
                        required
                      />
                    }
                    label="Remember me"
                  />
                </Container> */}

                <Container align="center" >
                    <Button
                      color="red-text"
                      style={bstyle}
                      variant="contained"
                      onClick={async(event) => {
                        event.preventDefault();
                        var logInResult= await logIn(email, password);
                        await setFormError(logInResult);

                        if(logInResult.ok===true){
                           await setTimeout(handleRoute(),6000)
                        }
                       }}
                    >
                      Log In
                    </Button>
                    
                </Container>

                {/* <Typography>
                  <Link href="#">Forgot password ?</Link>
                </Typography> */}
              </Box>
            </Paper>
          </Grid>
        </div>
      </form>
    </div>
  );
};

export default LogInPage;
