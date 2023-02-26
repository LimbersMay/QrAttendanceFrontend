import {FormEvent} from "react";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Divider, Grid, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";
import {QrCodeDatePicker} from "./QrCodeDatePicker";
import {useUiSlice} from "../../../hooks/useUiSlice";
import {useQrCodeSlice} from "../../../hooks/useQrCodeSlice";
import {useForm} from "../../../hooks/useForm";
import {QrCode} from "../../interfaces";
import {ModalLayout} from "../ModalLayout";
import {useGroupSlice} from "../../../hooks/useGroupSlice";

const initialState: QrCode = {
    id: "",
    formId: "",
    url: "",
    groupId: "",
    name: "",
    date: "2023-02-18T02:19:01.000Z",
    enabled: false
}

export const QrCodeModal = () => {

    const {activeQrCode, handleUpdateQrCode, handleStartNewQrCode} = useQrCodeSlice();
    const { active: activeGroup } = useGroupSlice();
    const {toggleQrCodeModal, isQrCodeModalOpen} = useUiSlice();

    const {formState, onInputChange, onDateChange} = useForm(activeQrCode || initialState);
    const {name, date, enabled} = formState;

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();

        if (!activeGroup) return;

        if (!activeQrCode) {
            handleStartNewQrCode(name, date, enabled);
            toggleQrCodeModal();
            return;
        }

        handleUpdateQrCode({
            ...activeQrCode,
            name,
            date,
            enabled
        });

        toggleQrCodeModal();
    }

    const handleSelectChange = ({target}: SelectChangeEvent) => {
        onDateChange(target.name, target.value === 'YES');
    }

    return (
        <ModalLayout condition={isQrCodeModalOpen} handleClose={toggleQrCodeModal}>
            <form onSubmit={onSubmit}>
                <Grid container>

                    <Grid item xs={12} sx={{textAlign: "center"}}>
                        <Typography variant="h6">Editing {activeQrCode?.name}</Typography>
                        <Divider/>
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
                        <QrCodeDatePicker date={date} onChangeDate={(value: string) => onDateChange("date", value)}/>
                    </Grid>

                    <Grid item xs={12} sx={{mt: 2}}>
                        <Select name="enabled" fullWidth variant={'outlined'} value={enabled ? 'YES' : 'NO'}
                                onChange={handleSelectChange}>
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
        </ModalLayout>
    );
}