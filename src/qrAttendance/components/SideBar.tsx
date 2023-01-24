import {useSelector} from "react-redux";
import {
    Box, Button,
    Divider,
    Drawer,
    Grid,
    List,
    Toolbar,
    Typography
} from "@mui/material";
import {SideBarItem} from "./SideBarItem";
import {selectGroup, startNewGroup} from "../../store/qrAttendance";
import {useAppDispatch} from "../../store";
import {selectAuth} from "../../store/auth";

export const SideBar = ({ drawerWidth = 240}) => {

    const { groups } = useSelector(selectGroup);
    const { displayName } = useSelector(selectAuth);

    const dispatch = useAppDispatch();

    const handleNewGroup = () => {
        dispatch(startNewGroup());
    }

    return (
        <Box
            component='nav'
            sx={{
                width: { sm: drawerWidth }, flexShrink: { sm: 0 }
            }}
        >
            <Drawer
                variant='permanent' // Temporary
                open
                sx={{
                    display: {xs: 'block'},
                    '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth}
                }}
            >
                <Toolbar>
                    <Typography variant='h6' noWrap component='div'>
                        { displayName }
                    </Typography>
                </Toolbar>
                <Divider />

                <List>
                    <Grid container direction='column' display='flex' alignItems='center' alignContent='center'>
                        <Button onClick={handleNewGroup} fullWidth>New Group</Button>
                    </Grid>
                    {
                        groups.map(group => (
                            <SideBarItem key={group.id} group={group} />
                        ))
                    }
                </List>
            </Drawer>
        </Box>
    )
}
