import {
    Box, Button,
    Divider,
    Drawer,
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon, ListItemText, TextField,
    Toolbar,
    Typography
} from "@mui/material";
import {TurnedInNot} from "@mui/icons-material";

export const SideBar = ({ drawerWidth = 240}) => {

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
                        ['5A', '1B', '5B'].map(text => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <TurnedInNot />
                                    </ListItemIcon>
                                    <Grid container>
                                        <ListItemText primary={text}/>
                                        <ListItemText secondary={'22/04/2021'}/>
                                    </Grid>
                                </ListItemButton>
                            </ListItem>
                        ))
                    }
                </List>
            </Drawer>
        </Box>
    )
}
