import { combineReducers } from "redux";

import {firebaseReducer} from "react-redux-firebase";


//a firebase reducer is being used to take in the actions in the application and retu
//combineReducer is combining all the reducers into a reducer
const reducers = combineReducers({
    firebase: firebaseReducer
})

//the reducers are then exported
export default reducers;