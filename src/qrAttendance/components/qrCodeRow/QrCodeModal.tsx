import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Divider, Grid, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";
import {QrCodeDatePicker} from "./QrCodeDatePicker";
import {useUiSlice} from "../../../hooks/useUiSlice";
import {useQrCodeSlice} from "../../../hooks/useQrCodeSlice";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const initialState = {
    name: "",
    date: "2023-02-18T02:19:01.000Z",
    enabled: false
}

export const QrCodeModal = () => {

    const { activeQrCode, handleSetActiveQrCode, handleUpdateQrCode } = useQrCodeSlice();
    const { closeQrCodeModal, isQrCodeModalOpen } = useUiSlice();

    const [formState, setFormState] = useState(activeQrCode || initialState);
    const {name, date, enabled} = formState;

    useEffect(() => {
        setFormState(activeQrCode || initialState);
    }, [activeQrCode]);

    const changeFormState = ({target}: ChangeEvent<HTMLInputElement> | SelectChangeEvent) => {
        const {name, value} = target;

        setFormState({
            ...formState,
            [name]: value
        })
    }

    const onSelectChange = (event: SelectChangeEvent) => {
        const {name, value} = event.target;

        setFormState({
            ...formState,
            [name]: value === 'YES'
        });
    }

    const onDateChange = (date: string) => {
        setFormState({
            ...formState,
            date
        })
    }

    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        changeFormState(event);
    }

    const handleClose = () => {
        closeQrCodeModal();
        handleSetActiveQrCode(null);
    };

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();

        if (!activeQrCode) return;

        handleUpdateQrCode({
            ...activeQrCode,
            enabled,
            name,
            date
        });

        closeQrCodeModal();
        handleSetActiveQrCode(null);
    }


    return (
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={isQrCodeModalOpen}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={isQrCodeModalOpen}>
                    <Box sx={style}>
                        <form onSubmit={onSubmit}>
                            <Grid container>

                                <Grid item xs={12} sx={{textAlign: "center"}}>
                                    <Typography variant="h6">Editing</Typography>
                                    <Divider />
                                </Grid>

                                <Grid item xs={12} sx={{mt: 2}}>
                                    <TextField
                                        label="QR code name"
                                        name="name"
                                        value={name}
                                        fullWidth
                                        variant={"outlined"}
                                        placeholder="name"
                                        onChange={onInputChange}>
                                    </TextField>
                                </Grid>

                                <Grid item xs={12} sx={{mt: 2}}>
                                    <QrCodeDatePicker date={activeQrCode?.date} onChangeDate={onDateChange} />
                                </Grid>

                                <Grid item xs={12} sx={{mt: 2}}>
                                    <Select name="enabled" fullWidth variant={'outlined'} value={enabled ? 'YES' : 'NO'} onChange={onSelectChange}>
                                        <MenuItem value="YES">YES</MenuItem>
                                        <MenuItem value="NO">NO</MenuItem>
                                    </Select>
                                </Grid>

                                <Grid item xs={12} sx={{mt: 2}}>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        type={"submit"}
                                    >
                                        Save
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </Fade>
            </Modal>
    );
}