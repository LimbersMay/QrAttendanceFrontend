import React from 'react';
import {Divider, IconButton, Menu, MenuItem, Typography} from "@mui/material";
import {Delete, Download, Edit, MoreVert, Visibility} from "@mui/icons-material";
import {useQrCodeStore} from "../../../hooks/useQrCodeStore";
import {QrCode} from "../../interfaces";
import {useUiStore} from "../../../hooks/useUiStore";

const ITEM_HEIGHT = 48;

export const QrCodeMenuOptions = ({handleDownload, qrCode }: { handleDownload: any, qrCode: QrCode }) => {

    const { showQrCode, toggleQrCodeModal } = useUiStore();
    const { setActiveQrCode, startDeleteQrCode } = useQrCodeStore();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setActiveQrCode(qrCode);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setActiveQrCode(null);
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
                <MenuItem onClick={showQrCode}>
                    <Visibility />
                    <Typography sx={{ml: '7px'}}>Show</Typography>
                </MenuItem>

                <MenuItem onClick={toggleQrCodeModal}>
                    <Edit />
                    <Typography sx={{ml: '7px'}}>Edit</Typography>
                </MenuItem>

                <MenuItem onClick={handleDownload}>
                    <Download />
                    <Typography sx={{ml: '7px'}}>Download</Typography>
                </MenuItem>

                <Divider />

                <MenuItem onClick={startDeleteQrCode}>
                    <Delete />
                    <Typography sx={{ml: '7px'}}>Delete</Typography>
                </MenuItem>

            </Menu>
        </>
    );
}
