import React from 'react';
<<<<<<< HEAD
import { Button} from '@material-ui/core';
import Box from '@material-ui/core/Box';


function Dashboard(){
    const bstyle={margin: "15px 0", backgroundColor:"#02ced1"

}

    return(
        <div>
             <Box align="center">
            <h1>Welcome Back Admin01!</h1>
            <br></br>

            <Button type="submit" color="primary" style={bstyle}  variant="contained" >
                 Log Out</Button>
            </Box>
=======
import {logout, selectUser} from "../features/userSlice";
import "./dashboard.css";
import { useDispatch } from 'react-redux';


function Dashboard(){
    const user = {name: "Natasha"};
    
    const dispatch = useDispatch();

    const handleLogout = (e) => {
        e.preventDefault();

        dispatch(Dashboard());

    };

    return(

        <div className="dashboard">
            <h1>Welcome Back <span className="user__name">Natasha!</span>
            <br></br>

        </h1>
        <button className="logout__button" onClick={(e) => handleLogout(e)}>
            Logout
        </button>
>>>>>>> 1aab81924d7826a178aa2c0360807fbbeabf11cd
        </div>
    )
}

export default Dashboard;