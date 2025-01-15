import {Divider, Grid, MenuItem, Select, TextField} from "@mui/material";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Form, Formik} from "formik";
import {RegistryDatePicker} from "./RegistryDatePicker";
import {Registry} from "../../interfaces";
import {ModalLayout} from "../ModalLayout";
import {useRegistryStore, useUiStore} from "../../../hooks";

import * as yup from 'yup';

const initialState: Registry = {
    id: "",
    qrCodeId: "",
    name: "",
    checkInTime: "2023-02-18T02:19:01.000Z",
    career: "",
    group: "",
    firstSurname: "",
    secondSurname: "",
}

export const RegistryModal = () => {

    const {active: activeRegistry, startUpdateRegistry} = useRegistryStore();
    const {isRegistryModalOpen, toggleRegistryModal} = useUiStore();

    const onSubmit = async (registryValues: Registry) => {
        await startUpdateRegistry({
            ...registryValues
        });

        toggleRegistryModal();
    }

    return (
        <ModalLayout condition={isRegistryModalOpen} handleClose={toggleRegistryModal}>
            <Formik
                initialValues={{
                    ...activeRegistry ?? initialState
                }}
                onSubmit={onSubmit}
                validationSchema={yup.object({
                    group: yup.string()
                        .required('Group is required'),
                    firstSurname: yup.string()
                        .required('First surname is required'),
                    secondSurname: yup.string()
                        .required('Second surname is required'),
                    name: yup.string()
                        .required('Name is required'),
                })}
            >
                {
                    ({
                        values,
                        touched,
                        errors,
                        handleChange,
                        setFieldValue
                     }) => (
                        <Form aria-label="registry-modal-form">
                            <Grid container>

                                <Grid item xs={12} sx={{textAlign: "center"}}>
                                    <Typography variant="h6" aria-label="registry-title">
                                        Editing {activeRegistry?.name}</Typography>
                                    <Divider/>
                                </Grid>

                                <Grid item xs={12} sx={{mt: 2}}>
                                    <RegistryDatePicker date={values.checkInTime}
                                                        onChangeDate={(date: string) => setFieldValue('date', date)}/>
                                </Grid>

                                <Grid item xs={12} sx={{mt: 2}}>
                                    <TextField
                                        label="Group"
                                        name="group"
                                        value={values.group}
                                        fullWidth
                                        inputProps={{maxLength: 2, style: {textTransform: 'uppercase'}}}
                                        variant={"outlined"}
                                        placeholder="Group"
                                        error={touched.group && Boolean(errors.group)}
                                        helperText={touched.group && errors.group}
                                        onChange={handleChange}>
                                    </TextField>
                                </Grid>

                                <Grid item xs={12} sx={{mt: 2}}>
                                    <Select fullWidth variant={'outlined'} name="career" value={values.career} onChange={handleChange}>
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
                                        label="First surname"
                                        name="firstSurname"
                                        value={values.firstSurname}
                                        fullWidth
                                        variant={"outlined"}
                                        placeholder="firstSurname"
                                        error={touched.firstSurname && Boolean(errors.firstSurname)}
                                        helperText={touched.firstSurname && errors.firstSurname}
                                        onChange={handleChange}>
                                    </TextField>
                                </Grid>

                                <Grid item xs={12} sx={{mt: 2}}>
                                    <TextField
                                        label="Second surname"
                                        name="secondSurname"
                                        value={values.secondSurname}
                                        fullWidth
                                        variant={"outlined"}
                                        placeholder="secondSurname"
                                        error={touched.secondSurname && Boolean(errors.secondSurname)}
                                        helperText={touched.secondSurname && errors.secondSurname}
                                        onChange={handleChange}>
                                    </TextField>
                                </Grid>

                                <Grid item xs={12} sx={{mt: 2}}>
                                    <TextField
                                        label="Name"
                                        name="name"
                                        value={values.name}
                                        fullWidth
                                        variant={"outlined"}
                                        placeholder="name"
                                        error={touched.name && Boolean(errors.name)}
                                        helperText={touched.name && errors.name}
                                        onChange={handleChange}>
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
                        </Form>
                    )
                }
            </Formik>
        </ModalLayout>
    );
}