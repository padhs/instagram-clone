import React, {useState} from 'react'
import Button from "@material-ui/core/Button";
import {auth} from "../../firebase";
import InputBase from '@material-ui/core/InputBase';
import Box from '@material-ui/core/Box';
import { useRoundInputBaseStyles } from '@mui-treasury/styles/inputBase/round';
import {Link} from 'react-router-dom';
import '../../App.css';
import { useTwitterBtnStyles } from '@mui-treasury/styles/button/twitter';
import { usePushingGutterStyles } from '@mui-treasury/styles/gutter/pushing';



function Login(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const styles = useRoundInputBaseStyles();

    const buttonStyles = useTwitterBtnStyles();
    const mainStyles = usePushingGutterStyles({
        cssProp: 'marginTop',
        space: 2,
        firstExcluded: true
    });

    const wrapperStyles = usePushingGutterStyles();

    const logIn = (event) => {
        event.preventDefault();
        auth
            .signInWithEmailAndPassword(email, password)
            .catch((error) => alert(error.message));
    }

    return(
        <div className="login-page">
            <div className="signup-page">
                <div className="signin-pic">
                    <img className="modal-phone-pic"
                         src="https://firebasestorage.googleapis.com/v0/b/instagram-clone-7a115.appspot.com/o/normalphone.png?alt=media&token=bf47c0ad-9094-4f50-b785-31370285570b"
                         alt="phone-image"/>
                </div>
                <div className="signin-form">
                    <form className="signup-form">
                        <div className="insta-logo-login">
                            <img
                                className="insta-logo-login-page"
                                width="174.99"
                                height="50.99"
                                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                                alt="insta-letter-logo"/>
                        </div>

                        <div className="login-input-buttons">
                            <InputBase classes={styles} type= "text" placeholder={'email'} value={email} onChange={(email) => {setEmail(email.target.value)}}/>
                            <Box pb={1} />
                            <InputBase classes={styles} type= "password" placeholder={'password'} value={password} onChange={(password) => {setPassword(password.target.value)}}/>
                            <Box pb={3} />
                        </div>

                        <div className={mainStyles.parent}>
                            <div className={wrapperStyles.parent}>
                                <Button
                                    className="signin-button"
                                    classes={buttonStyles}
                                    color={'primary'}
                                    variant={'contained'}
                                    size={'default'}
                                    type="submit"
                                    onClick={logIn}>
                                    Login
                                </Button>
                            </div>
                        </div>

                        <p className="forgot-pass">Forgot Password?</p>
                        <div className="no-account">
                            <p className="signup-instead">Dont have an account? Sign Up instead</p>

                            <Link className= "text-link" to="/signup">
                                <Button
                                    className="login-signup-button"
                                    color="secondary"
                                    variant="text">
                                    SIGN UP
                                </Button>
                            </Link>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default Login