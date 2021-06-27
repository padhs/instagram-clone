import React from "react";
import Tab from "@material-ui/core/Tab";
import GridOnOutlined from "@material-ui/icons/GridOnOutlined";
import LiveTv from "@material-ui/icons/LiveTv";
import BookmarkBorderOutlined from "@material-ui/icons/BookmarkBorderOutlined";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import Tabs from "@material-ui/core/Tabs";
import '../App.css'

function InstaTab(){

    const [tabIndex, setTabIndex] = React.useState(0);

    return(
        <div className='profile-tab'>
            <Tabs
                indicatorColor={'primary'}
                className="posts-tab"
                value={tabIndex}
                onChange={(e, index) => setTabIndex(index)}
                variant={'centered'}>
                <Tab label={<div className='tab-option'>
                    <div>
                        <GridOnOutlined />
                    </div>
                    <div className={'tab-name'}>
                        POSTS
                    </div>
                </div>} />
                <Tab label={<div className='tab-option'>
                    <div>
                        <LiveTv />
                    </div>
                    <div className={'tab-name'}>
                        IGTV
                    </div>
                </div>} />
                <Tab label={<div className='tab-option'>
                    <div>
                        <BookmarkBorderOutlined />
                    </div>
                    <div className={'tab-name'}>
                        SAVED
                    </div>
                </div>} />
                <Tab label={<div className='tab-option'>
                    <div>
                        <PeopleOutlineIcon />
                    </div>
                    <div className={'tab-name'}>
                        TAGGED
                    </div>
                </div>} />
            </Tabs>
        </div>
    )
}

export default InstaTab