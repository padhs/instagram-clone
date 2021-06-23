import instagramTabsStylesHook from "./screens/instagramTabsStyles";
import React from "react";
import Tab from "@material-ui/core/Tab";
import GridOnOutlined from "@material-ui/icons/GridOnOutlined";
import LiveTv from "@material-ui/icons/LiveTv";
import BookmarkBorderOutlined from "@material-ui/icons/BookmarkBorderOutlined";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import Tabs from "@material-ui/core/Tabs";


function InstaTab(){

    const [tabIndex, setTabIndex] = React.useState(0);
    const instaTabsStyles = instagramTabsStylesHook.useTabs();
    const instaTabItemStyles = instagramTabsStylesHook.useTabItem()

    return(
        <div>
            <Tabs
                className="posts-tab"
                classes={instaTabsStyles}
                value={tabIndex}
                onChange={(e, index) => setTabIndex(index)}
            >
                <Tab classes={instaTabItemStyles} label={'POSTS'} icon={<GridOnOutlined />} />
                <Tab classes={instaTabItemStyles} label={'IGTV'} icon={<LiveTv />} />
                <Tab
                    classes={instaTabItemStyles}
                    label={'SAVED'}
                    icon={<BookmarkBorderOutlined />}
                />
                <Tab classes={instaTabItemStyles} label={'TAGGED'} icon={<PeopleOutlineIcon />} />
            </Tabs>
        </div>
    )
}

export default InstaTab