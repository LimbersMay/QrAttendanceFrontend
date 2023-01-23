import {Link as RouterLink} from 'react-router-dom';
import {Alert, Button, Grid, Link, TextField, Typography} from "@mui/material";
import {Google} from "@mui/icons-material";

import {AuthLayout} from "../layout/AuthLayout";
import {useForm} from "../../hooks/useForm";
import React, {useState} from "react";

const initialForm = {

}

export const LoginPage = () => {

    const { onInputChange } = useForm(initialForm);

    const [ formSubmitted, setFormSubmitted ] = useState(false);

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setFormSubmitted(true);
    }

    return (
        <AuthLayout title='Login'>
            <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
                <Grid container>

                    <Grid item xs={12} sx={{mt: 2}}>
                        <TextField
                            label="Email"
                            type="email"
                            placeholder="email@google.com"
                            fullWidth
                            name="email"
                            // value={email}
                            onChange={onInputChange}
                        />
                    </Grid>

                    <Grid item xs={12} sx={{mt: 2}}>
                        <TextField
                            label="Password"
                            type="password"
                            placeholder="password"
                            fullWidth
                            name="password"
                            // value={password}
                            onChange={onInputChange}
                        />
                    </Grid>

                    <Grid container spacing={2} sx={{mb: 2, mt: 1}}>

                        <Grid
                            item
                            xs={12}
                            // display={ !!errorMessage && formSubmitted ? '' : 'none' }
                        >
                            {/*<Alert severity='error'>{ errorMessage }</Alert>*/}
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Button
                                type='submit'
                                variant='contained'
                                fullWidth
                                // disabled={ isAuthenticating }
                            >
                                Login
                            </Button>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Button
                                variant='contained'
                                fullWidth
                                // onClick={onGoogleSignIn}
                                // disabled={ isAuthenticating }
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
            </form>
        </AuthLayout>
    )
}