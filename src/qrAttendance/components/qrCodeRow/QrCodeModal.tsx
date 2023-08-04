import {FormEvent} from "react";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Divider, Grid, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";
import {QrCodeDatePicker} from "./QrCodeDatePicker";
import {QrCode} from "../../interfaces";
import {ModalLayout} from "../ModalLayout";
import {useForm, useGroupStore, useQrCodeStore, useUiStore} from "../../../hooks";

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

    const {activeQrCode, startUpdateQrCode, startNewQrCode} = useQrCodeStore();
    const { active: activeGroup } = useGroupStore();
    const {toggleQrCodeModal, isQrCodeModalOpen} = useUiStore();

    const {formState, onInputChange, onDateChange} = useForm(activeQrCode || initialState);
    const {name, date, enabled} = formState;

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if (!activeGroup) return;

        if (!activeQrCode) {
            await startNewQrCode(name, date, enabled);
            toggleQrCodeModal();
            return;
        }

        await startUpdateQrCode({
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
            <form data-testid="qrCode-modal-form" onSubmit={onSubmit}>
                <Grid container>

                    <Grid item xs={12} sx={{textAlign: "center"}}>
                        <Typography variant="h6" data-testid="qrCode-title">Editing {activeQrCode?.name}</Typography>
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