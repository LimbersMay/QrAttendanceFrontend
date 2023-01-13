import {AuthLayout} from "../layout/AuthLayout";
import {Button, Grid, Link, TextField, Typography} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import React, {useState} from "react";
import {useForm} from "../../hooks/useForm";

export const SignupPage = () => {

    const { onInputChange } = useForm({});

    const [ formSubmitted, setFormSubmitted ] = useState(false);

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setFormSubmitted(true);
    }

    return (
        <AuthLayout title='Register'>
            <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
                <Grid container >

                    <Grid item xs={12} sx={{mt: 2}}>
                        <TextField
                            label="Name"
                            type="text"
                            placeholder="Your name"
                            fullWidth
                            name="displayName"
                            onChange={onInputChange}
                            // error={!!displayNameValid && formSubmitted}
                            // helperText={displayNameValid}
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
                            //error={!!emailValid && formSubmitted}
                            //helperText={emailValid}
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
                            //error={!!passwordValid && formSubmitted}
                            //helperText={passwordValid}
                        />
                    </Grid>

                    <Grid
                        container
                        // display={!!errorMessage && formSubmitted ? '' : 'none'}
                    >
                        <Grid
                            item
                            xs={12}
                        >
                            {/*<Alert severity='error'>{ errorMessage }</Alert>*/}
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} sx={{ mb:2, mt: 1 }}>
                        <Grid item xs={12} >
                            <Button
                                variant='contained'
                                fullWidth
                                type="submit"
                                // disabled={isCheckingAuthentication}
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
