import React, {useMemo} from "react";
import {Link as RouterLink} from 'react-router-dom';
import {Alert, Button, Grid, Link, TextField, Typography} from "@mui/material";
import {Google} from "@mui/icons-material";
import {Form, Formik} from "formik";
import {AuthLayout} from "../layout/AuthLayout";
import {useAuthStore} from "../../hooks";
import {authStatusTypes} from "../types";

import * as Yup from 'yup';

interface LoginFormState {
    email: string;
    password: string;
}

const initialForm: LoginFormState = {
    email: '',
    password: ''
}

export const LoginPage = () => {

    const { startLogin, errorMessage, status } = useAuthStore();

    const isAuthenticating = useMemo(() => status === authStatusTypes.checking, [status]);

    const onSubmit = async ({ email, password }: LoginFormState) => {
       await startLogin(email, password);
    }

    return (
        <AuthLayout title='Login'>
            <Formik
                initialValues={{...initialForm}}
                onSubmit={onSubmit}
                validationSchema={Yup.object({
                    email: Yup.string()
                        .email('Invalid email address')
                        .required('Email is required'),
                    password: Yup.string()
                        .min(4, 'Must be 4 characters or more')
                        .required('password is required')
                })}
            >
                {
                    ({
                        handleChange,
                        values,
                        touched,
                        errors
                     }) => (
                        <Form className="animate__animated animate__fadeIn animate__faster" aria-label="submit-form">
                            <Grid container>
                                <Grid item xs={12} sx={{mt: 2}}>
                                    <TextField
                                        label="Email"
                                        type="email"
                                        placeholder="email@google.com"
                                        fullWidth
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        error={touched.email && Boolean(errors.email)}
                                        helperText={touched.email && errors.email}
                                    />
                                </Grid>

                                <Grid item xs={12} sx={{mt: 2}}>
                                    <TextField
                                        label="Password"
                                        type="password"
                                        inputProps={{
                                            'data-testid': 'password'
                                        }}
                                        placeholder="password"
                                        fullWidth
                                        name="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        error={touched.password && Boolean(errors.password)}
                                        helperText={touched.password && errors.password}
                                    />
                                </Grid>

                                <Grid container spacing={2} sx={{mb: 2, mt: 1}}>

                                    <Grid
                                        item
                                        xs={12}
                                        display={ !!errorMessage ? '' : 'none' }
                                    >
                                        {<Alert severity='error'>{ errorMessage }</Alert>}
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <Button
                                            type='submit'
                                            variant='contained'
                                            fullWidth
                                            disabled={ isAuthenticating }
                                        >
                                            Login
                                        </Button>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <Button
                                            variant='contained'
                                            fullWidth
                                            href='https://qrattendancebackend.up.railway.app/api/auth/login-google'
                                        >
                                            <Google/>
                                            <Typography sx={{ml: 1}}>Google</Typography>
                                        </Button>
                                    </Grid>
                                </Grid>

                                <Grid container direction='row' justifyContent='end'>
                                    <Link component={RouterLink} color='inherit' to="/auth/register">
                                        Signup
                                    </Link>
                                </Grid>
                            </Grid>
                        </Form>
                    )
                }
            </Formik>
        </AuthLayout>
    )
}