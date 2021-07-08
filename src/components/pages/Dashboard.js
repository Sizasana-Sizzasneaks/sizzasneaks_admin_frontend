import React from 'react';
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
        </div>
    )
}

export default Dashboard;