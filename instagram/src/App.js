import React, {useState, useEffect} from 'react';
import './App.css';
import Post from './Post.js'
import { database, auth } from "./firebase";
import Modal from "@material-ui/core/Modal";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";


function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'relative',
        width: 700,
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ddd',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function App() {

    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [posts, setPosts] =useState([]);
    //this is for the login modal(a small piece of dialog-box which will take username and pass)
    const [open, setOpen] = useState (false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState('')
    const [openSignIn, setOpenSignIn] = useState(false);
    //user is understood as an object.
    //By default there is no user (so null) useState is going to change the object type when there is a user logged in (not null).

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
        setOpen(false);
    }
    //this will close the login modal
    const closeHandler = () => {
        setOpen(false);
    };
    const logIn = (event) => {
        event.preventDefault();
        auth
            .signInWithEmailAndPassword(email, password)
            .catch((error) => alert(error.message));
        setOpenSignIn(false);
    }


    //this is the modal(dialog-box design)
    //modal for signup. not for login
    const body = (
        <div className="modal-insta-logo">
            <img className="modal-phone-pic"
                 src="https://firebasestorage.googleapis.com/v0/b/instagram-clone-7a115.appspot.com/o/normalphone.png?alt=media&token=bf47c0ad-9094-4f50-b785-31370285570b"
                 alt="phone-image"/>
            <form className="signup-form">
                <img
                    className="insta-logo-login"
                    width="174.99"
                    height="50.99"
                    src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                    alt="insta-letter-logo"/>
                <Input
                    className="username-login"
                    placeholder="username"
                    type="text"
                    value={username}
                    onChange={(username) => setUsername(username.target.value)}/>
                <Input
                    className="email-login"
                    placeholder="email"
                    type="text"
                    value={email}
                    onChange={(email) => setEmail(email.target.value)} />

                <Input
                    className="pass-login"
                    placeholder="password"
                    type="password"
                    value={password}
                    onChange={(pass) => setPassword(pass.target.value)} />

                <Button
                    className="signin-button"
                    onClick={handleSignIn}
                    type="submit">
                    SIGN UP
                </Button>
            </form>
        </div>
    );

    //this code comes into work anytime when an user gets logged in or out as the state of the user(object) gets changed.
    useEffect(() => {
        const verifyUser = auth.onAuthStateChanged((authUser) => {
         if (authUser) {
             //user has logged in.
             console.log(authUser);//this is for my convenience. not for the user.
             setUser(authUser);//uses cookie tracking.(so this is persistent)
             //state is not persistent
         } else {
             //user is not logged in. (logged out.)
             setUser(null)
         }

        })
        return () => {
            //check if the user is spamming. (creating too many login sessions too quick)
            verifyUser();
            //detach the listener so that we don't have too many listeners created.(in case someone is out of their minds.)
            //if the user didn't do that earlier, it will then fire the useEffect
        }
    }, [user, username]);

    useEffect(() => {
        database.collection('posts').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({id: doc.id, posts: doc.data()})));
        })},
        []);
    //not dependent on posts now. cause we are mapping document id with each post.



  return (
    <div className = "app">
        <Modal
            //this is the modal for Sign Up.
            open={open}
            onClose={closeHandler}>
            <div
                className={classes.paper}
                 style={modalStyle}>
                 {body}
            </div>
        </Modal>

        <Modal
            //this is the modal for login. this should have a signup button(conditional rendering.)
            open={openSignIn}
            onClose={() => setOpenSignIn(false)}>
            <div
                className={classes.paper}
                style={modalStyle}>
                <div className="modal-insta-logo">
                    <img className="modal-phone-pic"
                         src="https://firebasestorage.googleapis.com/v0/b/instagram-clone-7a115.appspot.com/o/normalphone.png?alt=media&token=bf47c0ad-9094-4f50-b785-31370285570b"
                         alt="phone-image"/>
                    <form className="signup-form">
                        <img
                            className="insta-logo-login"
                            width="174.99"
                            height="50.99"
                            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                            alt="insta-letter-logo"/>

                        <Input
                            className="email-login"
                            placeholder="email"
                            type="text"
                            value={email}
                            onChange={(email) => setEmail(email.target.value)} />

                        <Input
                            className="pass-login"
                            placeholder="password"
                            type="password"
                            value={password}
                            onChange={(pass) => setPassword(pass.target.value)} />

                        <Button
                            className="signin-button"
                            onClick={logIn}
                            type="submit">
                            LOG IN
                        </Button>
                        <p className="forgot-pass">Forgot Password?</p>
                        <div className="no-account">
                            <p className="signup-instead">Dont have an account? Sign Up instead (click on the <strong>SIGN UP</strong> button down below.)</p>

                            <Button
                                className="login-button"
                                onClick={() => setOpen(true)}
                                type="submit">
                                SIGN UP
                            </Button>

                        </div>
                    </form>
                </div>
            </div>
        </Modal>

        <div className= "nav-bar">
          <img className="nav-bar-image"
               src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
               alt="insta-letter-logo"
          />
      </div>
        {user ?
            (<Button onClick={() => auth.signOut()}>LOG OUT</Button>):
            <div className="app-login-container">
                <Button onClick={() => setOpen(true)}>SIGN UP</Button>
                <Button onClick={() => setOpenSignIn(true)}>LOG IN</Button>
            </div>
        }

        {
            posts.map(({id, posts}) => (
                <Post

                    key={id}
                    //mapping document id so that react doesn't re-render a post that is already showing.
                    userName={posts.userName}
                    captions={posts.captions}
                    imageUrl={posts.imageUrl}
                    postAvatar={posts.postAvatar}/>
            ))
        }
    </div>
  );
}

export default App;