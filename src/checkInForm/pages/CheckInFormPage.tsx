import React from "react";
import {Form, Formik} from "formik";
import {Button, Grid, MenuItem, Select, TextField} from "@mui/material";

import {AuthLayout} from "../../auth/layout/AuthLayout";
import io from "../../utilities/socketIo";
import {useParams} from "react-router-dom";

import * as Yup from 'yup';

interface CheckInFormPageProps {
    name: string;
    group: string;
    career: string;
    firstSurname: string;
    secondSurname: string;
}

const initialForm : CheckInFormPageProps= {
    name: '',
    group: '',
    career: 'Computer Systems Engineering',
    firstSurname: '',
    secondSurname: '',
};

export const CheckInFormPage = () => {

    const { formId = '' } = useParams();

    const onSubmit = (registryData: CheckInFormPageProps) => {
        io.emit('register-attendance', {...registryData, formId});
    }

    return (
        <AuthLayout title={'Check In Form'}>
            <Formik
                initialValues={initialForm}
                onSubmit={onSubmit}
                validationSchema={Yup.object({
                    group: Yup.string()
                        .required('Group is required'),
                    name: Yup.string()
                        .required('Name is required'),
                    firstSurname: Yup.string()
                        .required('First surname is required'),
                    secondSurname: Yup.string()
                        .required('Second surname is required'),
                })}
            >
                {
                    ({
                        values,
                        errors,
                        touched,
                        handleChange,
                        setFieldValue
                     }) => (
                        <Form className="animate__animated animate__fadeIn animate__faster">
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
                                        value={values.group}
                                        onChange={handleChange}
                                        error={touched.group && Boolean(errors.group)}
                                        helperText={touched.group && errors.group}
                                    />
                                </Grid>

                                <Grid item xs={12} sx={{mt: 2}}>
                                    <Select
                                        fullWidth variant={'outlined'}
                                        defaultValue={values.career}
                                        onChange={({ target }) => setFieldValue('career', target.value)}
                                    >
                                        <MenuItem value="Computer Systems Engineering">Computer Systems Engineering</MenuItem>
                                        <MenuItem value="Civil Engineering">Civil Engineering</MenuItem>
                                        <MenuItem value="Environmental Engineering">Environmental Engineering</MenuItem>
                                        <MenuItem value="Industrial Engineering">Industrial Engineering</MenuItem>
                                        <MenuItem value="Engineering in Administration">Engineering in Administration</MenuItem>
                                        <MenuItem value="Bussines Management Engineering">Business Management Engineering</MenuItem>
                                    </Select>
                                </Grid>

                                <Grid item xs={12} sx={{mt: 2}}>
                                    <TextField
                                        label="Name(s)"
                                        type="text"
                                        placeholder="Your name"
                                        fullWidth
                                        name="name"
                                        value={values.name}
                                        onChange={handleChange}
                                        error={touched.group && Boolean(errors.group)}
                                        helperText={touched.name && errors.name}
                                    />
                                </Grid>

                                <Grid item xs={12} sx={{mt: 2}}>
                                    <TextField
                                        label="First surname"
                                        type="text"
                                        placeholder="Your first surname"
                                        fullWidth
                                        name="firstSurname"
                                        value={values.firstSurname}
                                        onChange={handleChange}
                                        error={touched.name && Boolean(errors.name)}
                                        helperText={touched.firstSurname && errors.firstSurname}
                                    />
                                </Grid>

                                <Grid item xs={12} sx={{mt: 2}}>
                                    <TextField
                                        label="Second surname"
                                        type="text"
                                        placeholder="Your second surname"
                                        fullWidth
                                        name="secondSurname"
                                        value={values.secondSurname}
                                        onChange={handleChange}
                                        error={touched.firstSurname && Boolean(errors.firstSurname)}
                                        helperText={touched.secondSurname && errors.secondSurname}
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
                        </Form>
                    )
                }
            </Formik>
        </AuthLayout>
    )
}
