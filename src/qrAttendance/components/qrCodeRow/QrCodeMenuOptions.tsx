import React from 'react';
import {Divider, IconButton, Menu, MenuItem, Typography} from "@mui/material";
import {Delete, Download, Edit, MoreVert, Visibility} from "@mui/icons-material";
import {useQrCodeSlice} from "../../../hooks/useQrCodeSlice";
import {QrCode} from "../../interfaces";

const ITEM_HEIGHT = 48;

export const QrCodeMenuOptions = ({ handleShow, handleEdit, handleDownload, handleDelete, qrCode }: { handleShow: any, handleEdit: any, handleDownload: any, handleDelete: any, qrCode: QrCode
}) => {

    const { handleSetActiveQrCode } = useQrCodeSlice();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        handleSetActiveQrCode(qrCode);
    };

    const handleClose = () => {
        setAnchorEl(null);
        handleSetActiveQrCode(null);
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
                <MenuItem onClick={handleShow}>
                    <Visibility />
                    <Typography sx={{ml: '7px'}}>Show</Typography>
                </MenuItem>

                <MenuItem onClick={handleEdit}>
                    <Edit />
                    <Typography sx={{ml: '7px'}}>Edit</Typography>
                </MenuItem>

                <MenuItem onClick={handleDownload}>
                    <Download />
                    <Typography sx={{ml: '7px'}}>Download</Typography>
                </MenuItem>

                <Divider />

                <MenuItem onClick={handleDelete}>
                    <Delete />
                    <Typography sx={{ml: '7px'}}>Delete</Typography>
                </MenuItem>

            </Menu>
        </>
    );
}
