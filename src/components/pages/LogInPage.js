import React, { useState } from "react";
import Styles from "./LogInPage.module.css";
import { Paper, TextField, LinearProgress } from "@material-ui/core";
import { Row } from "react-bootstrap";
import Button from "../general/Button.js";
import Notification from "../general/Notification.js";

import useStyles from "./styles/style.js";
import { useHistory } from "react-router-dom";
import * as InputValidation from "../../services/InputValidation";
import { logIn } from "../../services/authentication";

const LogInPage = () => {
  const classes = useStyles();

  var [email, setEmail] = useState("");
  var [password, setPassword] = useState("");

  var [errorEmail, setErrorEmail] = useState(null);
  var [errorPassword, setErrorPassword] = useState(null);

  var [loading, setLoading] = React.useState(false);
  var [logInState, setLogInState] = React.useState(null);
  var [formValid, setFormValid] = React.useState(false);

  const history = useHistory();
  React.useEffect(() => {
    checkFormValidity();
  }, [errorEmail && errorPassword]);

  async function checkFormFieldsValidity() {
    //Check Email
    var emailValidationResult = await InputValidation.validateEmail(email); //input validation takes place for emailValidationResult
    await setErrorEmail(emailValidationResult);

    //Check Password
    var passwordValidationResult = await InputValidation.validateLogInPassword(
      password
    );
    await setErrorPassword(passwordValidationResult);

    return { ok: true };
  }

  function checkFormValidity() {
    if (errorEmail && errorPassword) {
      if (errorEmail.valid === true && errorPassword.valid === true) {
        setFormValid(true); // if the Username and password is matches then set setFormValid to true
        return true;
      } else {
        setFormValid(false); // if the Username and password is matches then set setFormValid to false
        return false;
      }
    } else {
      setFormValid(false); //this if and else statement checks input validation for Username and Password
      return false;
    }
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div className="LogInPage" noValidate autoComplete="Off">
        <Paper
          style={{
            padding: 20,
            height: "max-content",
            paddingTop: "40px",
            paddingBottom: "40px",
            marginTop: "35px",
            marginBottom: "70px",
          }}
        >
          <Row>
            {loading && (
              <div
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  width: "400px",
                  marginBottom: "20px",
                  padding: 0,
                  marginTop: "10px",
                }}
              >
                <LinearProgress />
              </div>
            )}
            {logInState && (
              <>
                {logInState.ok === true ? (
                  <Notification
                    state="success"
                    label={logInState.message}
                    styles={{
                      marginLeft: "auto",
                      marginRight: "auto",
                      width: "400px",
                      marginBottom: "10px",
                    }}
                  />
                ) : (
                  <Notification
                    state="error"
                    label={logInState.message}
                    styles={{
                      marginLeft: "auto",
                      marginRight: "auto",
                      width: "400px",
                      marginBottom: "10px",
                    }}
                  />
                )}
              </>
            )}
          </Row>

          <Row>
            <div className={Styles.LabelBox}>
              <label className={Styles.LabelStyle}>Email</label>
            </div>
          </Row>

          <Row>
            <TextField
              placeholder="Enter email"
              variant="outlined"
              style={{ margin: "15px auto", width: 400 }}
              value={email}
              onChange={async (event) => {
                await setEmail(event.target.value);
                var emailValidationResult = await InputValidation.validateEmail(
                  event.target.value
                );
                setErrorEmail(emailValidationResult);
              }}
            />
          </Row>
          <Row>
            {" "}
            <div className={Styles.InputErrorBox}>
              <p className={Styles.TextError}>
                {errorEmail && (!errorEmail.valid ? errorEmail.message : "")}
              </p>
            </div>
          </Row>
          <Row>
            <div className={Styles.LabelBox}>
              <label className={Styles.LabelStyle}>Password</label>
            </div>
          </Row>

          <Row>
            <TextField
              placeholder="Enter password"
              type="password"
              style={{ margin: "15px auto", width: 400 }}
              variant="outlined"
              value={password}
              onChange={async (event) => {
                await setPassword(event.target.value);
                var passwordValidationResult =
                  await InputValidation.validateLogInPassword(
                    event.target.value
                  );
                setErrorPassword(passwordValidationResult);
              }}
            />
          </Row>
          <Row>
            <div className={Styles.InputErrorBox}>
              <p className={Styles.TextError}>
                {errorPassword &&
                  (!errorPassword.valid ? errorPassword.message : "")}
              </p>
            </div>
          </Row>

          <Row>
            <Button
              label="Log In"
              disabled={!formValid}
              styles={{
                backgroundColor: "#FADA35",
                width: "max-content",
                marginLeft: "auto",
                marginRight: "auto",
              }}
              onClick={async (event) => {
                await checkFormFieldsValidity();

                var flag = checkFormValidity();

                if (flag) {
                  setLogInState(null);
                  setLoading(true);
                  var logInResult = await logIn(email, password);

                  if (logInResult.ok) {
                    setLoading(false);
                    await setLogInState(logInResult);
                    if (logInResult.ok === true) {
                      await setTimeout(history.push("/"), 6000);
                    }
                  } else {
                    setPassword("");
                    setLoading(false);
                    await setLogInState({
                      ok: false,
                      message: "Invalid email & password combination.",
                    });
                  }
                }
              }}
            >
              Log In
            </Button>
          </Row>
        </Paper>
      </div>
    </form>
  );
};

export default LogInPage;
