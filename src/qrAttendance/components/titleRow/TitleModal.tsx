import {ModalLayout} from "../ModalLayout";
import {useUiStore} from "../../../hooks/useUiStore";
import {Divider, Grid, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import {FormEvent} from "react";
import {useGroupStore} from "../../../hooks/useGroupStore";
import {useForm} from "../../../hooks/useForm";
import Button from "@mui/material/Button";

const initialState = {
    id: "",
    name: "",
    date: "2023-02-18T02:19:01.000Z",
}

export const TitleModal = () => {

    const { isTitleModalOpen, toggleTitleModal } = useUiStore();
    const { active, startUpdateGroup, setActiveGroup } = useGroupStore();

    const { formState, onInputChange } = useForm(active || initialState);
    const { name } = formState;

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if (!active) return;

        await startUpdateGroup({
            ...active,
            name
        });

        setActiveGroup(formState);
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
                        <TextField
                            label="Group name"
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
