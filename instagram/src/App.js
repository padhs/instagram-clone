import React, {useState, useEffect} from 'react';
import './App.css';
import Post from './Post.js'
import { database, auth,} from "./firebase";
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
        width: 400,
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

    const handleLogIn = (event) => {
        event.preventDefault();
        auth.createUserWithEmailAndPassword(email, password)
            .catch((error) => alert(error.message));
    }
    //this will close the login modal
    const closeHandler = () => {
        setOpen(false);
    };


    //this is the modal(dialog-box design)
    const body = (
        <div className="modal-insta-logo">
            <form className="signup-form">
                <img
                    className="insta-logo-login"
                    width="174.99"
                    height="50.99"
                    src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                    alt="insta-letter-logo"/>
                <Input
                    className="username-login"
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
                    className="login-button"
                    type="submit"
                    onClick={handleLogIn}>
                    LOGIN
                </Button>
                <p className="forgot-pass">Forgot Password?</p>
                <div className="no-account">
                    <p className="signup-instead">Dont have an account? Sign Up instead</p>
                </div>
            </form>
        </div>
    );

    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
         if (authUser) {
             //user has logged in.
             setUser(authUser);
             //state is not persistent
             //line 97 makes sure that the user remains logged in.
             // if () {}
         }else {
             //user is not logged in. (logged out.)
             setUser(null)
         }
        })}, [user]);

    useEffect(() => {
        database.collection('posts').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({id: doc.id, posts: doc.data()})));
        })},
        []);
    //not dependent on posts now. cause we are mapping document id with each post.



  return (
    <div className = "app">
        <Modal
            open={open}
            close={closeHandler}>
            <div
                className={classes.paper}
                 style={modalStyle}>
                 {body}
            </div>
        </Modal>

        <div className= "nav-bar">
          <img className="nav-bar-image"
               src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
               alt="insta-letter-logo"
          />
      </div>

        <Button
            onClick={() => setOpen(true)}>
            Sign Up
        </Button>
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
