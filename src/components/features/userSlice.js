import {createSlice} from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name:"user" ,
    initialState:{
         user:null //user hasnt logged in
    },
        reducers: {
            login: (state, action) => {
                state.user = action.payload;
            }, //no payload needed as no values need to be updated
            logout: (state) => {
                state.user = null;
            },
        },
});

export const {login, logout} = userSlice.actions;
export const selectUser = (state) => state.user.user;
//two users because youll be storing data in another user object
export default userSlice.reducer;