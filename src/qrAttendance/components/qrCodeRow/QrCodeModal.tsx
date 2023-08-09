import {Divider, Grid, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Form, Formik} from "formik";
import {QrCodeDatePicker} from "./QrCodeDatePicker";
import {QrCode} from "../../interfaces";
import {ModalLayout} from "../ModalLayout";
import {useGroupStore, useQrCodeStore, useUiStore} from "../../../hooks";

import * as Yup from 'yup';

const initialState: QrCode = {
    id: "",
    formId: "",
    url: "",
    groupId: "",
    name: "",
    date: "2023-02-18T02:19:01.000Z",
    enabled: false
}

export const QrCodeModal = () => {

    const {activeQrCode, startUpdateQrCode, startNewQrCode} = useQrCodeStore();
    const { active: activeGroup } = useGroupStore();
    const {toggleQrCodeModal, isQrCodeModalOpen} = useUiStore();

    const onSubmit = async ({ name, date, enabled }: QrCode) => {
        if (!activeGroup) return;

        if (!activeQrCode) {
            await startNewQrCode(name, date, enabled);
            toggleQrCodeModal();
            return;
        }

        await startUpdateQrCode({
            ...activeQrCode,
            name,
            date,
            enabled
        });

        toggleQrCodeModal();
    }

    return (
        <ModalLayout condition={isQrCodeModalOpen} handleClose={toggleQrCodeModal}>
            <Formik
                initialValues={{
                    ...activeQrCode ?? initialState
                }}
                onSubmit={onSubmit}
                validationSchema={Yup.object({
                    name: Yup.string()
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
                        <Form data-testid="qrCode-modal-form">
                            <Grid container>

                                <Grid item xs={12} sx={{textAlign: "center"}}>
                                    <Typography variant="h6" data-testid="qrCode-title">Editing {activeQrCode?.name}</Typography>
                                    <Divider/>
                                </Grid>

                                <Grid item xs={12} sx={{mt: 2}}>
                                    <TextField
                                        label="QR code name"
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
                                    <QrCodeDatePicker
                                        date={values.date}
                                        onChangeDate={async (value: string) => {
                                            await setFieldValue('date', value);
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12} sx={{mt: 2}}>
                                    <Select
                                        name="enabled"
                                        fullWidth
                                        variant={'outlined'}
                                        value={values.enabled ? 'YES' : 'NO'}
                                        onChange={async ({ target }: SelectChangeEvent) => {
                                            await setFieldValue('enabled', target.value === 'YES')
                                        }}
                                        aria-label="qr-code-select-enabled"
                                    >
                                        <MenuItem value="YES">YES</MenuItem>
                                        <MenuItem value="NO">NO</MenuItem>
                                    </Select>
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