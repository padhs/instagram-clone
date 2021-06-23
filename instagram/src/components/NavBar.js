import UseAnimations from "react-useanimations";
import HomeIcon from "@material-ui/icons/Home";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import explore from "react-useanimations/lib/explore";
import PopupState, {bindMenu, bindTrigger} from "material-ui-popup-state";
import React, {useState} from "react";
import heart from "react-useanimations/lib/heart";
import Menu from "@material-ui/core/Menu";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Avatar from "@material-ui/core/Avatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ListItemText from "@material-ui/core/ListItemText";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import SettingsIcon from "@material-ui/icons/Settings";
import Button from "@material-ui/core/Button";
import {auth} from "../firebase";
import { withStyles } from '@material-ui/core/styles';
import MenuItem from "@material-ui/core/MenuItem";
import makeStyles from "@material-ui/core/styles/makeStyles";
import AutorenewIcon from '@material-ui/icons/Autorenew';
import '../App.css';
import {Link} from 'react-router-dom';
import InputBase from '@material-ui/core/InputBase';
import Search from '@material-ui/icons/Search';


const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.grey,
            '& .MustItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.black,
            },
        },
    },
}))(MenuItem);

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
        width: theme.spacing(3.2),
        height: theme.spacing(3.2),
    },
    large: {
        width: theme.spacing(8),
        height: theme.spacing(8),
    },
}));

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


function NavBar(){

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null)


    return(
        <div className= "nav-bar">
            <div className="nav-bar-image">
                <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                     alt="insta-letter-logo"
                />
            </div>
            <div className="search-bar">
                <div className="search-nav-buttons">
                    <InputBase
                        className="search-nav"
                        placeholder={' Search...'}
                        startAdornment={<Search color={"inherit"} fontSize={"small"}/>}
                        type="text" />
                </div>
            </div>
            <div className="page-buttons">
                <div className="nav-buttons">
                    <Link className= "link-home" to = "/"><div>
                        <HomeIcon style={{ fontSize: 30 }} />
                    </div>
                    </Link>

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
                    <PopupState
                        variant="popover"
                        popupId="demo-popup-menu">
                        {(popupState) => (
                            <React.Fragment>
                                <UseAnimations animationKey="heart"
                                               size={30}
                                               style={{ cursor: "pointer", padding: 100 }}
                                               animation={heart}
                                               {...bindTrigger(popupState)}/>
                                <Menu {...bindMenu(popupState)}>
                                    <div className="menu-content-heart-item">
                                        <div className="border-icon">
                                            <FavoriteBorderIcon style={{ fontSize: 100}} />
                                        </div>
                                        <div className="menu-activity">
                                            <p>Activity On Your Posts</p>
                                        </div>
                                        <div className="menu-like-comment">
                                            <p>When someone likes or comments on your posts, you'll see it here.</p>
                                        </div>
                                    </div>
                                </Menu>
                            </React.Fragment>
                        )}
                    </PopupState>
                </div>
                <div className="nav-buttons">
                    <div className='menu-items-with-links'>
                        <div className="settings-menu-avatar">
                            <Avatar
                                className={classes.small}
                                alt = "settings-avatar"
                                onClick={(e) => {
                                    setAnchorEl(e.currentTarget)
                                }}
                                src = "https://thispersondoesnotexist.com/image">
                            </Avatar>
                        </div>
                        <StyledMenu
                            id="customized-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={() => {setAnchorEl(null)}
                            }>
                            <StyledMenuItem>
                                <Link className = 'text-link' to = "/profile">
                                    <div className='menu-profile-item'>
                                        <ListItemIcon>
                                            <AccountCircleIcon className='profile-icon' fontSize="30" />
                                        </ListItemIcon>
                                        <ListItemText primary="Profile" />
                                    </div>
                                </Link>
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
                                    <AutorenewIcon />
                                </ListItemIcon>
                                <ListItemText primary="Switch Accounts" />
                            </StyledMenuItem>
                            <Link className = "text-link-signout" to="/login">
                                <div className='sign-out-button'>
                                    <Button
                                        className="logout-navbar-button"
                                        aria-controls="customized-menu"
                                        aria-haspopup="true"
                                        variant="text"
                                        color="secondary"
                                        onClick={() => auth.signOut()}>SIGN OUT
                                    </Button>
                                </div>
                            </Link>
                        </StyledMenu>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default NavBar