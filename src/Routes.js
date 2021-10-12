import React from "react";
import { Route, useHistory } from "react-router-dom"
import { useState } from "react";
import Home from "./Home";
import NavBar from "./NavBar";
import List from "./List";
import CompanyDetails from "./CompanyDetails";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import useLocalStorage from "./useLocalStorage";
import JoblyApi from "./api";
import Profile from "./Profile";

const Routes = () => {
    const INITIAL_STATE = {
        username: "", 
        password: "", 
        firstName: "", 
        lastName: "", 
        email: ""
    }
    const INITIAL_ERROR = {error: false, msg: ""}
    const [formData, setFormData] = useState(INITIAL_STATE);
    const {
        setCurrUser, 
        setToken, 
        logout, 
        getCurrUser
    } = useLocalStorage();

    const [error, setError] = useState({error: false, msg: ""});
    const history = useHistory();
    const [user, setUser] = useState(getCurrUser());
    const signout = () => {
      logout();
      history.push('/');
      setUser(null);
    }

    const onChange = e => {
        let {name, value} = e.target;
        setFormData(fD => ({
            ...fD,
            [name]: value
        }));
    }

    const returnHome = () => {
        history.push("/");
    }

    const signup = async () => {
        for(let key of Object.keys(formData)){
            if(formData[key] === ""){
                error.error = true;
                error.msg = "All inputs must be filled!";
            }
        }

        if(formData.password.length < 5){
            error.error = true;
            error.msg = "Password must be longer than 5 characters!";
        }

        setError(error);
        if(!error.error){
            let token = await JoblyApi.register(formData);
            let currUser = await JoblyApi.getUser(formData.username);
            setCurrUser(currUser);
            setToken(token);
            setFormData(INITIAL_STATE);
            setUser(currUser);
            setError(INITIAL_ERROR);
            returnHome();
        }
    }

    const login = async () => {
        if(formData.password === "" || formData.username === ""){
            error.error = true;
            error.msg = "All inputs must be filled!";
        }
        if(!error.error){
            try{
                let token = await JoblyApi.authenticate({username: formData.username, password: formData.password});
                let currUser = await JoblyApi.getUser(formData.username);
                setUser(currUser);
                setCurrUser(currUser);
                setToken(token);
                setFormData(INITIAL_STATE);
                setError(INITIAL_ERROR);
                returnHome();
            } catch(err){
                console.log(err);
                error.error = true;
                error.msg = "Either username or password is incorrect.";
            }
        }
        setError(error);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let classes = [...e.target.classList]
        if(classes.includes("SignupForm")){
            signup();
        } else if(classes.includes("LoginForm")){
            login();
        } 
    }

    return(
        <>
            <NavBar signout={signout} currUser={user}/>
            <div className="main">
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/companies">
                    <List type="companies"/>     
                </Route>
                <Route exact path="/jobs">
                    <List type="jobs"/>     
                </Route>
                <Route exact path="/companies/:handle">
                    <CompanyDetails />
                </Route>
                <Route exact path="/signup">
                    <SignupForm 
                        onChange={onChange} 
                        handleSubmit={handleSubmit} 
                        formData={formData} 
                        error={error}
                    />
                </Route>
                <Route exact path="/login">
                    <LoginForm 
                        onChange={onChange} 
                        handleSubmit={handleSubmit} 
                        formData={formData} 
                        error={error}
                    />
                </Route>
                <Route exact path="/profile">
                    <Profile user={user}/>
                </Route>
            </div>
        </>
    )
}

export default Routes;