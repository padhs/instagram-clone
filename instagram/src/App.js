import React, {useState, useEffect} from 'react';
import './App.css';
import Post from './Post.js';
import { database, auth } from "./firebase";
import Modal from "@material-ui/core/Modal";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import Avatar from "@material-ui/core/Avatar";
import UseAnimations from "react-useanimations";
import explore from 'react-useanimations/lib/explore';
import heart from 'react-useanimations/lib/heart';
import HomeIcon from '@material-ui/icons/Home';
import searchToX from 'react-useanimations/lib/searchToX';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SettingsIcon from '@material-ui/icons/Settings';
import BookmarkIcon from '@material-ui/icons/Bookmark';
//import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'; //use fontSize="large"


const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.grey,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.black,
            },
        },
    },
}))(MenuItem);


function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
        backgroundColor: 'white'
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'relative',
        width: 800,
        backgroundColor: '#ffffff',
        padding: theme.spacing(2, 4, 3)
    },
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    large: {
        width: theme.spacing(8),
        height: theme.spacing(8),
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
    const [anchorEl, setAnchorEl] = useState(null);
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

    const logIn = (event) => {
        event.preventDefault();
        auth
            .signInWithEmailAndPassword(email, password)
            .catch((error) => alert(error.message));
        setOpen(false);
    }
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    //this is the modal(dialog-box design)
    //modal for signup. not for login
    const body = (
        <div className="modal-insta-logo">
            <img className="modal-phone-pic"
                 src="https://firebasestorage.googleapis.com/v0/b/instagram-clone-7a115.appspot.com/o/normalphone.png?alt=media&token=bf47c0ad-9094-4f50-b785-31370285570b"
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
                    color="secondary"
                    variant="contained"
                    type="submit">
                    SIGN UP
                </Button>
                <p className="i-account">
                    I have an account. Login instead.
                </p>
                <Button
                    className="login-in-signin-modal"
                    color="primary"
                    variant="text"
                    onClick={() => setOpen(false)}>
                    LOG IN
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
            onClose={() => setOpen(false)}>
            <div
                className={classes.paper}
                 style={modalStyle}>
                 {body}
            </div>
        </Modal>

        {user ? <div>
            <div className= "nav-bar">
                <div className="nav-bar-image">
                    <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                         alt="insta-letter-logo"
                    />
                </div>
                <div className="search-bar">
                    <div className="search-nav-buttons">
                        <UseAnimations
                            animationKey="searchToX"
                            size={30}
                            style={{ cursor: "pointer",padding: 100 }}
                            animation={searchToX}/>
                        <Input
                            placeholder="Search..."
                            type="text"/>
                    </div>
                </div>
                <div className="page-buttons">
                    <div className="nav-buttons">
                        <HomeIcon style={{ fontSize: 30 }} />
                    </div>
                    <div className="nav-buttons">
                        <ChatBubbleOutlineIcon style={{ fontSize: 25, padding: '4px' }}/>
                    </div>
                    <div className="nav-buttons">
                        <UseAnimations
                            animationKey="explore"
                            size={30}
                            style={{ cursor: "pointer",padding: 100 }}
                            animation={explore}/>
                    </div>
                    <div className="nav-buttons">
                        <UseAnimations
                            animationKey="heart"
                            size={30}
                            style={{ cursor: "pointer",padding: 100 }}
                            animation={heart}/>
                    </div>
                    <div className="nav-buttons">
                        <div>
                            <div className="settings-menu-avatar">
                                <Avatar
                                    className={classes.small}
                                    alt = "settings-avatar"
                                    onClick={handleClick}
                                    src = "">
                                </Avatar>
                            </div>
                            <StyledMenu
                                id="customized-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <StyledMenuItem>
                                    <ListItemIcon>
                                        <AccountCircleIcon fontSize="30" />
                                    </ListItemIcon>
                                    <ListItemText primary="Profile" />
                                </StyledMenuItem>
                                <StyledMenuItem>
                                    <ListItemIcon>
                                        <BookmarkIcon fontSize="30"/>
                                    </ListItemIcon>
                                    <ListItemText primary="Saved" />
                                </StyledMenuItem>
                                <StyledMenuItem>
                                    <ListItemIcon>
                                        <SettingsIcon fontSize="30" />
                                    </ListItemIcon>
                                    <ListItemText primary="Settings" />
                                </StyledMenuItem>
                                <StyledMenuItem>
                                    <ListItemIcon>
                                        <Button
                                            className="logout-navbar-button"
                                            aria-controls="customized-menu"
                                            aria-haspopup="true"
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => auth.signOut()}>SIGN OUT</Button>
                                    </ListItemIcon>
                                </StyledMenuItem>
                            </StyledMenu>
                        </div>
                    </div>
                </div>
            </div>
            <div className="app-container">
                <div className="app-login-container">
                    {
                        posts.map(({id, posts}) => (
                            <Post
                                className="column-direction"
                                key={id}
                                //mapping document id so that react doesn't re-render a post that is already showing.
                                userName={posts.userName}
                                captions={posts.captions}
                                imageUrl={posts.imageUrl}
                                postAvatar={posts.postAvatar}/>
                        ))
                    }
                </div>
                <div className="instagram-embed">
                    <div className="embed-unit">
                        <div className="one-flex-unit">
                            <Avatar
                                className={classes.large}
                                alt = "embed-avatar"
                                src = "https://thispersondoesnotexist.com/image">
                            </Avatar>
                            <div className="embed-username">
                                <div className="embed-username-1">
                                    <h4 className="embed-user">
                                        <strong>mark.Rober</strong>
                                    </h4>
                                    <p className="follow-by">followed by padhs</p>
                                </div>
                            </div>
                        </div>
                        <div className="folllow-button">
                            <div className="follow-button-1">
                                <p className="follow-me"><strong>Switch</strong></p>
                            </div>
                        </div>
                    </div>
                    <div className="suggestions">
                        <h4>Suggestions For You</h4>
                    </div>
                    <div className="embed-unit">
                        <div className="one-flex-unit">
                            <Avatar
                                className="embed-classname"
                                alt = "embed-avatar"
                                src = "https://thispersondoesnotexist.com/image">
                            </Avatar>
                            <div className="embed-username">
                                <h5 className="embed-user">
                                    <strong>@sish.Chanchlani Vines</strong>
                                </h5>
                                <p className="follow-by">followed by dorkyhead</p>
                            </div>
                        </div>
                        <div className="folllow-button">
                            <p className="follow-me"><strong>Follow</strong></p>
                        </div>
                    </div>
                    <div className="embed-unit">
                        <div className="one-flex-unit">
                            <Avatar
                                className="embed-classname"
                                alt = "embed-avatar"
                                src = "https://thispersondoesnotexist.com/image">
                            </Avatar>
                            <div className="embed-username">
                                <h5 className="embed-user">
                                    <strong>MKBHD</strong>
                                </h5>
                                <p className="follow-by">followed by POTHI</p>
                            </div>
                        </div>
                        <div className="folllow-button">
                            <p className="follow-me"><strong>Follow</strong></p>
                        </div>
                    </div>
                    <div className="embed-unit">
                        <div className="one-flex-unit">
                            <Avatar
                                className="embed-classname"
                                alt = "embed-avatar"
                                src = "https://thispersondoesnotexist.com/image">
                            </Avatar>
                            <div className="embed-username">
                                <h5 className="embed-user">
                                    <strong>unbx^^:_:^^therapy</strong>
                                </h5>
                                <p className="follow-by">suggested for you</p>
                            </div>
                        </div>
                        <div className="folllow-button">
                            <p className="follow-me"><strong>Follow</strong></p>
                        </div>
                    </div>
                    <div className="embed-unit">
                        <div className="one-flex-unit">
                            <Avatar
                                className="embed-classname"
                                alt = "embed-avatar"
                                src = "https://thispersondoesnotexist.com/image">
                            </Avatar>
                            <div className="embed-username">
                                <h5 className="embed-user">
                                    <strong>some.RANDOM.person</strong>
                                </h5>
                                <p className="follow-by">suggested for you</p>
                            </div>
                        </div>
                        <div className="folllow-button">
                            <p className="follow-me"><strong>Follow</strong></p>
                        </div>
                    </div>
                    <div className="embed-unit">
                        <div className="one-flex-unit">
                            <Avatar
                                className="embed-classname"
                                alt = "embed-avatar"
                                src = "https://thispersondoesnotexist.com/image">
                            </Avatar>
                            <div className="embed-username">
                                <h5 className="embed-user">
                                    <strong>#theCreator</strong>
                                </h5>
                                <p className="follow-by">suggested for you</p>
                            </div>
                        </div>
                        <div className="folllow-button">
                            <p className="follow-me"><strong>Follow</strong></p>
                        </div>
                    </div>
                </div>
            </div>
        </div> :
            <div className="modal-insta-logo">
                <div className="signup-page">
                    <img className="modal-phone-pic"
                         src="https://firebasestorage.googleapis.com/v0/b/instagram-clone-7a115.appspot.com/o/normalphone.png?alt=media&token=bf47c0ad-9094-4f50-b785-31370285570b"
                         alt="phone-image"/>
                    <form className="signup-form">
                        <div className="insta-logo-login">
                            <img
                                className="insta-logo-login-page"
                                width="174.99"
                                height="50.99"
                                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                                alt="insta-letter-logo"/>
                        </div>

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
                            color="primary"
                            variant="contained"
                            onClick={logIn}
                            type="submit">
                            LOG IN
                        </Button>
                        <p className="forgot-pass">Forgot Password?</p>
                        <div className="no-account">
                            <p className="signup-instead">Dont have an account? Sign Up instead (click on the <strong>SIGN UP</strong> button down below.)</p>

                            <Button
                                className="login-button"
                                color="primary"
                                variant="contained"
                                onClick={() => setOpen(true)}>
                                SIGN UP
                            </Button>

                        </div>
                    </form>
                </div>
            </div>
        }
    </div>
  );
}

export default App