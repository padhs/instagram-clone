import React, {useState} from 'react'
import Button from "@material-ui/core/Button";
import {auth} from "../../firebase";
import InputBase from "@material-ui/core/InputBase";
import Box from "@material-ui/core/Box";
import {useRoundInputBaseStyles} from '@mui-treasury/styles/inputBase/round';
import {Link} from "react-router-dom";
import { useTwitterBtnStyles } from '@mui-treasury/styles/button/twitter';
import { usePushingGutterStyles } from '@mui-treasury/styles/gutter/pushing';
import phonePic from '../normalphone.png'


function SignUp(){

    const styles = useRoundInputBaseStyles();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');

    const handleSignIn = (event) => {
        event.preventDefault();
        //removal of this would result the user never being able to log in.
        //preventDefault does not refresh the page, that it would do by-default when we hit the login button.
        auth.createUserWithEmailAndPassword(email, password)
            .then((authUser => {
                return authUser.user.updateProfile({
                    displayName: username
                })
            }))
            .catch((error) => alert(error.message));
    }

    const buttonStyles = useTwitterBtnStyles();
    const mainStyles = usePushingGutterStyles({
        cssProp: 'marginTop',
        space: 2,
        firstExcluded: true
    });
    const wrapperStyles = usePushingGutterStyles();


    return(
        <div className="modal-insta-logo">
            <img className="modal-phone-pic"
                 src={phonePic}
                 alt="phone-image"/>
            <form className="signup-form">
                <div className="insta-logo-login">
                    <img
                        className="insta-logo-signup"
                        width="174.99"
                        height="50.99"
                        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                        alt="insta-letter-logo"/>
                </div>

                <div className="login-input-buttons">
                    <InputBase classes={styles} type="text" placeholder={'Full Name'} value={fullName} onChange={(fullName) => {setFullName(fullName.target.value)}}/>
                    <Box pb={1}/>
                    <InputBase classes={styles} type= "text" placeholder={'username'} value={username} onChange={(email) => {setUsername(email.target.value)}}/>
                    <Box pb={1} />
                    <InputBase classes={styles} type= "text" placeholder={'email'} value={email} onChange={(password) => {setEmail(password.target.value)}}/>
                    <Box pb={1} />
                    <InputBase classes={styles} type= "password" placeholder={'password'} value={password} onChange={(password) => {setPassword(password.target.value)}}/>
                    <Box pb={3} />
                </div>

                <div className={mainStyles.parent}>
                    <div className={wrapperStyles.parent}>
                        <Button
                            className="signin-button"
                            classes={buttonStyles}
                            color={'secondary'}
                            variant={'contained'}
                            size={'default'}
                            type="submit"
                            onClick={handleSignIn}>
                            Sign Up
                        </Button>
                    </div>
                </div>

                <p className="i-account">
                    I have an account. Login instead.
                </p>

                <Link className="text-link" to = "/login">
                    <Button
                        className="login-in-signin-modal"
                        color="primary"
                        variant="text"
                        onClick={false}>
                        LOG IN
                    </Button>
                </Link>

            </form>
        </div>
    )
}


export default SignUp