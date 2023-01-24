import {Link as RouterLink} from 'react-router-dom';
import {Alert, Button, Grid, Link, TextField, Typography} from "@mui/material";
import {Google} from "@mui/icons-material";

import {AuthLayout} from "../layout/AuthLayout";
import {useForm} from "../../hooks/useForm";
import React, {useMemo} from "react";
import {useAppDispatch} from "../../store";
import {startLogin} from "../../store/auth/thunks";
import {useSelector} from "react-redux";
import {selectAuth} from "../../store/auth";
import {authStatusTypes} from "../types";

const initialForm = {
    email: '',
    password: ''
}

export const LoginPage = () => {

    const dispatch = useAppDispatch();
    const { errorMessage, status } = useSelector(selectAuth);

    const isAuthenticating = useMemo(() => status === authStatusTypes.checking, [status]);

    const { onInputChange, email, password } = useForm(initialForm);

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();

       dispatch(startLogin(email, password));
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
                            value={email}
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
                            value={password}
                            onChange={onInputChange}
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