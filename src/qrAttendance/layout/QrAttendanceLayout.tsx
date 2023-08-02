import {Toolbar, useMediaQuery, Theme} from "@mui/material";
import { Box } from '@mui/system'
import {NavBar, SideBar} from "../components";
import React, {useState} from "react";

let drawerWidth = 280;

export const QrAttendanceLayout = ({ children }: {children: React.ReactNode}) => {

    const isSmallScreen = useMediaQuery<Theme>((theme) => theme.breakpoints.down('md'));

    if (isSmallScreen) drawerWidth = 220;

    // responsive for mobile
    const [mobileOpen, setMobileOpen] = useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Box sx={{ display: 'flex'}}>

            {/* Navbar drawerWidth*/}
            <NavBar drawerWidth={drawerWidth} handleDrawerToggle={handleDrawerToggle}/>

            {/* Sidebar drawerWidth*/}
            <SideBar drawerWidth={drawerWidth} mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle}/>

            <Box
                component='main'
                sx={{flexGrow: 1, p: 3}}
            >
                {/* Toolbar */}
                <Toolbar />
                {children}
            </Box>
        </Box>
    )
}