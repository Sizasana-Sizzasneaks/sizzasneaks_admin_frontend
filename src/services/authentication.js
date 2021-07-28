import { getFirebase } from "react-redux-firebase";
import { getUserDetails } from "../api/user";

export const logIn = (email, password) => {
  var firebase = getFirebase();

  //getUserDetails();

 return firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(() => {
      return firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((user) => {
          console.log("admin signedIn");
          return { ok: true, message: "Successful Log In"};
        })
        .catch((error) => {
          console.log("Log In Error");
          return { ok: false, message: "Log In Error" };
        });
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
    });

  // return firebase
  //   .auth()
  //   .signInWithEmailAndPassword(email, password)
  //   .then((user) => {
  //     console.log("admin signedIn");
  //     return { ok: true, message: null };
  //   })
  //   .catch((error) => {
  //     console.log("Log In Error");
  //     return { ok: false, message: "Log In Error" };
  //   });
};

//get CurrentUserIDToken
export const getCurrentUserIdToken = () => {
  var firebase = getFirebase();

  return firebase
    .auth()
    .currentUser.getIdToken(true)
    .then((idToken) => {
      console.log("something happened");
      return { ok: true, data: idToken };
    })
    .catch((error) => {
      console.log("nothing happened");
      return { ok: false, error: error };
    });
};
