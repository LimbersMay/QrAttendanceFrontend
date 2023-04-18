import React from "react";
import {AppBar, Avatar, Box, Grid, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography} from "@mui/material";
import {MenuOutlined} from "@mui/icons-material";
import {useAuthSlice} from "../../hooks/useAuthSlice";

export const NavBar = ({ handleDrawerToggle, drawerWidth = 240 }: {handleDrawerToggle: any, drawerWidth: number }) => {

    const { startLogout, displayName } = useAuthSlice();

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = async () => {
        await startLogout();
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
                    onClick={handleDrawerToggle}
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

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt={`${displayName}`} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Typography textAlign="center">Profile</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Typography textAlign="center">My account</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleLogout}>
                                <Typography textAlign="center">Logout</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}
