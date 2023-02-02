import {AuthLayout} from "../../auth/layout/AuthLayout";
import {Alert, Button, Grid, Link, TextField, Typography} from "@mui/material";
import {Google} from "@mui/icons-material";
import {Link as RouterLink} from "react-router-dom";
import React from "react";

export const CheckInFormPage = () => {

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
    }

    return (
        <AuthLayout title={'Check In Form'}>
            <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
                <Grid container>

                    <Grid item xs={12} sx={{mt: 2}}>
                        <TextField
                            label="Name(s)"
                            type="text"
                            placeholder="Your name"
                            fullWidth
                            name="name"
                            // value={email}
                            // onChange={onInputChange}
                        />
                    </Grid>

                    <Grid item xs={12} sx={{mt: 2}}>
                        <TextField
                            label="First surname"
                            type="text"
                            placeholder="Your first surname"
                            fullWidth
                            name="firstSurname"
                            // value={password}
                            // onChange={onInputChange}
                        />
                    </Grid>

                    <Grid item xs={12} sx={{mt: 2}}>
                        <TextField
                            label="Second surname"
                            type="text"
                            placeholder="Your second surname"
                            fullWidth
                            name="secondSurname"
                            // value={password}
                            // onChange={onInputChange}
                        />
                    </Grid>

                    <Grid container spacing={2} sx={{mb: 2, mt: 1}}>

                        <Grid item xs={12} sm={12}>
                            <Button
                                type='submit'
                                variant='contained'
                                fullWidth
                                //disabled={ isAuthenticating }
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
