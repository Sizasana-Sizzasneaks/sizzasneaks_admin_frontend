import React, {useState, useEffect} from "react";
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

import * as Yup from "yup";
import { useFirebase } from "react-redux-firebase";


const LogInPage = ({showLogin}) => {

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

  //Validation start
  const emailSchema = Yup.object().shape({
    email: Yup.string("Enter String")
    .email("Invalid email address")
    .required("Required").nullable()
  });

  const passwordSchema = Yup.object().shape({
    password: Yup.string("Enter String")
    .required("Required"),
  });


    const firebase = useFirebase();

    var [email, setEmail] = useState(null);
    var [password, setPassword] = useState("");

    var [errorEmail, setErrorEmail] = useState(null);
    var [errorPassword, setErrorPassword] = useState(null);
    
    useEffect(() => {
      validateEmail();
      validatePassword();
      // return () => {
      //   cleanup
      // };
    }, [email, password]);
 
  

  function logIn(email, password) {
    
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log("user signedIn");
      })
      .catch((error) => {
        console.log("Log In Error");
      });
  }

  function validateEmail() {
    emailSchema
      .validate({ email: email })
      .then(() => {
        console.log("email validated");
        setErrorEmail({ valid: true, message: "" });
      })
      .catch((error) => {
        setErrorEmail({ valid: false, message: error.errors[0] });
      });
  }

  function validatePassword() {
    passwordSchema
      .validate({ password: password })
      .then(() => {
        setErrorPassword({ valid: true, message: ""});
      })
      .catch((error) => {
        setErrorPassword({ valid: false, message: error.errors[0] });
      });
  }




  return (

    <div className = {`${showLogin ? "active" : ""} show`}>
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
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              <p>
                {errorEmail && (!errorEmail.valid ? errorEmail.message : "")}
              </p>

              </Container>
              
              <Container>
                <TextField
                  placeholder="Enter password"
                  type="password"
                  style={tstyle}
                  variant="outlined"
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />

                <p>
                 {errorPassword && (!errorPassword.valid ? errorPassword.message : "")}
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
                onClick={() => {
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
