import { MouseEvent, useState } from 'react';
import {Divider, IconButton, Menu, MenuItem, Typography} from "@mui/material";
import {Delete, Edit, MoreVert} from "@mui/icons-material";
import {useUiSlice} from "../../../hooks/useUiSlice";
import {useRegistrySlice} from "../../../hooks/useRegistrySlice";
import {Registry} from "../../interfaces";

const ITEM_HEIGHT = 48;

export const RegistryRowMenuOptions = ({ registry }: { registry: Registry }) => {

    const { openRegistryModal } = useUiSlice();
    const { handleSetActiveRegistry, handleDeleteRegistry } = useRegistrySlice();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        handleSetActiveRegistry(registry);
    };

    const handleClose = () => {
        setAnchorEl(null);
        handleSetActiveRegistry(null);
    };

    return (
        <>
            <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVert />
            </IconButton>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
            >
                <MenuItem onClick={openRegistryModal}>
                    <Edit />
                    <Typography sx={{ml: '7px'}}>Edit</Typography>
                </MenuItem>

                <Divider />

                <MenuItem onClick={handleDeleteRegistry}>
                    <Delete />
                    <Typography sx={{ml: '7px'}}>Delete</Typography>
                </MenuItem>

            </Menu>
        </>
    );
}