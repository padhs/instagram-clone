import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import InstaTab from "../InstaTab";
import Button from '@material-ui/core/Button';
import '../../App.css'
import { useFirebaseBtnStyles } from '@mui-treasury/styles/button/firebase';
import SettingsIcon from '@material-ui/icons/Settings';
import Dialog from "@material-ui/core/Dialog";





function Profile() {

    const avatarUseStyles = makeStyles((theme) => ({
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
    }))
    const styles = useFirebaseBtnStyles();
    const [open, setOpen] = useState(false);


    return(
        <div className='user-profile'>

            <div className='settings-modal'>
                <Dialog onClose={() => {setOpen(false)}} aria-labelledby="customized-dialog-title" open={open}>
                    <div className='profile-options'>
                        <div className='profile-options-dialog'>
                            Change Password
                        </div>
                        <div className='profile-options-dialog'>
                            Nametag
                        </div>
                        <div className='profile-options-dialog'>
                            Apps and Websites
                        </div>
                        <div className='profile-options-dialog'>
                            Notifications
                        </div>
                        <div className='profile-options-dialog'>
                            Privacy and Security
                        </div>
                        <div className='profile-options-dialog'>
                            Login Activity
                        </div>
                        <div className='profile-options-dialog'>
                            Emails from Instagram
                        </div>
                        <div className='profile-options-dialog'>
                            Report a Problem
                        </div>
                    </div>
                </Dialog>
            </div>

            <div className="profile-page">
                <div className="avatar-info">
                    <div className="avatar-profile">
                        <Avatar alt="profile-avatar" className={avatarUseStyles().large} src="https://thispersondoesnotexist.com/image"/>
                    </div>
                    <div className="info">
                        <div className="profile-info">
                            <div className="username">
                                <p>padhs</p>
                            </div>
                            <div className="edit-profile">
                                <Button classes={styles} variant={'contained'} color={'primary'}>
                                    Edit Profile
                                </Button>
                            </div>
                            <div className="profile-settings">
                                <SettingsIcon onClick={() => {setOpen(true)}}/>
                            </div>
                        </div>
                        <div className='personal-info'>
                            <div className='profile-posts'>
                                <strong>0</strong> <p className='write-info'>posts</p>
                            </div>
                            <div className='profile-followers'>
                                <strong>0</strong> <p className='write-info'>followers</p>
                            </div>
                            <div className='profile-following'>
                                <strong>0</strong> <p className='write-info'>following</p>
                            </div>
                        </div>
                        <div className="user-full-name">
                            <p>Arosek Padhi</p>
                        </div>
                    </div>
                </div>
                <div className="meu-tab-profile">
                    <InstaTab />
                </div>
            </div>
        </div>
    )
}


export default Profile