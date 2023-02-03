import {Box, Dialog, DialogContent, DialogTitle, IconButton} from "@mui/material";
import {Close} from "@mui/icons-material";
import QRCode from 'react-qr-code';

export const QrCheckIn = ({ url, title, isQrShowing, handleToggleShowQr }: { url: string, title: string, isQrShowing: boolean, handleToggleShowQr: any}) => {
    return (
        <Dialog open={isQrShowing} maxWidth="sm" fullWidth>
            <Box
                display="flex"
                justifyContent="center"
            >
                <DialogTitle>{ title } QR Code</DialogTitle>
            </Box>
            <Box position="absolute" top={0} right={0}>
                <IconButton onClick={handleToggleShowQr}>
                    <Close />
                </IconButton>
            </Box>
            <DialogContent>
                <Box
                    sx={{height: 'auto', margin: "0 auto", maxWidth: "64", width: "100%"}}
                    display="flex"
                    justifyContent="center"
                >
                    <QRCode
                        size={100}
                        style={{ height: "auto", maxWidth: "50%", width: "80%" }}
                        value={url}
                        viewBox={`0 0 256 256`}
                    />
                </Box>
            </DialogContent>
        </Dialog>
    );
}
