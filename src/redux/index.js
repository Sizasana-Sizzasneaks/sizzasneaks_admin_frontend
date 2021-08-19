import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import Reducers from "./reducers/index.js";
import { composeWithDevTools } from "redux-devtools-extension";

//a redux store is being created to store the state of the application using the reducers

//the redux dev tool extension wraps the actions with its own acton.

const store = createStore(
    Reducers,
    +window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    composeWithDevTools(applyMiddleware(thunk))
  );
  //arguments are passed to the createstore function
  //thunk is being used as a redux enhancer to allow us to work with asynchronous actions
  //the store is then exported
  export default store;
  