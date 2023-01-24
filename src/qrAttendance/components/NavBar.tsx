import {AppBar, Grid, IconButton, Toolbar, Typography} from "@mui/material";
import {LogoutOutlined, MenuOutlined} from "@mui/icons-material";
import {useAppDispatch} from "../../store";
import {startLogout} from "../../store/auth/thunks";

export const NavBar = ({ drawerWidth = 240 }) => {

    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(startLogout());
    }

    return (
        <AppBar
            position='fixed'
            sx={{
                width: {sm: `calc(100% - ${drawerWidth}px)`},
                ml: {sm: `${drawerWidth}px`}
            }}
        >
            <Toolbar>
                <IconButton
                    color='inherit'
                    edge='start'
                    sx={{
                        mr: 2,
                        display: {sm: 'none'}
                    }}
                >
                    <MenuOutlined />
                </IconButton>

                <Grid
                    container
                    direction='row'
                    justifyContent='space-between'
                    alignItems='center'
                >
                    <Typography variant='h6' noWrap component='div'>QrAttendance</Typography>

                    <IconButton color='error' onClick={handleLogout}>
                        <LogoutOutlined/>
                    </IconButton>
                </Grid>

            </Toolbar>
        </AppBar>
    )
}
