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
import {selectGroup} from "../../store/qrAttendance";

export const SideBar = ({ drawerWidth = 240}) => {

    const { groups } = useSelector(selectGroup);

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
                        LimbertMay
                    </Typography>
                </Toolbar>
                <Divider />

                <List>
                    <Grid container direction='column' display='flex' alignItems='center' alignContent='center'>
                        <Button fullWidth>New Group</Button>
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
