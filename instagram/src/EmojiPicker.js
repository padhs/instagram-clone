import React from 'react';
import NavBar from "./components/NavBar";
import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import Home from './components/screens/Home';
import Login from "./components/screens/Login";
import Profile from "./components/screens/Profile";
import SignUp from "./components/screens/SignUp";
import Footer from "./components/Footer";


function EmojiPicker(){


    return(
        <BrowserRouter>
            <Route exact path = "/">
                <NavBar />
                <Home />
                <Footer />
            </Route>
            <Route path = "/profile">
                <NavBar />
                <Profile />
                <Footer />
            </Route>
            <Route path = "/login">
                <Login />
            </Route>
            <Route path = "/signup">
                <SignUp />
            </Route>
        </BrowserRouter>
    )
}


export default EmojiPicker