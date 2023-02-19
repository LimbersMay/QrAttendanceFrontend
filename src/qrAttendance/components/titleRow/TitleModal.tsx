import {ModalLayout} from "../ModalLayout";
import {useUiSlice} from "../../../hooks/useUiSlice";
import {Divider, Grid, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import {FormEvent} from "react";
import {useGroupSlice} from "../../../hooks/useGroupSlice";
import {useForm} from "../../../hooks/useForm";
import {QrCodeDatePicker} from "../qrCodeRow/QrCodeDatePicker";
import Button from "@mui/material/Button";

const initialState = {
    id: "",
    name: "",
    date: "2023-02-18T02:19:01.000Z",
}

export const TitleModal = () => {

    const { isTitleModalOpen, toggleTitleModal } = useUiSlice();
    const { active, updateGroup, handleSetActiveGroup } = useGroupSlice();

    const { formState, onInputChange, onDateChange } = useForm(active || initialState);
    const { name, date } = formState;

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();

        if (!active) return;

        updateGroup({
            ...active,
            name,
            date
        });

        handleSetActiveGroup(formState);
        toggleTitleModal();
    }

    return (
        <ModalLayout condition={isTitleModalOpen} handleClose={toggleTitleModal}>
            <form onSubmit={onSubmit}>
                <Grid container>
                    <Grid item xs={12} sx={{textAlign: "center"}}>
                        <Typography variant="h6">Editing {active?.name}</Typography>
                        <Divider />
                    </Grid>

                    <Grid item xs={12} sx={{mt: 2}}>
                        <QrCodeDatePicker date={date} onChangeDate={(date: string) => onDateChange('date', date)}/>
                    </Grid>

                    <Grid item xs={12} sx={{mt: 2}}>
                        <TextField
                            label="Name"
                            name="name"
                            value={name}
                            fullWidth
                            variant={"outlined"}
                            placeholder="name"
                            onChange={onInputChange}>
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
            </form>
        </ModalLayout>
    )
}
