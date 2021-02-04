import React from 'react';
import Avatar from "@material-ui/core/Avatar";


function Post({userName, captions, imageUrl, postAvatar}) {

    return(
        <div className="Post">
            <div className="avatar">
                <Avatar className="post-header"
                        alt = "your-avatar"
                        src={postAvatar}>
                </Avatar>
                <h5 className="post-user-name-top">{userName}</h5>

            </div>

            {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
            <img className = "user-image"
                 src={imageUrl}
                 alt="random-image"
            />
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
