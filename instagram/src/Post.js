import React, {useState, useEffect} from 'react';
import Avatar from "@material-ui/core/Avatar";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Modal from "@material-ui/core/Modal";
import makeStyles from "@material-ui/core/styles/makeStyles";
import UseAnimations from "react-useanimations";
import heart from "react-useanimations/lib/heart";
import bookmark from "react-useanimations/lib/bookmark";
import TelegramIcon from "@material-ui/icons/Telegram";
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import {database} from "./firebase";
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import Button from "@material-ui/core/Button";
import firebase from "firebase";


function menuModalStyle() {
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

function Post({userName, captions, imageUrl, postAvatar, postId, user}) {

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    const modalStyle = useState(menuModalStyle);
    const classes = useStyles();
    const [openMenuModal, setOpenMenuModal] = useState(false);

    useEffect(() => {
        let unsubscribe;
        if(postId){
            unsubscribe = database
                .collection("posts")
                .doc(postId)
                .collection("comments")
                .orderBy("timestamp", "desc")
                .onSnapshot((snapshot => {
                    setComments(snapshot.docs.map((doc) => doc.data()))
                }));
        }

        return() => {
            unsubscribe();
        };
    }, [postId]);

    const postComment = (event) => {
        event.preventDefault();
        database.collection("posts").doc(postId).collection("comments").orderBy("timestamp","asc").add({
            userName: user.displayName,
            text: comment,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()});
        setComment('');
    }

    return(
        <div className="Post">

            <div className="modal-class-menu">
                <Modal
                    //this is the menu-modal for a post.
                    open={openMenuModal}
                    onClose={() => setOpenMenuModal(false)}>
                    <div
                        className={classes.paper}
                        style={modalStyle}>
                        {
                            <div className="ul-items">
                                <ul>
                                    <li>
                                        First List Item.
                                    </li>
                                </ul>
                            </div>
                        }
                    </div>
                </Modal>
            </div>

            <div className="avatar">
                <div className="avatar-left">
                    <Avatar className="post-header"
                            alt = "your-avatar"
                            src={postAvatar}>
                    </Avatar>
                    <h4 className="post-user-name-top">{userName}</h4>
                </div>
                <div className="avatar-right">
                    <ExpandMoreIcon
                        onClick={() => setOpenMenuModal(true)}
                        fontSize="30"> </ExpandMoreIcon>
                </div>
            </div>

            <div className="user-image-post">
                <img className = "user-image"
                     src={imageUrl}
                     alt="random-image"
                />
            </div>
            <div className="post-button-collection">
                <div className="post-buttons">
                    <div className="individual-post-button">
                        <UseAnimations
                            animationKey="heart"
                            size={30}
                            style={{ cursor: "pointer",padding: 100 }}
                            animation={heart}/>
                    </div>
                    <div className="individual-post-button">
                        <div className="comment-post-icon">
                            <ModeCommentIcon style={{ fontSize: 23 }} />
                        </div>
                    </div>
                    <div className="individual-post-button">
                        <div className="telegram-post-icon">
                            <TelegramIcon style={{ fontSize: 25 }} />
                        </div>
                    </div>
                </div>
                <div className="last-post-button">
                    <div className="individual-post-button">
                        <UseAnimations
                            animationKey="bookmark"
                            size={30}
                            style={{ cursor: "pointer",padding: 100 }}
                            animation={bookmark}/>
                    </div>
                </div>
            </div>
            <div>
                <h5 className= "post-user-name-bottom" >
                    <strong className="post-description-name">
                        {userName}
                    </strong>
                    {captions}
                </h5>
                <div className="user-post-comments">
                    <div className="view-comments">
                        <p>view all comments</p>
                    </div>
                    {comments.map((comment) => (
                        <h5>
                            <strong>{comment.userName}</strong> {comment.text}
                        </h5>
                    ))}
                </div>
                <div className="post-comments">
                    <form className="comment-form">
                        <div className="emoticon-button">
                            <InsertEmoticonIcon style={{ fontSize: 25 }}/>
                        </div>
                        <input  className="post-input"
                                type="text"
                                placeholder="Add a comment..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}/>
                        <div className="comment-post-button">
                            <Button
                                className="comment-post-button"
                                disabled={!comment}
                                type="submit"
                                color="primary"
                                variant="text"
                                onClick={postComment}>
                                Post
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Post
