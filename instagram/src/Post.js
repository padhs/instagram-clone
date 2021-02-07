import React, {useState} from 'react';
import Avatar from "@material-ui/core/Avatar";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Modal from "@material-ui/core/Modal";
import makeStyles from "@material-ui/core/styles/makeStyles";
import UseAnimations from "react-useanimations";
import heart from "react-useanimations/lib/heart";
import bookmark from "react-useanimations/lib/bookmark";
import TelegramIcon from "@material-ui/icons/Telegram";
import ModeCommentIcon from '@material-ui/icons/ModeComment';


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

function Post({userName, captions, imageUrl, postAvatar}) {

    const [comments, setComments] = useState([]);
    const modalStyle = useState(menuModalStyle);
    const classes = useStyles();
    const [openMenuModal, setOpenMenuModal] = useState(false);


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
                    <h5 className="post-user-name-top">{userName}</h5>
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
                            <ModeCommentIcon style={{ fontSize: 25 }} />
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
                <h6 className= "post-user-name-bottom" >
                    <strong className="post-description-name">
                        {userName}
                        {/*this is the username below the post*/}
                        {/*we use strong to replicate the bold tag in HTML.*/}
                    </strong>
                    {captions}
                    {/*This is the user-set captions below the post.*/}
                </h6>
                {/*show different user comments*/}
                {/*add a comment... (user who sees the post can add a comment and post button.)*/}
            </div>
        </div>
    )
}

export default Post
