import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Divider, Grid, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";
import {useUiSlice} from "../../../hooks/useUiSlice";
import {useRegistrySlice} from "../../../hooks/useRegistrySlice";
import {RegistryDatePicker} from "./RegistryDatePicker";

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
    checkInTime: "2023-02-18T02:19:01.000Z",
    career: "",
    group: "",
    firstSurname: "",
    secondSurname: "",
}

export const RegistryModal = () => {

    const { active: activeRegistry, updateRegistry } = useRegistrySlice();

    const { isRegistryModalOpen, toggleRegistryModal } = useUiSlice();

    const [formState, setFormState] = useState(activeRegistry || initialState);
    const {name, checkInTime, group, career, firstSurname, secondSurname} = formState;

    useEffect(() => {
        setFormState(activeRegistry || initialState);
    }, [activeRegistry]);

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
            [name]: value
        });
    }

    const onDateChange = (date: string) => {
        setFormState({
            ...formState,
            checkInTime: date
        })
    }

    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        changeFormState(event);
    }

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();

        if (!activeRegistry) return;

        updateRegistry({
            ...activeRegistry,
            ...formState
        });

        console.log(activeRegistry);
        console.log(formState);

        toggleRegistryModal();
    }

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={isRegistryModalOpen}
            onClose={toggleRegistryModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={isRegistryModalOpen}>
                <Box sx={style}>
                    <form onSubmit={onSubmit}>
                        <Grid container>

                            <Grid item xs={12} sx={{textAlign: "center"}}>
                                <Typography variant="h6">Editing</Typography>
                                <Divider />
                            </Grid>

                            <Grid item xs={12} sx={{mt: 2}}>
                                <RegistryDatePicker date={checkInTime} onChangeDate={onDateChange} />
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
                </Box>
            </Fade>
        </Modal>
    );
}