import {useSelector} from "react-redux";
import {
    Box, Button,
    Divider,
    Drawer,
    Grid, List, Theme,
    Toolbar,
    Typography, useMediaQuery
} from "@mui/material";
import {SideBarItem} from "./SideBarItem";
import {selectGroup, startNewGroup} from "../../store/qrAttendance";
import {useAppDispatch} from "../../store";
import {selectAuth} from "../../store/auth";
import React from "react";

export const SideBar = ({ drawerWidth, mobileOpen, handleDrawerToggle}: {drawerWidth: number, mobileOpen: boolean, handleDrawerToggle: any}) => {

    const { groups } = useSelector(selectGroup);
    const { displayName } = useSelector(selectAuth);

    const isSmallScreen = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'));

    const dispatch = useAppDispatch();

    const handleNewGroup = () => {
        dispatch(startNewGroup());
    }

    return (
        <Box
            component='nav'
            sx={{
                width: { sm: drawerWidth , md: drawerWidth }, flexShrink: { sm: 0 },
                display: { sm: 'block' }
            }}
        >
            <Drawer
                variant={ isSmallScreen ? 'temporary' : 'permanent'} // Temporary
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: {xs: 'block', sm: 'block'},
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
