import {Box, Dialog, DialogContent, DialogTitle, IconButton} from "@mui/material";
import {Close} from "@mui/icons-material";
import QRCode from 'react-qr-code';
import {useUiStore} from "../../../hooks/useUiStore";
import {useQrCodeStore} from "../../../hooks/useQrCodeStore";

export const QrCheckIn = () => {

    const { isShowingQrCode, hideQrCode } = useUiStore();
    const { activeQrCode } = useQrCodeStore();

    return (
        <Dialog open={isShowingQrCode} maxWidth="sm" fullWidth>
            <Box
                display="flex"
                justifyContent="center"
            >
                <DialogTitle data-testid="qrCode-title">{ activeQrCode?.name } QR Code</DialogTitle>
            </Box>
            <Box position="absolute" top={0} right={0}>
                <IconButton data-testid="close-button" onClick={hideQrCode}>
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
                        value={`${activeQrCode?.url}/${activeQrCode?.formId}`}
                        viewBox={`0 0 256 256`}
                    />
                </Box>
            </DialogContent>
        </Dialog>
    );
}
