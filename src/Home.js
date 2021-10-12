import React from "react";
import "./Home.css"
import useLocalStorage from "./useLocalStorage";
import { Link } from "react-router-dom";

const Home = () => {
    const {getCurrUser} = useLocalStorage();
    const currUser = getCurrUser()
    return(
        <div className="Home">
            <h2>Jobly</h2>
            <p>All the jobs in one, convenient place.</p>
            {(currUser !== null) ? 
                <h3>Welcome Back, {currUser.username}!</h3>
                :
                <div>
                    <Link to="/login" className="btn btn-primary me-1">Login</Link>
                    <Link to="/signup" className="btn btn-danger ms-1">Sign Up</Link>
                </div>
            }
        </div>
    )
}

export default Home;