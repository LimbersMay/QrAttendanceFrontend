import React, {useMemo} from "react";
import {Link as RouterLink} from "react-router-dom";
import {Alert, Button, Grid, Link, TextField, Typography} from "@mui/material";
import {AuthLayout} from "../layout/AuthLayout";
import {useAuthStore, CreatingUserProps} from "../../hooks";
import {authStatusTypes} from "../types";
import {Form, Formik} from "formik";

import * as Yup from 'yup';

interface SignupFormState extends CreatingUserProps{
    password2: string;
}

const initialForm: SignupFormState = {
    name: '',
    lastname: '',
    email: '',
    password: '',
    password2: ''
}

export const SignupPage = () => {

    const { startCreatingUser, errorMessage, status } = useAuthStore();

    const isAuthenticating = useMemo(() => status === authStatusTypes.checking, [status]);

    const onSubmit = async ({ name, email, lastname, password }: SignupFormState) => {
        await startCreatingUser({name, email, lastname, password});
    }

    return (
        <AuthLayout title='Register'>
           <Formik
               initialValues={{...initialForm}}
               onSubmit={onSubmit}
               validationSchema={Yup.object({
                    name: Yup.string()
                            .min(2, 'Must be 2 characters or more')
                            .required('Name is required'),
                    lastname: Yup.string()
                       .min(2, 'Must be 2 characters or more')
                       .required('Lastname is required'),
                    email: Yup.string()
                       .email('Invalid email address')
                       .required('Email is required'),
                    password: Yup.string()
                        .min(4, 'Must be 4 characters or more')
                        .required('password is required'),
                    password2: Yup.string()
                        .oneOf([Yup.ref('password')], 'Passwords must be equal')
                        .required('password2 is required')
               })}
           >
               {
                   ({
                        handleChange,
                        touched,
                        errors
                   }) => (
                       <Form className="animate__animated animate__fadeIn animate__faster" aria-label="submit-form">
                           <Grid container >
                               <Grid item xs={12} sx={{mt: 2}}>
                                   <TextField
                                       label="Name"
                                       type="text"
                                       placeholder="Your name"
                                       fullWidth
                                       name="name"
                                       onChange={handleChange}
                                       error={touched.name && Boolean(errors.name)}
                                       helperText={touched.name && errors.name}
                                   />
                               </Grid>

                               <Grid item xs={12} sx={{mt: 2}}>
                                   <TextField
                                       label="Lastname"
                                       type="text"
                                       placeholder="Your lastname"
                                       fullWidth
                                       name="lastname"
                                       onChange={handleChange}
                                       error={touched.lastname && Boolean(errors.lastname)}
                                       helperText={touched.lastname && errors.lastname}
                                   />
                               </Grid>

                               <Grid item xs={12} sx={{mt: 2}}>
                                   <TextField
                                       label="Email"
                                       type="email"
                                       placeholder="email@google.com"
                                       fullWidth
                                       name="email"
                                       onChange={handleChange}
                                       error={touched.email && Boolean(errors.email)}
                                       helperText={touched.email && errors.email}
                                   />
                               </Grid>

                               <Grid item xs={12} sx={{mt: 2}}>
                                   <TextField
                                       label="Password"
                                       type="password"
                                       placeholder="password"
                                       fullWidth
                                       name="password"
                                       onChange={handleChange}
                                       inputProps={{
                                           'data-testid': 'password'
                                       }}
                                       error={touched.password && Boolean(errors.password)}
                                       helperText={touched.password && errors.password}
                                   />
                               </Grid>

                               <Grid item xs={12} sx={{mt: 2}}>
                                   <TextField
                                       label="Repeat password"
                                       type="password"
                                       placeholder="repeat password"
                                       fullWidth
                                       name="password2"
                                       onChange={handleChange}
                                       inputProps={{
                                           'data-testid': 'password2'
                                       }}
                                       error={touched.password2 && Boolean(errors.password2)}
                                       helperText={touched.password2 && errors.password2}
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
                       </Form>
                   )
               }
           </Formik>
        </AuthLayout>
    )
}
