import {Toolbar, useMediaQuery, Theme} from "@mui/material";
import { Box } from '@mui/system'
import {NavBar, SideBar} from "../components";
import React from "react";

let drawerWidth = 280;

export const QrAttendanceLayout = ({ children }: {children: React.ReactNode}) => {

    const isSmallScreen = useMediaQuery<Theme>((theme) => theme.breakpoints.down('md'));

    if (isSmallScreen) drawerWidth = 220;

    return (
        <Box sx={{ display: 'flex'}}>

            {/* Navbar drawerWidth*/}
            <NavBar drawerWidth={drawerWidth}/>

            {/* Sidebar drawerWidth*/}
            <SideBar drawerWidth={drawerWidth}/>

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