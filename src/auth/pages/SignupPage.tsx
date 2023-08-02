import React, {useMemo, useState} from "react";
import {Link as RouterLink} from "react-router-dom";
import {Alert, Button, Grid, Link, TextField, Typography} from "@mui/material";
import {AuthLayout} from "../layout/AuthLayout";
import {FormValidations, useForm} from "../../hooks/useForm";
import {authStatusTypes} from "../types";
import {useAuthStore} from "../../hooks/useAuthStore";

const initialForm = {
    name: '',
    lastname: '',
    email: '',
    password: '',
    password2: ''
}

const formValidations: FormValidations = {
   name: [(name: string) => name.length > 1, 'Name is required'],
    lastname: [(lastname: string) => lastname.length > 1, 'Lastname is required'],
    email: [(email: string) => email.length > 1, 'Email is required'],
    password: [(password: string, password2: string) => password === password2, 'Passwords must be equal', 'password2'],
}

export const SignupPage = () => {

    const { startCreatingUser, errorMessage, status } = useAuthStore();

    const { onInputChange, isFormValid, formValidation, name, email, password, lastname } = useForm(initialForm, formValidations);
    const { nameValid, lastnameValid, emailValid, passwordValid } = formValidation;

    const [ formSubmitted, setFormSubmitted ] = useState(false);

    const isAuthenticating = useMemo(() => status === authStatusTypes.checking, [status]);

    const onSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        setFormSubmitted(true);
        if (!isFormValid) return;

        await startCreatingUser({name, email, lastname, password});
    }

    return (
        <AuthLayout title='Register'>
            <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster" aria-label="submit-form">
                <Grid container >

                    <Grid item xs={12} sx={{mt: 2}}>
                        <TextField
                            label="Name"
                            type="text"
                            placeholder="Your name"
                            fullWidth
                            name="name"
                            onChange={onInputChange}
                            error={!!nameValid && formSubmitted}
                            helperText={nameValid}
                        />
                    </Grid>

                    <Grid item xs={12} sx={{mt: 2}}>
                        <TextField
                            label="Lastname"
                            type="text"
                            placeholder="Your lastname"
                            fullWidth
                            name="lastname"
                            onChange={onInputChange}
                            error={!!lastnameValid && formSubmitted}
                            helperText={lastnameValid}
                        />
                    </Grid>

                    <Grid item xs={12} sx={{mt: 2}}>
                        <TextField
                            label="Email"
                            type="email"
                            placeholder="email@google.com"
                            fullWidth
                            name="email"
                            onChange={onInputChange}
                            error={!!emailValid && formSubmitted}
                            helperText={emailValid}
                        />
                    </Grid>

                    <Grid item xs={12} sx={{mt: 2}}>
                        <TextField
                            label="Password"
                            type="password"
                            placeholder="password"
                            fullWidth
                            name="password"
                            onChange={onInputChange}
                            inputProps={{
                                'data-testid': 'password'
                            }}
                            error={!!passwordValid && formSubmitted}
                            helperText={passwordValid}
                        />
                    </Grid>

                    <Grid item xs={12} sx={{mt: 2}}>
                        <TextField
                            label="Repeat password"
                            type="password"
                            placeholder="repeat password"
                            fullWidth
                            name="password2"
                            onChange={onInputChange}
                            inputProps={{
                                'data-testid': 'password2'
                            }}
                            error={!!passwordValid && formSubmitted}
                            helperText={passwordValid}
                        />
                    </Grid>

                    <Grid
                        container
                        display={!!errorMessage ? '' : 'none'}
                        sx={{mt: 1}}
                    >
                        <Grid
                            item
                            xs={12}
                        >
                            <Alert severity='error'>{ errorMessage }</Alert>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} sx={{ mb:2, mt: 1 }}>
                        <Grid item xs={12} >
                            <Button
                                variant='contained'
                                fullWidth
                                type="submit"
                                disabled={isAuthenticating}
                            >
                                Signup
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container direction='row' justifyContent='end'>
                        <Typography sx={{mr: 1}}>Do you already have an account?</Typography>
                        <Link component={ RouterLink } color='inherit' to="/auth/login">
                            Login
                        </Link>
                    </Grid>

                </Grid>
            </form>
        </AuthLayout>
    )
}
