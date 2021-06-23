import {makeStyles, createStyles} from "@material-ui/styles";
import {tabsStyles, tabItemStyles} from './instagramTabsStyles'



const instagramTabsStylesHook = {
    useTabs: makeStyles(tabsStyles()),
    useTabItem: makeStyles(createStyles(tabItemStyles))
};

export default instagramTabsStylesHook