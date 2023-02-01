import {Grid, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {TurnedInNot} from "@mui/icons-material";

import {Group} from "../interfaces";
import {useAppDispatch} from "../../store";
import {setActiveGroup} from "../../store/qrAttendance";
import dayjs from "dayjs";

export const SideBarItem = ({ group }: {group: Group}) => {

    const dispatch = useAppDispatch();

    const onClickGroup = () => {
        dispatch(setActiveGroup(group));
    }

    return (
        <ListItem disablePadding onClick={onClickGroup}>
            <ListItemButton>
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <Grid container>
                    <ListItemText primary={group.name}/>
                    <ListItemText secondary={dayjs(group.date).format('DD/MM/YYYY')}/>
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}