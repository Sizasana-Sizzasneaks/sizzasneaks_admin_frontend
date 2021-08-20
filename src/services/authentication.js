import { getFirebase } from "react-redux-firebase";

//
export const logIn = (email, password) => {

//Getting the firebase instance
  var firebase = getFirebase();

  //
  return firebase
    //calling the authentication function to start up user authentication
    //persistence is set to specify how auth state persists when using firebase
    //user session is handled from when they sign in till they sign out
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(() => {
      return firebase
        //user authentication is set uo through the use of email and password,
        .auth()
        .signInWithEmailAndPassword(email, password)
        //if a user has signed in with an email and a password they get feedback
        .then((user) => {
          console.log("admin signedIn");
          getCurrentUserIdToken();
          return { ok: true, message: "Successful Log In" };
        })
        //if signing in fails, the user gets an error from the application.
        .catch((error) => {
          console.log("Log In Error");
          return { ok: false, message: "Log In Error" };
        });
    })
    //an error message response is made should any of code throw an exception
    //the excpetion is handled so that it does not cause the application to crash
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
};

//get CurrentUserIDToken
export const getCurrentUserIdToken = async () => {
  //get firebase instance
  var firebase = getFirebase();
  var output;
  //wait for promise
  await firebase
  //authicate user then get token
    .auth()
    .currentUser.getIdToken(true)
    .then((idToken) => {
      console.log(idToken);
      output = { ok: true, data: idToken };
    })
    .catch((error) => {
      output = { ok: false, message: "Failed to get Id Token" };
    });

  return output;
};
