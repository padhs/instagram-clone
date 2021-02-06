import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from "@material-ui/core/Button";
import UseAnimations from "react-useanimations";
import settings from "react-useanimations/lib/settings";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import BookmarkIcon from '@material-ui/icons/Bookmark';



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


function CustomizedMenus() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <UseAnimations
                animationKey="settings"
                size={30}
                onClick={handleClick}
                style={{ cursor: "pointer",padding: 100 }}
                animation={settings}/>
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <StyledMenuItem>
                    <ListItemIcon>
                        <AccountCircleIcon style={{ fontSize: 30 }} />
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
                            aria-controls="customized-menu"
                            aria-haspopup="true"
                            variant="contained"
                            color="secondary">
                            LOG OUT
                        </Button>
                    </ListItemIcon>
                </StyledMenuItem>
            </StyledMenu>
        </div>
    );
}

