import {Form, Formik} from "formik";
import {Divider, Grid, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {ModalLayout} from "../ModalLayout";
import {useGroupStore, useUiStore} from "../../../hooks";
import {Group} from "../../interfaces";

import * as Yup from 'yup';

export const TitleModal = () => {

    const { isTitleModalOpen, toggleTitleModal } = useUiStore();
    const { active, startUpdateGroup, setActiveGroup } = useGroupStore();

    const onSubmit = async (newGroupValues: Group) => {

        await startUpdateGroup({
            ...newGroupValues
        });

        setActiveGroup(newGroupValues);
        toggleTitleModal();
    }

    return (
        <ModalLayout condition={isTitleModalOpen} handleClose={toggleTitleModal}>
            <Formik
                initialValues={{
                    ...active!
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
                     }) => (
                        <Form aria-label="titleModalForm" >
                            <Grid container>
                                <Grid item xs={12} sx={{textAlign: "center"}}>
                                    <Typography aria-label="groupTitle" variant="h6">Editing {active?.name}</Typography>
                                    <Divider />
                                </Grid>

                                <Grid item xs={12} sx={{mt: 2}}>
                                    <TextField
                                        label="Group name"
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
    )
}
