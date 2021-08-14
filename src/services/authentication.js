import { getFirebase } from "react-redux-firebase";

export const logIn = (email, password) => {
  var firebase = getFirebase();

  return firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(() => {
      return firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((user) => {
          console.log("admin signedIn");
          return { ok: true, message: "Successful Log In" };
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
};

//get CurrentUserIDToken
export const getCurrentUserIdToken = async () => {
  var firebase = getFirebase();
  var output;
  await firebase
    .auth()
    .currentUser.getIdToken(true)
    .then((idToken) => {
      output = { ok: true, data: idToken };
    })
    .catch((error) => {
      output = { ok: false, message: "Failed to get Id Token" };
    });

  return output;
};
