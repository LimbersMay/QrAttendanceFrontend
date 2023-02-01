// ConfirmDialog.jsx
// material ui
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    IconButton,
    Typography,
} from '@mui/material';
import { Close } from '@mui/icons-material';

const ConfirmDialog = ({ onCancel, onConfirm }: {onCancel: any, onConfirm: any}) => {
    return (
        <Dialog open={true} maxWidth="sm" fullWidth>
            <DialogTitle> Confirm</DialogTitle>
            <Box position="absolute" top={0} right={0}>
                <IconButton>
                    <Close />
                </IconButton>
            </Box>
            <DialogContent>
                <Typography>Are you sure you want to do delete this?</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel} color="primary" variant="contained">
                    Cancel
                </Button>
                <Button onClick={onConfirm} color="secondary" variant="contained">
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;