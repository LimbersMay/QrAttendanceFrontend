import React, { FormEvent} from "react";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Divider, Grid, MenuItem, Select, TextField} from "@mui/material";
import {useUiSlice} from "../../../hooks/useUiSlice";
import {useRegistrySlice} from "../../../hooks/useRegistrySlice";
import {RegistryDatePicker} from "./RegistryDatePicker";
import {useForm} from "../../../hooks/useForm";
import {Registry} from "../../interfaces";
import {ModalLayout} from "../ModalLayout";

const initialState: Registry = {
    id: "",
    qrCodeId: "",
    name: "",
    checkInTime: "2023-02-18T02:19:01.000Z",
    career: "",
    group: "",
    firstSurname: "",
    secondSurname: "",
}

export const RegistryModal = () => {

    const { active: activeRegistry, startUpdateRegistry } = useRegistrySlice();
    const { isRegistryModalOpen, toggleRegistryModal } = useUiSlice();

    const { formState, onInputChange, onSelectChange, onDateChange } = useForm(activeRegistry || initialState);
    const {name, checkInTime, group, career, firstSurname, secondSurname} = formState;

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if (!activeRegistry) return;

        await startUpdateRegistry({
            ...activeRegistry,
            ...formState
        });

        toggleRegistryModal();
    }

    return (
        <ModalLayout condition={isRegistryModalOpen} handleClose={toggleRegistryModal}>
                    <form onSubmit={onSubmit}>
                        <Grid container>

                            <Grid item xs={12} sx={{textAlign: "center"}}>
                                <Typography variant="h6">Editing</Typography>
                                <Divider />
                            </Grid>

                            <Grid item xs={12} sx={{mt: 2}}>
                                <RegistryDatePicker date={checkInTime} onChangeDate={(date: string) => onDateChange("checkInTime", date)} />
                            </Grid>

                            <Grid item xs={12} sx={{mt: 2}}>
                                <TextField
                                    label="Group"
                                    name="group"
                                    value={group}
                                    fullWidth
                                    inputProps={{maxLength: 2, style: {textTransform: 'uppercase'}}}
                                    variant={"outlined"}
                                    placeholder="Group"
                                    onChange={onInputChange}>
                                </TextField>
                            </Grid>

                            <Grid item xs={12} sx={{mt: 2}}>
                                <Select fullWidth variant={'outlined'} name="career" value={career} onChange={onSelectChange}>
                                    <MenuItem value="Computer Systems Engineering">Computer Systems Engineering</MenuItem>
                                    <MenuItem value="Civil Engineering">Civil Engineering</MenuItem>
                                    <MenuItem value="Environmental Engineering">Environmental Engineering</MenuItem>
                                    <MenuItem value="Industrial Engineering">Industrial Engineering</MenuItem>
                                    <MenuItem value="Engineering in Administration">Engineering in Administration</MenuItem>
                                    <MenuItem value="Bussines Management Engineering">Bussines Management Engineering</MenuItem>
                                </Select>
                            </Grid>

                            <Grid item xs={12} sx={{mt: 2}}>
                                <TextField
                                    label="First surname"
                                    name="firstSurname"
                                    value={firstSurname}
                                    fullWidth
                                    variant={"outlined"}
                                    placeholder="firstSurname"
                                    onChange={onInputChange}>
                                </TextField>
                            </Grid>

                            <Grid item xs={12} sx={{mt: 2}}>
                                <TextField
                                    label="Second surname"
                                    name="secondSurname"
                                    value={secondSurname}
                                    fullWidth
                                    variant={"outlined"}
                                    placeholder="secondSurname"
                                    onChange={onInputChange}>
                                </TextField>
                            </Grid>

                            <Grid item xs={12} sx={{mt: 2}}>
                                <TextField
                                    label="Name"
                                    name="name"
                                    value={name}
                                    fullWidth
                                    variant={"outlined"}
                                    placeholder="name"
                                    onChange={onInputChange}>
                                </TextField>
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