//I want to use JWT for authentication
//this is how the signup/login page should look like.

import React from "react";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";

function signUp () {
    return (
        <div className="signup-page">
            <form className="signup-page-form">
                <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.pngf" alt="insta-letter-logo"/>
            </form>
        </div>
    );
}

export default signUp();
