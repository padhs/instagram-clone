import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import InstaTab from "../InstaTab";
import '../../App.css'


const useStyles = makeStyles((theme) => ({
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
        width: theme.spacing(20),
        height: theme.spacing(20),
    },
}));

function Profile(){

    const classes = useStyles();

    return(
        <div className="profile-page">
            <div className="avatar-info">
                <div className="avatar-profile">
                    <Avatar alt="profile-avatar" className={classes.large} src="https://thispersondoesnotexist.com/image"/>
                </div>
                <div className="info">
                    <div>
                        <div className="username">

                        </div>
                        <div className="edit-profile">

                        </div>
                        <div className="profile-settings">

                        </div>
                    </div>
                    <div className="post-info">

                    </div>
                    <div className="followers-info">

                    </div>
                    <div className="following-info">

                    </div>
                </div>
                <div className="user-full-name">

                </div>
            </div>
            <div className="meu-tab-profile">
                <InstaTab />
            </div>
        </div>
    )
}


export default Profile