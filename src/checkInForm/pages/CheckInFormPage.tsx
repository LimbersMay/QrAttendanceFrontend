import {AuthLayout} from "../../auth/layout/AuthLayout";
import {Button, Grid, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";
import React, {useState} from "react";
import {FormValidations, useForm} from "../../hooks/useForm";
import {useAppDispatch} from "../../store";
import {startSubmitCheckInForm} from "../../store/checkInForm/thunks";

import io from "../../utilities/socketIo";
import {useParams} from "react-router-dom";

const initialForm = {
    name: '',
    group: '',
    career: '',
    firstSurname: '',
    secondSurname: '',
};

const formValidations: FormValidations = {
    name: [(name: string) => name.length > 1, 'Name is required'],
    group: [(group: string) => group.length > 1, 'Group is required'],
    firstSurname: [(firstSurname: string) => firstSurname.length > 1, 'First surname is required'],
    secondSurname: [(secondSurname: string) => secondSurname.length > 1, 'Second surname is required'],
}

export const CheckInFormPage = () => {

    const { formId = '' } = useParams();

    const dispatch = useAppDispatch();

    const { name, group, firstSurname, secondSurname, isFormValid, formValidation, onInputChange  } = useForm(initialForm, formValidations);
    const { nameValid, groupValid, firstSurnameValid, secondSurnameValid } = formValidation;
    const [career, setCareerValue] = useState<string>('Computer Systems Engineering');

    const [formSubmitted, setFormSubmitted] = useState(false);

    const onSelectChange = (event: SelectChangeEvent) => {
        setCareerValue(event.target.value);
    }

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        setFormSubmitted(true);
        if (!isFormValid) return;

        dispatch(startSubmitCheckInForm({io, name, group, career, firstSurname, secondSurname, formId}));
    }

    return (
        <AuthLayout title={'Check In Form'}>
            <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
                <Grid container>

                    <Grid item xs={12} sx={{mt: 2}}>
                        <TextField
                            label="Group"
                            type="text"
                            placeholder="Your group (1A, 3B..)"
                            fullWidth

                            // enable only 2 characters
                            inputProps={{maxLength: 2, style: {textTransform: 'uppercase'}}}

                            name="group"
                            value={group}
                            onChange={onInputChange}
                            error={!!groupValid && formSubmitted}
                            helperText={groupValid}
                        />
                    </Grid>

                    <Grid item xs={12} sx={{mt: 2}}>
                        <Select fullWidth variant={'outlined'} defaultValue={career} onChange={onSelectChange}>
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
                            label="Name(s)"
                            type="text"
                            placeholder="Your name"
                            fullWidth
                            name="name"
                            value={name}
                            onChange={onInputChange}
                            error={!!nameValid && formSubmitted}
                            helperText={nameValid}
                        />
                    </Grid>

                    <Grid item xs={12} sx={{mt: 2}}>
                        <TextField
                            label="First surname"
                            type="text"
                            placeholder="Your first surname"
                            fullWidth
                            name="firstSurname"
                            value={firstSurname}
                            onChange={onInputChange}
                            error={!!firstSurnameValid && formSubmitted}
                            helperText={firstSurnameValid}
                        />
                    </Grid>

                    <Grid item xs={12} sx={{mt: 2}}>
                        <TextField
                            label="Second surname"
                            type="text"
                            placeholder="Your second surname"
                            fullWidth
                            name="secondSurname"
                            value={secondSurname}
                            onChange={onInputChange}
                            error={!!secondSurnameValid && formSubmitted}
                            helperText={secondSurnameValid}
                        />
                    </Grid>

                    <Grid container spacing={2} sx={{mb: 2, mt: 1}}>

                        <Grid item xs={12} sm={12}>
                            <Button
                                type='submit'
                                variant='contained'
                                fullWidth
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    )
}
