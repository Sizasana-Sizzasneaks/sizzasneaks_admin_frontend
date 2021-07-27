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
import PersonIcon from "@material-ui/icons/Person";
import Box from "@material-ui/core/Box";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import useStyles from "./styles/style.js";

import * as InputValidation from "../../services/InputValidation";
import { logIn } from "../../services/authentication";

const LogInPage = ({ showLogin }) => {
  const classes = useStyles();
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 700,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#02ced1" };
  const tstyle = { margin: "20px", width: 400 };
  const bstyle = { margin: "8px 0", backgroundColor: "orange" };

  var [email, setEmail] = useState("");
  var [password, setPassword] = useState("");

  var [errorEmail, setErrorEmail] = useState(null);
  var [errorPassword, setErrorPassword] = useState(null);

  return (
    <div className={`${showLogin ? "active" : ""} show`}>
      <form className={classes.root} noValidate autoComplete="off">
        <div className="LogInPage" noValidate autoComplete="Off">
          <Grid>
            <Paper elevation={20} style={paperStyle}>
              <Grid align="center">
                <Avatar style={avatarStyle}>
                  <PersonIcon />
                </Avatar>
                <h2>Sign In</h2>
              </Grid>

              <Box align="center">
                <Container>
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
                  <p align="left">
                    {errorEmail &&
                      (!errorEmail.valid ? errorEmail.message : "")}
                  </p>
                </Container>

                <Container>
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

                  <p>
                    {errorPassword &&
                      (!errorPassword.valid ? errorPassword.message : "")}
                  </p>
                </Container>

                <Container>
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
                </Container>

                <Button
                  color="primary"
                  style={bstyle}
                  variant="contained"
                  onClick={async(event) => {
                    event.preventDefault();
                    logIn(email, password);
                  }}
                >
                  Submit
                </Button>

                <Typography>
                  <Link href="#">Forgot password ?</Link>
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </div>
      </form>
    </div>
  );
};

export default LogInPage;
