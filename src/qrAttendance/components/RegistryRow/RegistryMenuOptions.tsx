import { MouseEvent, useState } from 'react';
import {Divider, IconButton, Menu, MenuItem, Typography} from "@mui/material";
import {Delete, Edit, MoreVert} from "@mui/icons-material";
import {Registry} from "../../interfaces";
import {useRegistryStore, useUiStore} from "../../../hooks";

const ITEM_HEIGHT = 48;

export const RegistryRowMenuOptions = ({ registry }: { registry: Registry }) => {

    const { toggleRegistryModal } = useUiStore();
    const { setActiveRegistry, startDeleteRegistry } = useRegistryStore();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setActiveRegistry(registry);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setActiveRegistry(null);
    };

    return (
        <>
            <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
                data-testid={'registry-menu-button'}
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
                <MenuItem aria-label="editRegistryButton" onClick={toggleRegistryModal}>
                    <Edit />
                    <Typography sx={{ml: '7px'}}>Edit</Typography>
                </MenuItem>

                <Divider />

                <MenuItem aria-label="deleteRegistryButton" onClick={startDeleteRegistry}>
                    <Delete />
                    <Typography sx={{ml: '7px'}}>Delete</Typography>
                </MenuItem>

            </Menu>
        </>
    );
}